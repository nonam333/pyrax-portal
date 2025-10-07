import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import cryptoRoutes, { getCachedMarkets } from "./crypto";
import { searchNotionDatabases, listNotionPages, getNotionPageContent } from "./notion";
import { insertBlogPostSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Crypto API proxy routes
  app.use('/api/crypto', cryptoRoutes);

  // Blog posts routes
  app.get('/api/blog-posts', async (req, res) => {
    try {
      const { contentType } = req.query;
      
      let posts;
      if (contentType && typeof contentType === 'string') {
        const validTypes = ['News', 'Learn', 'Analysis', 'Regulation'];
        if (!validTypes.includes(contentType)) {
          return res.status(400).json({ error: 'Invalid content type' });
        }
        posts = await storage.getBlogPostsByContentType(contentType);
      } else {
        posts = await storage.getBlogPosts();
      }
      
      res.json(posts);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/blog-posts/:id', async (req, res) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Notion integration routes
  app.get('/api/notion/databases', async (req, res) => {
    try {
      const databases = await searchNotionDatabases();
      res.json(databases);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get('/api/notion/pages/:databaseId', async (req, res) => {
    try {
      const pages = await listNotionPages(req.params.databaseId);
      res.json(pages);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/blog-posts/sync-notion', async (req, res) => {
    try {
      const { databaseId } = req.body;
      
      if (!databaseId) {
        return res.status(400).json({ error: 'Database ID is required' });
      }

      console.log('Syncing Notion database:', databaseId);

      const notionPages = await listNotionPages(databaseId);
      console.log(`Found ${notionPages.length} pages in database`);
      const synced = [];

      for (const page of notionPages) {
        // Skip checking for existing post since we're no longer syncing from Notion
        const existingPost = null;
        const content = await getNotionPageContent(page.id);

        // Map category to content type with normalization
        const category = page.category || 'News';
        const normalizedCategory = category.toLowerCase().trim();
        let contentType: 'News' | 'Learn' | 'Analysis' | 'Regulation' = 'News';
        
        const learnKeywords = ['learn', 'education', 'educational', 'tutorial', 'guide', 'course', 'lesson'];
        const analysisKeywords = ['analysis', 'analyses', 'research', 'report', 'insight', 'study'];
        const regulationKeywords = ['regulation', 'regulations', 'policy', 'policies', 'legal', 'compliance', 'law'];
        
        if (learnKeywords.some(k => normalizedCategory.includes(k))) {
          contentType = 'Learn';
        } else if (analysisKeywords.some(k => normalizedCategory.includes(k))) {
          contentType = 'Analysis';
        } else if (regulationKeywords.some(k => normalizedCategory.includes(k))) {
          contentType = 'Regulation';
        }

        const blogPostData = {
          title: page.title,
          slug: page.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
          excerpt: page.excerpt || content.substring(0, 200) + '...',
          content,
          category,
          contentType,
          coverImage: page.coverImage,
          author: 'Pyrax Editorial',
          readTime: Math.ceil(content.split(' ').length / 200) + ' min read',
          status: 'published' as const,
        };

        // Always create new post when syncing from Notion
        const created = await storage.createBlogPost(blogPostData);
        synced.push(created);
      }

      console.log(`Successfully synced ${synced.length} posts`);
      res.json({ success: true, synced: synced.length, posts: synced });
    } catch (error: any) {
      console.error('Notion sync error:', error);
      const errorMessage = error.message || 'Unknown error occurred';
      
      if (errorMessage.includes('Could not find database')) {
        return res.status(404).json({ 
          error: 'Database not found. Make sure the database is shared with your Notion integration.' 
        });
      }
      
      if (errorMessage.includes('API token is invalid')) {
        return res.status(401).json({ 
          error: 'Invalid Notion API token. Please check your NOTION_API_KEY.' 
        });
      }
      
      res.status(500).json({ error: errorMessage });
    }
  });

  app.post('/api/blog-posts', async (req, res) => {
    try {
      const validated = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(validated);
      res.json(post);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch('/api/blog-posts/:id', async (req, res) => {
    try {
      const updates = req.body;
      const post = await storage.updateBlogPost(req.params.id, updates);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete('/api/blog-posts/:id', async (req, res) => {
    try {
      const deleted = await storage.deleteBlogPost(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // XML Sitemap
  app.get('/sitemap.xml', async (req, res) => {
    try {
      const baseUrl = 'https://pyrax.io';
      const currentDate = new Date().toISOString();
      
      // Static pages
      const staticPages = [
        { url: '/', priority: '1.0', changefreq: 'daily', lastmod: currentDate },
        { url: '/markets', priority: '0.9', changefreq: 'hourly', lastmod: currentDate },
        { url: '/learn', priority: '0.9', changefreq: 'weekly', lastmod: currentDate },
        { url: '/analysis', priority: '0.8', changefreq: 'daily', lastmod: currentDate },
        { url: '/regulation', priority: '0.8', changefreq: 'weekly', lastmod: currentDate },
        { url: '/about', priority: '0.7', changefreq: 'monthly', lastmod: currentDate },
        { url: '/cms', priority: '0.3', changefreq: 'monthly', lastmod: currentDate },
      ];

      // Top cryptocurrency pages from cached markets data
      let topCoins = getCachedMarkets(50); // Get top 50 coins by market cap
      
      // Fallback to essential coins if cache is empty (before prewarm completes)
      if (topCoins.length === 0) {
        topCoins = [
          { id: 'bitcoin' }, { id: 'ethereum' }, { id: 'tether' }, { id: 'binancecoin' },
          { id: 'solana' }, { id: 'ripple' }, { id: 'usd-coin' }, { id: 'cardano' },
          { id: 'dogecoin' }, { id: 'avalanche-2' }
        ];
      }
      
      const coinPages = topCoins.map(coin => ({
        url: `/coin/${coin.id}`,
        priority: '0.7',
        changefreq: 'hourly',
        lastmod: currentDate
      }));

      // Get blog posts
      const blogPosts = await storage.getBlogPosts();
      const blogPages = blogPosts.slice(0, 50).map(post => ({
        url: `/article/${post.id}`,
        priority: '0.6',
        changefreq: 'weekly',
        lastmod: post.updatedAt || post.publishedAt || currentDate
      }));

      const allPages = [...staticPages, ...coinPages, ...blogPages];

      const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

      res.header('Content-Type', 'application/xml');
      res.send(xml);
    } catch (error: any) {
      res.status(500).send('Error generating sitemap');
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

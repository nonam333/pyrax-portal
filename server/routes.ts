import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import cryptoRoutes from "./crypto";
import { searchNotionDatabases, listNotionPages, getNotionPageContent } from "./notion";
import { insertBlogPostSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Crypto API proxy routes
  app.use('/api/crypto', cryptoRoutes);

  // Blog posts routes
  app.get('/api/blog-posts', async (req, res) => {
    try {
      const posts = await storage.getBlogPosts();
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

      const notionPages = await listNotionPages(databaseId);
      const synced = [];

      for (const page of notionPages) {
        const existingPost = await storage.getBlogPostByNotionId(page.id);
        const content = await getNotionPageContent(page.id);

        const blogPostData = {
          notionPageId: page.id,
          title: page.title,
          excerpt: page.excerpt || content.substring(0, 200) + '...',
          content,
          category: page.category || 'News',
          coverImage: page.coverImage,
          author: 'Pyrax Editorial',
          readTime: Math.ceil(content.split(' ').length / 200) + ' min read',
        };

        if (existingPost) {
          const updated = await storage.updateBlogPost(existingPost.id, blogPostData);
          synced.push(updated);
        } else {
          const created = await storage.createBlogPost(blogPostData);
          synced.push(created);
        }
      }

      res.json({ success: true, synced: synced.length, posts: synced });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
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

  const httpServer = createServer(app);

  return httpServer;
}

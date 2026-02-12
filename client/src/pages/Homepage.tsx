import { useQuery } from '@tanstack/react-query';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import NewsletterSignup from '@/components/NewsletterSignup';
import Footer from '@/components/Footer';
import MarketWidgets from '@/components/MarketWidgets';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ChevronRight, TrendingUp, Clock, User, Zap, AlertCircle, BarChart3, Globe, Shield, Eye } from 'lucide-react';
import { Link } from 'wouter';
import { getBlogPosts } from "@/lib/blog-api";
import heroImage from '@assets/stock_images/cryptocurrency_bitco_dc2a9a3e.jpg';
import cryptoImage1 from '@assets/stock_images/cryptocurrency_bitco_501fe450.jpg';
import cryptoImage2 from '@assets/stock_images/cryptocurrency_bitco_a2d83bee.jpg';
import cryptoImage3 from '@assets/stock_images/cryptocurrency_bitco_0dc72002.jpg';
import cryptoImage4 from '@assets/stock_images/cryptocurrency_bitco_ea23432b.jpg';
import dashboardImage from '@assets/stock_images/modern_financial_das_c45b57bc.jpg';
import dashboardImage2 from '@assets/stock_images/modern_financial_das_e2b2a0f5.jpg';
import dashboardImage3 from '@assets/stock_images/modern_financial_das_aff5d616.jpg';

interface BlogPost {
  id: string;
  notionPageId?: string;
  title: string;
  excerpt?: string;
  content?: string;
  category?: string;
  coverImage?: string;
  author: string;
  readTime: string;
  publishedAt: string;
}

interface Article {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
}

export default function Homepage() {
  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts'],
    queryFn: getBlogPosts,
  });

  const stockImages = [heroImage, cryptoImage1, cryptoImage2, cryptoImage3, cryptoImage4, dashboardImage, dashboardImage2, dashboardImage3];

  const postsWithImages = (posts || []).map((post, index) => ({
    ...post,
    image: post.coverImage || stockImages[index % stockImages.length],
  }));

  const featuredArticle: Article = postsWithImages[0] ? {
    id: postsWithImages[0].id,
    title: postsWithImages[0].title,
    excerpt: postsWithImages[0].excerpt || '',
    image: postsWithImages[0].image,
    category: postsWithImages[0].category || 'News',
    author: postsWithImages[0].author,
    publishedAt: new Date(postsWithImages[0].publishedAt).toLocaleDateString(),
    readTime: postsWithImages[0].readTime,
  } : {
    id: '1',
    title: 'Welcome to Pyrax',
    excerpt: 'Your source for cryptocurrency news and market analysis.',
    image: heroImage,
    category: 'News',
    author: 'Pyrax Editorial',
    publishedAt: 'Today',
    readTime: '5 min read'
  };

  const latestNews: Article[] = postsWithImages
    .filter((post: any) => post.category === 'News' && post.id !== featuredArticle.id)
    .slice(0, 4)
    .map((post: any) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt || '',
      image: post.image,
      category: post.category || 'News',
      author: post.author,
      publishedAt: new Date(post.publishedAt).toLocaleDateString(),
      readTime: post.readTime,
    }));

  const marketNews: Article[] = postsWithImages
    .filter((post: any) => post.category === 'Market' || post.contentType === 'Analysis')
    .slice(0, 3)
    .map((post: any) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt || '',
      image: post.image,
      category: post.category || 'Markets',
      author: post.author,
      publishedAt: new Date(post.publishedAt).toLocaleDateString(),
      readTime: post.readTime,
    }));

  const quickReads: Article[] = postsWithImages
    .filter((post: any) => post.category === 'Quick Read' || post.contentType === 'Quick Read')
    .slice(0, 4)
    .map((post: any) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt || '',
      image: post.image,
      category: post.category || 'Quick Reads',
      author: post.author,
      publishedAt: new Date(post.publishedAt).toLocaleDateString(),
      readTime: post.readTime,
    }));

  const breakingNews: Article[] = postsWithImages
    .filter((post: any) => post.category === 'Breaking')
    .slice(0, 3)
    .map((post: any) => ({
      id: post.id,
      title: post.title,
      excerpt: post.excerpt || '',
      image: post.image,
      category: post.category || 'Breaking',
      author: post.author,
      publishedAt: new Date(post.publishedAt).toLocaleDateString(),
      readTime: post.readTime,
    }));


  return (
    <div className="min-h-screen bg-background" data-testid="page-homepage">
      <SEO
        title="Pyrax - Cryptocurrency News & Markets Portal"
        description="Stay informed with the latest cryptocurrency news, real-time market data, expert analysis, and educational resources. Your trusted source for Bitcoin, Ethereum, DeFi, and crypto markets."
        keywords="cryptocurrency news, bitcoin, ethereum, crypto markets, blockchain, defi, nfts, crypto analysis, cryptocurrency prices"
        schema={{
          type: 'organization',
          name: 'Pyrax',
          description: 'Leading cryptocurrency news and markets portal providing real-time data, expert analysis, and educational resources',
          sameAs: [
            'https://twitter.com/pyrax',
            'https://linkedin.com/company/pyrax'
          ]
        }}
      />
      <PriceTicker />
      <Navbar />



      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3 space-y-8">

            {/* Featured Article */}
            <section data-testid="featured-section">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Featured</h2>
                <Badge className="bg-gradient-to-r from-primary to-accent text-black">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Trending
                </Badge>
              </div>
              <ArticleCard article={featuredArticle} variant="large" />
            </section>

            {/* Latest News */}
            <section data-testid="latest-news-section">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Latest News</h2>
                <Link href="/latest">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {latestNews.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>



            {/* Market Analysis */}
            <section data-testid="market-analysis-section">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Market Analysis</h2>
                <Link href="/markets">
                  <Button variant="outline" size="sm">
                    Markets <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {marketNews.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            </section>

            {/* Quick Reads */}
            <section data-testid="quick-reads-section">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Quick Reads</h2>
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  Under 5 min
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickReads.map((article) => (
                  <Card key={article.id} className="p-4">
                    <Link href={`/article/${article.id}`}>
                      <div className="cursor-pointer">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-32 object-cover rounded-md mb-3"
                        />
                        <Badge variant="secondary" className="text-xs mb-2">
                          {article.category}
                        </Badge>
                        <h3 className="font-semibold text-sm text-card-foreground mb-2 line-clamp-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <User className="h-3 w-3 mr-1" />
                          <span>{article.author}</span>
                          <span className="mx-2">•</span>
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>

            {/* Breaking News */}
            <section data-testid="breaking-news-section">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <h2 className="text-2xl font-bold text-foreground">Breaking News</h2>
                  <Badge className="bg-destructive text-white animate-pulse">
                    <Zap className="h-3 w-3 mr-1" />
                    Live
                  </Badge>
                </div>
                <Link href="/breaking">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                    All Breaking <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {breakingNews.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            </section>



            {/* Market Widgets - Live CoinGecko Data */}
            <MarketWidgets />

            {/* Newsletter CTA */}
            <section className="py-8" data-testid="newsletter-cta-section">
              <Card className="p-8 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20 text-center">
                <h2 className="text-3xl font-bold text-card-foreground mb-4">Stay Ahead of the Curve</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join 250,000+ crypto enthusiasts who rely on Pyrax for the most accurate,
                  timely, and insightful cryptocurrency news and analysis.
                </p>
                <div className="max-w-md mx-auto">
                  <NewsletterSignup variant="compact" />
                </div>
                <div className="flex items-center justify-center space-x-6 mt-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>No spam</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Globe className="h-4 w-4" />
                    <span>Unsubscribe anytime</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <AlertCircle className="h-4 w-4" />
                    <span>Weekly digest</span>
                  </div>
                </div>
              </Card>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Sidebar />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
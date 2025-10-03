import { useQuery } from '@tanstack/react-query';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import NewsletterSignup from '@/components/NewsletterSignup';
import AdSlot from '@/components/AdSlot';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ChevronRight, TrendingUp, Clock, User, Zap, AlertCircle, BarChart3, Globe, Shield, Eye } from 'lucide-react';
import { Link } from 'wouter';
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
  const { data: blogPosts, isLoading } = useQuery<BlogPost[]>({
    queryKey: ['/api/blog-posts'],
  });

  const stockImages = [heroImage, cryptoImage1, cryptoImage2, cryptoImage3, cryptoImage4, dashboardImage, dashboardImage2, dashboardImage3];
  
  const postsWithImages = (blogPosts || []).map((post, index) => ({
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

  const latestNews: Article[] = postsWithImages.slice(1, 5).map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || '',
    image: post.image,
    category: post.category || 'News',
    author: post.author,
    publishedAt: new Date(post.publishedAt).toLocaleDateString(),
    readTime: post.readTime,
  }));

  const marketNews: Article[] = postsWithImages.slice(5, 8).map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || '',
    image: post.image,
    category: post.category || 'Markets',
    author: post.author,
    publishedAt: new Date(post.publishedAt).toLocaleDateString(),
    readTime: post.readTime,
  }));

  const quickReads: Article[] = postsWithImages.slice(8, 12).map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt || '',
    image: post.image,
    category: post.category || 'Quick Reads',
    author: post.author,
    publishedAt: new Date(post.publishedAt).toLocaleDateString(),
    readTime: post.readTime,
  }));

  const breakingNews: Article[] = postsWithImages.slice(0, 3).length > 0 
    ? postsWithImages.slice(0, 3).map(post => ({
        id: post.id,
        title: post.title,
        excerpt: post.excerpt || '',
        image: post.image,
        category: post.category || 'Breaking',
        author: post.author,
        publishedAt: new Date(post.publishedAt).toLocaleDateString(),
        readTime: post.readTime,
      }))
    : [
        {
          id: '13',
          title: 'Major Exchange Announces Zero-Fee Bitcoin Trading',
          excerpt: 'Leading cryptocurrency exchange eliminates trading fees for BTC pairs.',
          image: cryptoImage1,
          category: 'Breaking',
          author: 'Sarah Chen',
          publishedAt: '30 min ago',
          readTime: '3 min read'
        },
        {
          id: '14',
          title: 'Fed Chairman Discusses Digital Dollar Timeline',
          excerpt: 'Central bank digital currency could launch within 5 years.',
          image: cryptoImage2,
          category: 'Policy',
          author: 'Alex Rodriguez',
          publishedAt: '45 min ago',
          readTime: '4 min read'
        },
        {
          id: '15',
          title: 'Ethereum Layer 2 Adoption Hits Record High',
          excerpt: 'L2 transactions now account for 60% of Ethereum activity.',
          image: cryptoImage3,
          category: 'Ethereum',
          author: 'Emma Wilson',
          publishedAt: '1 hour ago',
          readTime: '3 min read'
        }
      ];

  const researchArticles: Article[] = [
    {
      id: '16',
      title: 'Institutional Bitcoin Accumulation Patterns Analysis',
      excerpt: 'Deep dive into how corporations are building crypto treasury positions.',
      image: dashboardImage,
      category: 'Research',
      author: 'David Kim',
      publishedAt: '2 hours ago',
      readTime: '12 min read'
    },
    {
      id: '17',
      title: 'DeFi Yield Farming: Risk vs Reward Assessment',
      excerpt: 'Comprehensive analysis of current yield farming opportunities and risks.',
      image: dashboardImage2,
      category: 'Research',
      author: 'Lisa Zhang',
      publishedAt: '4 hours ago',
      readTime: '15 min read'
    },
    {
      id: '18',
      title: 'NFT Market Cycles and Prediction Models',
      excerpt: 'Using data science to understand NFT market movements.',
      image: dashboardImage3,
      category: 'Research',
      author: 'James Parker',
      publishedAt: '6 hours ago',
      readTime: '10 min read'
    }
  ];

  const popularArticles: Article[] = [
    {
      id: '19',
      title: 'Complete Guide to Crypto Tax Reporting 2025',
      excerpt: 'Everything you need to know about cryptocurrency taxes this year.',
      image: cryptoImage4,
      category: 'Education',
      author: 'Maria Santos',
      publishedAt: '1 day ago',
      readTime: '18 min read'
    },
    {
      id: '20',
      title: 'How to Spot Crypto Scams: Red Flags Guide',
      excerpt: 'Protect yourself from common cryptocurrency fraud schemes.',
      image: cryptoImage1,
      category: 'Security',
      author: 'Robert Chen',
      publishedAt: '2 days ago',
      readTime: '8 min read'
    },
    {
      id: '21',
      title: 'Setting Up Your First Hardware Wallet',
      excerpt: 'Step-by-step guide to securing your cryptocurrency holdings.',
      image: cryptoImage2,
      category: 'Education',
      author: 'Sarah Chen',
      publishedAt: '3 days ago',
      readTime: '12 min read'
    },
    {
      id: '22',
      title: 'Understanding Blockchain Consensus Mechanisms',
      excerpt: 'Comparing Proof of Work, Proof of Stake, and emerging alternatives.',
      image: cryptoImage3,
      category: 'Technology',
      author: 'Alex Rodriguez',
      publishedAt: '4 days ago',
      readTime: '14 min read'
    }
  ];

  // todo: remove mock functionality - replace with real market data
  const marketOverview = {
    totalMarketCap: '$2.35T',
    totalVolume: '$45.6B',
    btcDominance: '42.8%',
    activeCoins: '13,245',
    fearGreedIndex: 72
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-homepage">
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

            {/* Ad Banner */}
            <div className="flex justify-center py-4">
              <AdSlot size="banner" position="content-middle" />
            </div>

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
                  <Card key={article.id} className="p-4 hover-elevate">
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

            {/* Market Overview Widget */}
            <section data-testid="market-overview-section">
              <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-card-foreground">Market Overview</h2>
                  <Badge variant="secondary">
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Live Data
                  </Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-card-foreground mb-1">{marketOverview.totalMarketCap}</div>
                    <div className="text-sm text-muted-foreground">Market Cap</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-card-foreground mb-1">{marketOverview.totalVolume}</div>
                    <div className="text-sm text-muted-foreground">24h Volume</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-card-foreground mb-1">{marketOverview.btcDominance}</div>
                    <div className="text-sm text-muted-foreground">BTC Dominance</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-card-foreground mb-1">{marketOverview.activeCoins}</div>
                    <div className="text-sm text-muted-foreground">Active Coins</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold mb-1 ${marketOverview.fearGreedIndex > 50 ? 'text-primary' : 'text-destructive'}`}>
                      {marketOverview.fearGreedIndex}
                    </div>
                    <div className="text-sm text-muted-foreground">Fear & Greed</div>
                  </div>
                </div>
                <div className="mt-6 text-center">
                  <Link href="/markets">
                    <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-semibold">
                      <Eye className="h-4 w-4 mr-2" />
                      View Full Markets
                    </Button>
                  </Link>
                </div>
              </Card>
            </section>

            {/* Research & Analysis */}
            <section data-testid="research-section">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Research & Analysis</h2>
                <Link href="/research">
                  <Button variant="outline" size="sm">
                    All Research <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {researchArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>

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

            {/* Popular This Week */}
            <section data-testid="popular-section">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Popular This Week</h2>
                <Badge variant="secondary">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Most Read
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {popularArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </section>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Sidebar />
            <AdSlot size="square" position="sidebar" />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
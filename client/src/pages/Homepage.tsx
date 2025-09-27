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
import { ChevronRight, TrendingUp, Clock, User } from 'lucide-react';
import { Link } from 'wouter';
import heroImage from '@assets/stock_images/cryptocurrency_bitco_dc2a9a3e.jpg';
import cryptoImage1 from '@assets/stock_images/cryptocurrency_bitco_501fe450.jpg';
import cryptoImage2 from '@assets/stock_images/cryptocurrency_bitco_a2d83bee.jpg';
import cryptoImage3 from '@assets/stock_images/cryptocurrency_bitco_0dc72002.jpg';
import cryptoImage4 from '@assets/stock_images/cryptocurrency_bitco_ea23432b.jpg';
import dashboardImage from '@assets/stock_images/modern_financial_das_c45b57bc.jpg';
import dashboardImage2 from '@assets/stock_images/modern_financial_das_e2b2a0f5.jpg';
import dashboardImage3 from '@assets/stock_images/modern_financial_das_aff5d616.jpg';

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
  // todo: remove mock functionality - replace with real article data  
  const featuredArticle: Article = {
    id: '1',
    title: 'Bitcoin Surges Past $45,000 as Institutional Adoption Accelerates',
    excerpt: 'Major financial institutions continue to embrace cryptocurrency, driving unprecedented market growth and mainstream acceptance. This latest surge marks a significant milestone in Bitcoin\'s journey toward becoming a store of value.',
    image: heroImage,
    category: 'Bitcoin',
    author: 'Sarah Chen',
    publishedAt: '2 hours ago',
    readTime: '8 min read'
  };

  const latestNews: Article[] = [
    {
      id: '2',
      title: 'SEC Commissioner Peirce Urges Quick Progress on Crypto Regulation',
      excerpt: 'As regulatory landscape softens, industry leaders push for clear guidelines.',
      image: cryptoImage1,
      category: 'Regulation',
      author: 'Alex Rodriguez',
      publishedAt: '4 hours ago',
      readTime: '4 min read'
    },
    {
      id: '3',
      title: 'Kraken Considers $20 Billion Valuation Ahead of Planned IPO',
      excerpt: 'Exchange giant mulls potential investor as public offering approaches.',
      image: cryptoImage2,
      category: 'Business',
      author: 'Emma Wilson',
      publishedAt: '6 hours ago',
      readTime: '3 min read'
    },
    {
      id: '4',
      title: 'Tether\'s $20 Billion Funding Round Draws Major Investors',
      excerpt: 'SoftBank and Ark reportedly among potential backers for stablecoin issuer.',
      image: cryptoImage3,
      category: 'DeFi',
      author: 'David Kim',
      publishedAt: '8 hours ago',
      readTime: '5 min read'
    },
    {
      id: '5',
      title: 'Swift Experiments with Ethereum Layer 2 Integration',
      excerpt: 'Global payments network tests onchain migration using Linea protocol.',
      image: cryptoImage4,
      category: 'Technology',
      author: 'Lisa Zhang',
      publishedAt: '10 hours ago',
      readTime: '6 min read'
    }
  ];

  const marketNews: Article[] = [
    {
      id: '6',
      title: 'DeFi Protocols See Record TVL Growth',
      excerpt: 'Total Value Locked reaches $100B milestone as institutions embrace DeFi.',
      image: dashboardImage,
      category: 'DeFi',
      author: 'James Parker',
      publishedAt: '12 hours ago',
      readTime: '4 min read'
    },
    {
      id: '7',
      title: 'NFT Market Shows Recovery Signs',
      excerpt: 'Trading volumes surge as utility-focused projects gain traction.',
      image: dashboardImage2,
      category: 'NFTs',
      author: 'Maria Santos',
      publishedAt: '14 hours ago',
      readTime: '3 min read'
    },
    {
      id: '8',
      title: 'Central Bank Digital Currencies Gain Momentum',
      excerpt: 'Major economies accelerate CBDC development amid digital payment growth.',
      image: dashboardImage3,
      category: 'CBDC',
      author: 'Robert Chen',
      publishedAt: '16 hours ago',
      readTime: '5 min read'
    }
  ];

  const quickReads: Article[] = [
    {
      id: '9',
      title: 'Solana Network Upgrade Promises Faster Transactions',
      excerpt: 'Latest improvements aim to reduce costs while increasing throughput.',
      image: cryptoImage1,
      category: 'Altcoins',
      author: 'Alex Rodriguez',
      publishedAt: '1 day ago',
      readTime: '2 min read'
    },
    {
      id: '10',
      title: 'Crypto Derivatives Hit Record Volumes',
      excerpt: 'Institutional trading drives sophisticated market growth.',
      image: cryptoImage2,
      category: 'Markets',
      author: 'Emma Wilson',
      publishedAt: '1 day ago',
      readTime: '2 min read'
    },
    {
      id: '11',
      title: 'Web3 Gaming Revenue Surges 200%',
      excerpt: 'Blockchain games see unprecedented adoption and investment.',
      image: cryptoImage3,
      category: 'Gaming',
      author: 'David Kim',
      publishedAt: '1 day ago',
      readTime: '3 min read'
    },
    {
      id: '12',
      title: 'Ethereum Staking Rewards Hit New High',
      excerpt: 'Network participation reaches record levels as rewards climb.',
      image: cryptoImage4,
      category: 'Ethereum',
      author: 'Lisa Zhang',
      publishedAt: '1 day ago',
      readTime: '2 min read'
    }
  ];

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

            {/* Newsletter */}
            <section className="py-8">
              <NewsletterSignup />
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
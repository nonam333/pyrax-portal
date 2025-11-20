import ArticleCard from './ArticleCard';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import heroImage from '@assets/stock_images/cryptocurrency_bitco_dc2a9a3e.jpg';
import cryptoImage1 from '@assets/stock_images/cryptocurrency_bitco_501fe450.jpg';
import cryptoImage2 from '@assets/stock_images/cryptocurrency_bitco_a2d83bee.jpg';
import cryptoImage3 from '@assets/stock_images/cryptocurrency_bitco_0dc72002.jpg';
import cryptoImage4 from '@assets/stock_images/cryptocurrency_bitco_ea23432b.jpg';
import dashboardImage from '@assets/stock_images/modern_financial_das_c45b57bc.jpg';

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

interface NewsGridProps {
  articles?: Article[];
}

export default function NewsGrid({ articles }: NewsGridProps) {
  // todo: remove mock functionality - replace with real article data
  const defaultArticles: Article[] = [
    {
      id: '2',
      title: 'DeFi Protocols See Record-Breaking TVL Growth',
      excerpt: 'Total Value Locked in DeFi protocols reaches $100 billion as institutional investors embrace decentralized finance solutions.',
      image: cryptoImage1,
      category: 'DeFi',
      author: 'Alex Rodriguez',
      publishedAt: '6 hours ago',
      readTime: '4 min read'
    },
    {
      id: '3',
      title: 'NFT Market Shows Signs of Recovery',
      excerpt: 'After months of decline, NFT trading volumes surge as new utility-focused projects gain traction among collectors.',
      image: cryptoImage2,
      category: 'NFTs',
      author: 'Emma Wilson',
      publishedAt: '8 hours ago',
      readTime: '3 min read'
    },
    {
      id: '4',
      title: 'Central Bank Digital Currencies Gain Momentum',
      excerpt: 'Major economies accelerate CBDC development as digital payment adoption reaches unprecedented levels.',
      image: cryptoImage3,
      category: 'Regulations',
      author: 'David Kim',
      publishedAt: '12 hours ago',
      readTime: '6 min read'
    },
    {
      id: '5',
      title: 'Solana Network Upgrade Promises Faster Transactions',
      excerpt: 'Latest network improvements aim to reduce transaction costs while increasing throughput capabilities.',
      image: cryptoImage4,
      category: 'Altcoins',
      author: 'Lisa Zhang',
      publishedAt: '1 day ago',
      readTime: '4 min read'
    },
    {
      id: '6',
      title: 'Crypto Derivatives Market Reaches New Heights',
      excerpt: 'Institutional trading volumes in cryptocurrency derivatives hit record levels as market sophistication grows.',
      image: dashboardImage,
      category: 'Markets',
      author: 'James Parker',
      publishedAt: '1 day ago',
      readTime: '5 min read'
    }
  ];

  const newsArticles = articles || defaultArticles;

  return (
    <section className="py-12 bg-background" data-testid="news-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2" data-testid="text-news-title">
              Latest Crypto News
            </h2>
            <p className="text-muted-foreground" data-testid="text-news-subtitle">
              Stay updated with the most important developments in cryptocurrency
            </p>
          </div>
          <Button 
            variant="outline" 
            className="hidden sm:flex items-center space-x-2 hover:bg-primary hover:text-primary-foreground"
            data-testid="button-view-all"
            onClick={() => console.log('View all news triggered')}
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Featured Article */}
        {newsArticles.length > 0 && (
          <div className="mb-12">
            <ArticleCard article={newsArticles[0]} variant="large" />
          </div>
        )}

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {newsArticles.slice(1).map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="sm:hidden text-center">
          <Button 
            variant="outline" 
            className="w-full items-center space-x-2 hover:bg-primary hover:text-primary-foreground"
            data-testid="button-mobile-view-all"
            onClick={() => console.log('Mobile view all news triggered')}
          >
            <span>View All News</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
import { useParams } from 'wouter';
import { useState, useEffect } from 'react';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import ArticleCard from '@/components/ArticleCard';
import Sidebar from '@/components/Sidebar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Clock, User, Share2, Bookmark, ChevronLeft, Twitter, Facebook, Linkedin } from 'lucide-react';
import { Link } from 'wouter';
import heroImage from '@assets/stock_images/cryptocurrency_bitco_dc2a9a3e.jpg';
import cryptoImage1 from '@assets/stock_images/cryptocurrency_bitco_501fe450.jpg';
import cryptoImage2 from '@assets/stock_images/cryptocurrency_bitco_a2d83bee.jpg';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishedAt: string;
  readTime: string;
}

export default function ArticlePage() {
  const params = useParams();
  const articleId = params.id || '1';
  const [isBookmarked, setIsBookmarked] = useState(false);

  // todo: remove mock functionality - replace with real article data
  const [article, setArticle] = useState<Article>({
    id: '1',
    title: 'Bitcoin Surges Past $45,000 as Institutional Adoption Accelerates',
    excerpt: 'Major financial institutions continue to embrace cryptocurrency, driving unprecedented market growth and mainstream acceptance.',
    content: `
      <p>Bitcoin has reached a significant milestone, surging past the $45,000 mark as institutional adoption continues to accelerate across global markets. This latest price movement represents more than just market speculation—it signals a fundamental shift in how traditional finance views cryptocurrency.</p>

      <h2>Institutional Investment Surge</h2>
      <p>The current rally has been primarily driven by increased institutional investment, with several Fortune 500 companies announcing significant Bitcoin purchases for their treasury reserves. Major financial institutions, including prominent investment banks and asset management firms, have been quietly accumulating Bitcoin positions throughout the past quarter.</p>

      <blockquote>"We're witnessing a paradigm shift where Bitcoin is no longer seen as speculative digital asset, but as a legitimate store of value," said Maria Santos, Chief Investment Officer at Global Asset Management.</blockquote>

      <h2>Market Dynamics</h2>
      <p>The surge comes amid several positive developments in the cryptocurrency space:</p>
      <ul>
        <li>Regulatory clarity in major jurisdictions</li>
        <li>Increased corporate adoption</li>
        <li>Growing institutional infrastructure</li>
        <li>Enhanced security measures</li>
      </ul>

      <p>Trading volumes have increased by over 200% in the past week, with institutional trading accounting for approximately 65% of all Bitcoin transactions. This shift towards institutional participation has provided additional market stability and reduced volatility compared to previous bull runs.</p>

      <h2>Technical Analysis</h2>
      <p>From a technical perspective, Bitcoin has broken through several key resistance levels, with analysts pointing to strong support at the $42,000 level. The relative strength index (RSI) indicates continued bullish momentum, though some caution against potential short-term corrections.</p>

      <p>The current price action has also been supported by decreased selling pressure from long-term holders, indicating confidence in Bitcoin's long-term trajectory. On-chain metrics show that Bitcoin addresses holding coins for more than one year have reached all-time highs.</p>

      <h2>Global Impact</h2>
      <p>This latest surge has had ripple effects across the broader cryptocurrency market, with major altcoins following Bitcoin's lead. Ethereum has gained 15% in the past 24 hours, while other top-tier cryptocurrencies have seen similar gains.</p>

      <p>The institutional adoption trend is expected to continue, with several major banks announcing plans to offer cryptocurrency services to their clients in the coming months. This growing acceptance by traditional financial institutions represents a significant validation of cryptocurrency as an asset class.</p>

      <h2>Looking Forward</h2>
      <p>While the current momentum appears strong, experts caution that cryptocurrency markets remain volatile and investors should conduct thorough research before making investment decisions. The long-term outlook for Bitcoin remains positive, with many analysts predicting continued growth as institutional adoption accelerates.</p>

      <p>As the cryptocurrency market matures, we can expect to see continued integration with traditional financial systems, potentially leading to greater stability and broader adoption across various sectors of the economy.</p>
    `,
    image: heroImage,
    category: 'Bitcoin',
    author: 'Sarah Chen',
    publishedAt: '2 hours ago',
    readTime: '8 min read'
  });

  // todo: remove mock functionality - replace with real related articles
  const relatedArticles = [
    {
      id: '2',
      title: 'DeFi Protocols See Record-Breaking TVL Growth',
      excerpt: 'Total Value Locked in DeFi protocols reaches $100 billion as institutional investors embrace decentralized finance.',
      image: cryptoImage1,
      category: 'DeFi',
      author: 'Alex Rodriguez',
      publishedAt: '4 hours ago',
      readTime: '5 min read'
    },
    {
      id: '3',
      title: 'NFT Market Shows Signs of Recovery',
      excerpt: 'After months of decline, NFT trading volumes surge as new utility-focused projects gain traction.',
      image: cryptoImage2,
      category: 'NFTs',
      author: 'Emma Wilson',
      publishedAt: '6 hours ago',
      readTime: '4 min read'
    }
  ];

  const shareUrl = `${window.location.origin}/article/${articleId}`;

  const handleShare = (platform: string) => {
    const text = `${article.title} - ${article.excerpt}`;
    const url = shareUrl;
    
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };
    
    console.log(`Sharing on ${platform}:`, urls[platform as keyof typeof urls]);
    // todo: remove mock functionality - implement real social sharing
  };

  return (
    <div className="min-h-screen bg-background" data-testid="page-article">
      <PriceTicker />
      <Navbar />
      
      {/* Article Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary" data-testid="button-back">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to News
              </Button>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Badge 
                className="mb-4 bg-gradient-to-r from-primary to-accent text-black font-semibold"
                data-testid="badge-category"
              >
                {article.category}
              </Badge>
              
              <h1 className="text-4xl md:text-5xl font-bold text-card-foreground mb-6 leading-tight" data-testid="text-article-title">
                {article.title}
              </h1>
              
              <p className="text-xl text-muted-foreground mb-6 leading-relaxed" data-testid="text-article-excerpt">
                {article.excerpt}
              </p>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-6 text-muted-foreground">
                  <div className="flex items-center space-x-2" data-testid="meta-author">
                    <User className="h-4 w-4" />
                    <span className="text-sm font-medium">{article.author}</span>
                  </div>
                  <div className="flex items-center space-x-2" data-testid="meta-time">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{article.publishedAt}</span>
                  </div>
                  <span className="text-sm" data-testid="text-read-time">{article.readTime}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsBookmarked(!isBookmarked)}
                    className={isBookmarked ? 'bg-primary text-black' : ''}
                    data-testid="button-bookmark"
                  >
                    <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                  </Button>
                  <Button variant="outline" size="sm" data-testid="button-share">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <img 
                src={article.image} 
                alt={article.title}
                className="w-full h-64 lg:h-80 object-cover rounded-lg"
                data-testid="img-article-hero"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            <div className="max-w-4xl">
              {/* Article Body */}
              <div 
                className="prose prose-lg prose-invert max-w-none mb-12"
                style={{
                  color: 'hsl(var(--card-foreground))',
                }}
                data-testid="article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
              
              {/* Social Sharing */}
              <Card className="p-6 mb-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid="text-share-title">
                      Share this article
                    </h3>
                    <p className="text-sm text-muted-foreground" data-testid="text-share-subtitle">
                      Help spread important crypto news
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShare('twitter')}
                      data-testid="button-share-twitter"
                    >
                      <Twitter className="h-4 w-4 mr-2" />
                      Twitter
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShare('facebook')}
                      data-testid="button-share-facebook"
                    >
                      <Facebook className="h-4 w-4 mr-2" />
                      Facebook
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleShare('linkedin')}
                      data-testid="button-share-linkedin"
                    >
                      <Linkedin className="h-4 w-4 mr-2" />
                      LinkedIn
                    </Button>
                  </div>
                </div>
              </Card>
              
              {/* Related Articles */}
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-6" data-testid="text-related-title">
                  Related Articles
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedArticles.map((relatedArticle) => (
                    <ArticleCard key={relatedArticle.id} article={relatedArticle} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
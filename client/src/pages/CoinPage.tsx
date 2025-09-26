import { useParams } from 'wouter';
import { useState, useEffect } from 'react';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import ArticleCard from '@/components/ArticleCard';
import AdSlot from '@/components/AdSlot';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Star, Bell, ExternalLink, BarChart3 } from 'lucide-react';
import cryptoImage1 from '@assets/stock_images/cryptocurrency_bitco_501fe450.jpg';
import cryptoImage2 from '@assets/stock_images/cryptocurrency_bitco_a2d83bee.jpg';

interface CoinData {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  rank: number;
  description: string;
}

export default function CoinPage() {
  const params = useParams();
  const coinId = params.id || 'bitcoin';
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  
  // todo: remove mock functionality - replace with real coin data
  const [coinData, setCoinData] = useState<CoinData>({
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    logo: '₿',
    price: 43250.50,
    change24h: 2.34,
    marketCap: 846000000000,
    volume24h: 15600000000,
    circulatingSupply: 19580000,
    totalSupply: 21000000,
    rank: 1,
    description: 'Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto.'
  });

  // todo: remove mock functionality - replace with real related articles
  const relatedArticles = [
    {
      id: '10',
      title: 'Bitcoin Network Hash Rate Reaches New All-Time High',
      excerpt: 'Network security strengthens as mining participation hits record levels, indicating strong confidence in Bitcoin\'s future.',
      image: cryptoImage1,
      category: 'Bitcoin',
      author: 'Alex Chen',
      publishedAt: '3 hours ago',
      readTime: '4 min read'
    },
    {
      id: '11',
      title: 'Major Institution Adds Bitcoin to Treasury Reserve',
      excerpt: 'Fortune 500 company allocates 5% of cash reserves to Bitcoin, citing inflation hedge and store of value properties.',
      image: cryptoImage2,
      category: 'Bitcoin',
      author: 'Sarah Kim',
      publishedAt: '8 hours ago',
      readTime: '3 min read'
    }
  ];

  useEffect(() => {
    // todo: remove mock functionality - implement real price updates
    const interval = setInterval(() => {
      setCoinData(prev => ({
        ...prev,
        price: prev.price + (Math.random() - 0.5) * prev.price * 0.001,
        change24h: prev.change24h + (Math.random() - 0.5) * 0.2
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    return num.toLocaleString();
  };

  const marketData = [
    { label: 'Market Cap', value: formatNumber(coinData.marketCap) },
    { label: '24h Volume', value: formatNumber(coinData.volume24h) },
    { label: 'Circulating Supply', value: `${coinData.circulatingSupply.toLocaleString()} ${coinData.symbol}` },
    { label: 'Total Supply', value: `${coinData.totalSupply.toLocaleString()} ${coinData.symbol}` },
    { label: 'Market Cap Rank', value: `#${coinData.rank}` }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-coin">
      {/* Price Ticker */}
      <PriceTicker />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Coin Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-black font-bold text-2xl">
                {coinData.logo}
              </div>
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-3xl font-bold text-card-foreground" data-testid="text-coin-name">
                    {coinData.name}
                  </h1>
                  <Badge variant="secondary" data-testid="badge-symbol">
                    {coinData.symbol}
                  </Badge>
                  <Badge 
                    variant="outline" 
                    className="text-muted-foreground"
                    data-testid="badge-rank"
                  >
                    Rank #{coinData.rank}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-card-foreground" data-testid="text-price">
                    ${coinData.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <Badge 
                    variant={coinData.change24h >= 0 ? 'default' : 'destructive'}
                    className={`${coinData.change24h >= 0 ? 'bg-primary text-black' : 'bg-destructive text-white'} text-lg px-3 py-1`}
                    data-testid="badge-change"
                  >
                    {coinData.change24h >= 0 ? (
                      <TrendingUp className="h-4 w-4 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 mr-1" />
                    )}
                    {Math.abs(coinData.change24h).toFixed(2)}%
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant={isWatchlisted ? 'default' : 'outline'}
                onClick={() => setIsWatchlisted(!isWatchlisted)}
                className={isWatchlisted ? 'bg-primary text-black' : ''}
                data-testid="button-watchlist"
              >
                <Star className={`h-4 w-4 mr-2 ${isWatchlisted ? 'fill-current' : ''}`} />
                {isWatchlisted ? 'Watchlisted' : 'Add to Watchlist'}
              </Button>
              <Button 
                variant="outline"
                data-testid="button-price-alert"
                onClick={() => console.log('Price alert clicked')}
              >
                <Bell className="h-4 w-4 mr-2" />
                Set Alert
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Price Chart Placeholder */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-card-foreground" data-testid="text-chart-title">
                  {coinData.name} Price Chart
                </h2>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" data-testid="button-chart-1d">1D</Button>
                  <Button variant="outline" size="sm" data-testid="button-chart-7d">7D</Button>
                  <Button variant="default" size="sm" data-testid="button-chart-30d">30D</Button>
                  <Button variant="outline" size="sm" data-testid="button-chart-1y">1Y</Button>
                </div>
              </div>
              <div className="h-80 bg-muted rounded-lg flex items-center justify-center border-dashed border-2 border-muted-foreground/30">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-2" />
                  <div className="text-lg font-medium mb-1" data-testid="text-chart-placeholder">
                    Interactive Price Chart
                  </div>
                  <div className="text-sm">
                    TradingView integration placeholder
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Market Data */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4" data-testid="text-market-data-title">
                Market Data
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {marketData.map((item, index) => (
                  <div key={item.label} className="p-4 bg-background rounded-lg border border-border">
                    <div className="text-sm text-muted-foreground mb-1" data-testid={`text-label-${index}`}>
                      {item.label}
                    </div>
                    <div className="text-lg font-semibold text-card-foreground" data-testid={`text-value-${index}`}>
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* About */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-4" data-testid="text-about-title">
                About {coinData.name}
              </h3>
              <p className="text-muted-foreground leading-relaxed" data-testid="text-description">
                {coinData.description}
              </p>
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  data-testid="button-learn-more"
                  onClick={() => console.log('Learn more clicked')}
                >
                  Learn More
                  <ExternalLink className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </Card>
            
            {/* Related News */}
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6" data-testid="text-related-news-title">
                Related News
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <AdSlot size="square" position="coin-sidebar" />
            
            {/* Quick Stats */}
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-card-foreground mb-4" data-testid="text-quick-stats">
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">All-Time High</span>
                  <span className="text-sm font-medium text-card-foreground" data-testid="text-ath">
                    $69,044.77
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">All-Time Low</span>
                  <span className="text-sm font-medium text-card-foreground" data-testid="text-atl">
                    $67.81
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">7d Change</span>
                  <span className="text-sm font-medium text-primary" data-testid="text-7d-change">
                    +12.34%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">30d Change</span>
                  <span className="text-sm font-medium text-primary" data-testid="text-30d-change">
                    +8.91%
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
import { useState, useEffect } from 'react';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import ArticleCard from '@/components/ArticleCard';
import AdSlot from '@/components/AdSlot';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Star, Bell, ExternalLink, BarChart3, Globe, Users, Zap, DollarSign, Activity, Clock } from 'lucide-react';
import cryptoImage1 from '@assets/stock_images/cryptocurrency_bitco_501fe450.jpg';
import cryptoImage2 from '@assets/stock_images/cryptocurrency_bitco_a2d83bee.jpg';
import cryptoImage3 from '@assets/stock_images/cryptocurrency_bitco_0dc72002.jpg';

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
  website: string;
  whitepaper: string;
  github: string;
  twitter: string;
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

export default function CoinDetailPage() {
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [activeTimeframe, setActiveTimeframe] = useState('30D');
  
  // todo: remove mock functionality - replace with real Bitcoin data
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
    description: 'Bitcoin is the first successful internet money based on peer-to-peer technology; whereby no central bank or authority is involved in the transaction and production of the Bitcoin currency. It was created by an anonymous individual/group under the name, Satoshi Nakamoto. The source code is available publicly as an open source project, anybody can look at it and be part of the developmental process. Bitcoin is changing the way we see money as we speak. The idea was to produce a means of exchange, independent of any central authority, that could be transferred electronically in a secure, verifiable and immutable way. Bitcoin has proven to be a store of value and hedge against inflation for many investors.',
    website: 'https://bitcoin.org',
    whitepaper: 'https://bitcoin.org/bitcoin.pdf',
    github: 'https://github.com/bitcoin/bitcoin',
    twitter: 'https://twitter.com/bitcoin'
  });

  // todo: remove mock functionality - replace with real related articles
  const relatedArticles: Article[] = [
    {
      id: '23',
      title: 'Bitcoin Network Hash Rate Reaches New All-Time High',
      excerpt: 'Network security strengthens as mining participation hits record levels, indicating strong confidence in Bitcoin\'s future.',
      image: cryptoImage1,
      category: 'Bitcoin',
      author: 'Alex Chen',
      publishedAt: '3 hours ago',
      readTime: '4 min read'
    },
    {
      id: '24',
      title: 'Major Institution Adds Bitcoin to Treasury Reserve',
      excerpt: 'Fortune 500 company allocates 5% of cash reserves to Bitcoin, citing inflation hedge and store of value properties.',
      image: cryptoImage2,
      category: 'Bitcoin',
      author: 'Sarah Kim',
      publishedAt: '8 hours ago',
      readTime: '3 min read'
    },
    {
      id: '25',
      title: 'Bitcoin Lightning Network Adoption Accelerates',
      excerpt: 'Layer 2 scaling solution sees unprecedented growth in merchant adoption and transaction volume.',
      image: cryptoImage3,
      category: 'Bitcoin',
      author: 'Emma Rodriguez',
      publishedAt: '1 day ago',
      readTime: '6 min read'
    }
  ];

  const marketDetails = [
    { label: 'Market Cap Rank', value: `#${coinData.rank}` },
    { label: 'Market Cap', value: `$${(coinData.marketCap / 1e9).toFixed(2)}B` },
    { label: '24h Volume', value: `$${(coinData.volume24h / 1e9).toFixed(2)}B` },
    { label: 'Circulating Supply', value: `${coinData.circulatingSupply.toLocaleString()} ${coinData.symbol}` },
    { label: 'Total Supply', value: `${coinData.totalSupply.toLocaleString()} ${coinData.symbol}` },
    { label: 'All-Time High', value: '$69,044.77' },
    { label: 'All-Time Low', value: '$67.81' },
    { label: '7d Change', value: '+12.34%', positive: true },
    { label: '30d Change', value: '+8.91%', positive: true },
    { label: '1y Change', value: '+145.67%', positive: true }
  ];

  const keyMetrics = [
    { icon: <DollarSign className="h-5 w-5" />, label: 'Market Cap', value: '$846.2B', change: '+2.3%', positive: true },
    { icon: <Activity className="h-5 w-5" />, label: '24h Volume', value: '$15.6B', change: '+5.7%', positive: true },
    { icon: <Users className="h-5 w-5" />, label: 'Active Addresses', value: '1.2M', change: '+1.8%', positive: true },
    { icon: <Zap className="h-5 w-5" />, label: 'Hash Rate', value: '450 EH/s', change: '+3.2%', positive: true }
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

  return (
    <div className="min-h-screen bg-background" data-testid="page-coin-detail">
      <PriceTicker />
      <Navbar />
      
      {/* Coin Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-black font-bold text-3xl">
                {coinData.logo}
              </div>
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-4xl font-bold text-card-foreground" data-testid="text-coin-name">
                    {coinData.name}
                  </h1>
                  <Badge variant="secondary" className="text-lg px-3 py-1" data-testid="badge-symbol">
                    {coinData.symbol}
                  </Badge>
                  <Badge variant="outline" className="text-muted-foreground" data-testid="badge-rank">
                    Rank #{coinData.rank}
                  </Badge>
                </div>
                <div className="flex items-center space-x-6">
                  <span className="text-4xl font-bold text-card-foreground" data-testid="text-price">
                    ${coinData.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <Badge 
                    variant={coinData.change24h >= 0 ? 'default' : 'destructive'}
                    className={`${coinData.change24h >= 0 ? 'bg-primary text-black' : 'bg-destructive text-white'} text-xl px-4 py-2`}
                    data-testid="badge-change"
                  >
                    {coinData.change24h >= 0 ? (
                      <TrendingUp className="h-5 w-5 mr-2" />
                    ) : (
                      <TrendingDown className="h-5 w-5 mr-2" />
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
              <Button variant="outline" data-testid="button-price-alert">
                <Bell className="h-4 w-4 mr-2" />
                Set Alert
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="bg-background py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyMetrics.map((metric, index) => (
              <Card key={metric.label} className="p-4 hover-elevate">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-muted-foreground">{metric.icon}</div>
                  <Badge 
                    variant={metric.positive ? 'default' : 'destructive'}
                    className={`text-xs ${metric.positive ? 'bg-primary text-black' : 'bg-destructive text-white'}`}
                  >
                    {metric.change}
                  </Badge>
                </div>
                <div className="text-xl font-bold text-card-foreground mb-1">{metric.value}</div>
                <div className="text-sm text-muted-foreground">{metric.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Chart and Overview */}
          <div className="lg:col-span-3 space-y-8">
            {/* Price Chart */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-card-foreground" data-testid="text-chart-title">
                  {coinData.name} Price Chart
                </h2>
                <div className="flex items-center space-x-2">
                  {['1D', '7D', '30D', '1Y', 'ALL'].map((timeframe) => (
                    <Button 
                      key={timeframe}
                      variant={activeTimeframe === timeframe ? 'default' : 'outline'} 
                      size="sm"
                      onClick={() => setActiveTimeframe(timeframe)}
                      className={activeTimeframe === timeframe ? 'bg-primary text-black' : ''}
                      data-testid={`button-chart-${timeframe.toLowerCase()}`}
                    >
                      {timeframe}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="h-96 bg-muted rounded-lg flex items-center justify-center border-dashed border-2 border-muted-foreground/30">
                <div className="text-center text-muted-foreground">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4" />
                  <div className="text-xl font-medium mb-2" data-testid="text-chart-placeholder">
                    Interactive {coinData.name} Price Chart
                  </div>
                  <div className="text-sm mb-2">
                    TradingView integration placeholder
                  </div>
                  <div className="text-xs">
                    Timeframe: {activeTimeframe} • Price: ${coinData.price.toLocaleString()}
                  </div>
                </div>
              </div>
            </Card>
            
            {/* About Section */}
            <Card className="p-6">
              <h3 className="text-2xl font-semibold text-card-foreground mb-6" data-testid="text-about-title">
                About {coinData.name}
              </h3>
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed text-base" data-testid="text-description">
                  {coinData.description}
                </p>
              </div>
              
              {/* Links */}
              <div className="mt-8 flex flex-wrap gap-4">
                <Button variant="outline" size="sm" data-testid="button-website">
                  <Globe className="h-4 w-4 mr-2" />
                  Official Website
                  <ExternalLink className="h-3 w-3 ml-2" />
                </Button>
                <Button variant="outline" size="sm" data-testid="button-whitepaper">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Whitepaper
                </Button>
                <Button variant="outline" size="sm" data-testid="button-github">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" data-testid="button-twitter">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Twitter
                </Button>
              </div>
            </Card>
            
            {/* Related News */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground" data-testid="text-related-news-title">
                  {coinData.name} News & Analysis
                </h2>
                <Badge variant="secondary">
                  <Clock className="h-3 w-3 mr-1" />
                  Latest Updates
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedArticles.map((article) => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </div>
          
          {/* Market Details Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Market Details Widget */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-6" data-testid="text-market-details">
                Market Details
              </h3>
              <div className="space-y-4">
                {marketDetails.map((detail, index) => (
                  <div key={detail.label} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{detail.label}</span>
                    <span 
                      className={`text-sm font-medium ${
                        detail.positive !== undefined 
                          ? detail.positive 
                            ? 'text-primary' 
                            : 'text-destructive'
                          : 'text-card-foreground'
                      }`}
                      data-testid={`text-detail-${index}`}
                    >
                      {detail.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
            
            {/* Ad Slot */}
            <AdSlot size="square" position="coin-sidebar" />
            
            {/* Price Alerts */}
            <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
              <h3 className="text-lg font-semibold text-card-foreground mb-4" data-testid="text-price-alerts">
                Price Alerts
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Get notified when {coinData.name} reaches your target price.
              </p>
              <Button 
                className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-semibold"
                data-testid="button-create-alert"
              >
                <Bell className="h-4 w-4 mr-2" />
                Create Alert
              </Button>
            </Card>
            
            {/* More Ad Slots */}
            <AdSlot size="square" position="coin-sidebar-2" />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
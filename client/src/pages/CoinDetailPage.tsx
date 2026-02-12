import { useState, useEffect } from 'react';
import { useParams } from 'wouter';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import ArticleCard from '@/components/ArticleCard';
import Footer from '@/components/Footer';
import TradingViewChart from '@/components/TradingViewChart';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Star, Bell, ExternalLink, BarChart3, Globe, Users, Zap, DollarSign, Activity, Clock } from 'lucide-react';
import { getCoinDetail, type CoinDetail } from '@/lib/coingecko';
import cryptoImage1 from '@assets/stock_images/cryptocurrency_bitco_501fe450.jpg';
import cryptoImage2 from '@assets/stock_images/cryptocurrency_bitco_a2d83bee.jpg';
import cryptoImage3 from '@assets/stock_images/cryptocurrency_bitco_0dc72002.jpg';

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
  const params = useParams();
  const coinId = params.id || 'bitcoin';

  const [coinData, setCoinData] = useState<CoinDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  useEffect(() => {
    const fetchCoinData = async () => {
      setLoading(true);
      try {
        const data = await getCoinDetail(coinId);
        setCoinData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coin data:', error);
        setLoading(false);
      }
    };

    fetchCoinData();
    const interval = setInterval(fetchCoinData, 120000);

    return () => clearInterval(interval);
  }, [coinId]);

  const relatedArticles: Article[] = [
    {
      id: '23',
      title: `${coinData?.name || 'Crypto'} Network Hash Rate Reaches New All-Time High`,
      excerpt: 'Network security strengthens as mining participation hits record levels, indicating strong confidence in the future.',
      image: cryptoImage1,
      category: coinData?.name || 'Crypto',
      author: 'Alex Chen',
      publishedAt: '3 hours ago',
      readTime: '4 min read'
    },
    {
      id: '24',
      title: `Major Institution Adds ${coinData?.name || 'Crypto'} to Treasury Reserve`,
      excerpt: 'Fortune 500 company allocates 5% of cash reserves, citing inflation hedge and store of value properties.',
      image: cryptoImage2,
      category: coinData?.name || 'Crypto',
      author: 'Sarah Kim',
      publishedAt: '8 hours ago',
      readTime: '3 min read'
    },
    {
      id: '25',
      title: `${coinData?.name || 'Crypto'} Adoption Accelerates Globally`,
      excerpt: 'Growing acceptance and usage patterns indicate unprecedented growth and market penetration.',
      image: cryptoImage3,
      category: coinData?.name || 'Crypto',
      author: 'Emma Rodriguez',
      publishedAt: '1 day ago',
      readTime: '6 min read'
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-coin-detail">
        <PriceTicker />
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-4">Loading cryptocurrency data...</div>
            <div className="text-muted-foreground">This may take a moment due to API caching</div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!coinData) {
    return (
      <div className="min-h-screen bg-background" data-testid="page-coin-detail">
        <PriceTicker />
        <Navbar />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground mb-4">Unable to load data</div>
            <div className="text-muted-foreground mb-6">The API may be temporarily rate limited. Please try again in a moment.</div>
            <Button variant="outline" onClick={() => window.location.reload()} data-testid="button-retry">
              Retry
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const marketDetails = [
    { label: 'Market Cap Rank', value: `#${coinData.market_cap_rank || '-'}` },
    { label: 'Market Cap', value: `$${(coinData.market_data.market_cap.usd / 1e9).toFixed(2)}B` },
    { label: '24h Volume', value: `$${(coinData.market_data.total_volume.usd / 1e9).toFixed(2)}B` },
    { label: 'Circulating Supply', value: `${coinData.market_data.circulating_supply.toLocaleString()} ${coinData.symbol.toUpperCase()}` },
    { label: 'Total Supply', value: coinData.market_data.total_supply ? `${coinData.market_data.total_supply.toLocaleString()} ${coinData.symbol.toUpperCase()}` : 'N/A' },
    { label: 'Max Supply', value: coinData.market_data.max_supply ? `${coinData.market_data.max_supply.toLocaleString()} ${coinData.symbol.toUpperCase()}` : 'Unlimited' },
    { label: '24h High', value: `$${coinData.market_data.high_24h.usd.toLocaleString()}` },
    { label: '24h Low', value: `$${coinData.market_data.low_24h.usd.toLocaleString()}` },
    { label: 'All-Time High', value: `$${coinData.market_data.ath.usd.toLocaleString()}` },
    { label: 'All-Time Low', value: `$${coinData.market_data.atl.usd.toLocaleString()}` },
    { label: '7d Change', value: `${coinData.market_data.price_change_percentage_7d >= 0 ? '+' : ''}${coinData.market_data.price_change_percentage_7d?.toFixed(2) || '0.00'}%`, positive: (coinData.market_data.price_change_percentage_7d || 0) >= 0 },
    { label: '30d Change', value: `${coinData.market_data.price_change_percentage_30d >= 0 ? '+' : ''}${coinData.market_data.price_change_percentage_30d?.toFixed(2) || '0.00'}%`, positive: (coinData.market_data.price_change_percentage_30d || 0) >= 0 },
    { label: '1y Change', value: `${coinData.market_data.price_change_percentage_1y >= 0 ? '+' : ''}${coinData.market_data.price_change_percentage_1y?.toFixed(2) || '0.00'}%`, positive: (coinData.market_data.price_change_percentage_1y || 0) >= 0 }
  ];

  const keyMetrics = [
    { icon: <DollarSign className="h-5 w-5" />, label: 'Market Cap', value: `$${(coinData.market_data.market_cap.usd / 1e9).toFixed(2)}B`, change: `${coinData.market_data.price_change_percentage_24h >= 0 ? '+' : ''}${coinData.market_data.price_change_percentage_24h?.toFixed(2) || '0.00'}%`, positive: (coinData.market_data.price_change_percentage_24h || 0) >= 0 },
    { icon: <Activity className="h-5 w-5" />, label: '24h Volume', value: `$${(coinData.market_data.total_volume.usd / 1e9).toFixed(2)}B`, change: '+5.7%', positive: true },
    { icon: <Users className="h-5 w-5" />, label: 'Circulating Supply', value: `${(coinData.market_data.circulating_supply / 1e6).toFixed(2)}M`, change: '+0.1%', positive: true },
    { icon: <Zap className="h-5 w-5" />, label: '24h Change', value: `${Math.abs(coinData.market_data.price_change_percentage_24h).toFixed(2)}%`, change: coinData.market_data.price_change_percentage_24h >= 0 ? 'Up' : 'Down', positive: coinData.market_data.price_change_percentage_24h >= 0 }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-coin-detail">
      <PriceTicker />
      <Navbar />

      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center space-x-6">
              {coinData.image?.large && (
                <img src={coinData.image.large} alt={coinData.name} className="w-20 h-20 rounded-full" />
              )}
              <div>
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-4xl font-bold text-card-foreground" data-testid="text-coin-name">
                    {coinData.name}
                  </h1>
                  <Badge variant="secondary" className="text-lg px-3 py-1" data-testid="badge-symbol">
                    {coinData.symbol.toUpperCase()}
                  </Badge>
                  {coinData.market_cap_rank && (
                    <Badge variant="outline" className="text-muted-foreground" data-testid="badge-rank">
                      Rank #{coinData.market_cap_rank}
                    </Badge>
                  )}
                </div>
                <div className="flex items-center space-x-6">
                  <span className="text-4xl font-bold text-card-foreground" data-testid="text-price">
                    ${coinData.market_data.current_price.usd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <Badge
                    variant={coinData.market_data.price_change_percentage_24h >= 0 ? 'default' : 'destructive'}
                    className={`${coinData.market_data.price_change_percentage_24h >= 0 ? 'bg-primary text-black' : 'bg-destructive text-white'} text-xl px-4 py-2`}
                    data-testid="badge-change"
                  >
                    {coinData.market_data.price_change_percentage_24h >= 0 ? (
                      <TrendingUp className="h-5 w-5 mr-2" />
                    ) : (
                      <TrendingDown className="h-5 w-5 mr-2" />
                    )}
                    {Math.abs(coinData.market_data.price_change_percentage_24h).toFixed(2)}%
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

      <div className="bg-background py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyMetrics.map((metric, index) => (
              <Card key={metric.label} className="p-4">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-8">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-card-foreground" data-testid="text-chart-title">
                  {coinData.name} Price Chart
                </h2>
              </div>
              <div className="h-[600px]">
                <TradingViewChart symbol={coinData.symbol} coinName={coinData.name} />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-2xl font-semibold text-card-foreground mb-6" data-testid="text-about-title">
                About {coinData.name}
              </h3>
              <div className="prose prose-lg prose-invert max-w-none">
                <div
                  className="text-muted-foreground leading-relaxed text-base"
                  data-testid="text-description"
                  dangerouslySetInnerHTML={{ __html: coinData.description.en || 'No description available.' }}
                />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {coinData.links?.homepage?.[0] && (
                  <Button variant="outline" size="sm" asChild data-testid="button-website">
                    <a href={coinData.links.homepage[0]} target="_blank" rel="noopener noreferrer">
                      <Globe className="h-4 w-4 mr-2" />
                      Official Website
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                )}
                {coinData.links?.whitepaper && (
                  <Button variant="outline" size="sm" asChild data-testid="button-whitepaper">
                    <a href={coinData.links.whitepaper} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Whitepaper
                    </a>
                  </Button>
                )}
                {coinData.links?.blockchain_site?.[0] && (
                  <Button variant="outline" size="sm" asChild data-testid="button-explorer">
                    <a href={coinData.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Block Explorer
                    </a>
                  </Button>
                )}
              </div>
            </Card>

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

          <div className="lg:col-span-1 space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-card-foreground mb-6" data-testid="text-market-details">
                Market Details
              </h3>
              <div className="space-y-4">
                {marketDetails.map((detail, index) => (
                  <div key={detail.label} className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">{detail.label}</span>
                    <span
                      className={`text-sm font-medium ${detail.positive !== undefined
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


          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, Bitcoin, Coins, Zap, Palette, Globe, Shield, BarChart3, Flame, AlertCircle, Clock } from 'lucide-react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

interface CategoryData {
  name: string;
  icon: React.ReactNode;
  count: number;
  trending?: boolean;
}

interface CoinGeckoTrendingCoin {
  item: {
    id: string;
    coin_id: number;
    name: string;
    symbol: string;
    market_cap_rank: number;
    thumb: string;
    small: string;
    large: string;
    slug: string;
    price_btc: number;
    score: number;
    data: {
      price: string;
      price_change_percentage_24h: {
        usd: number;
      };
    };
  };
}

interface TrendingResponse {
  coins: CoinGeckoTrendingCoin[];
}

export default function Sidebar() {
  // Fetch live trending coins
  const { data: trendingData, isLoading, isError } = useQuery<TrendingResponse>({
    queryKey: ['/api/crypto/trending'],
    refetchInterval: 60000, // Refresh every minute
  });

  // todo: remove mock functionality - replace with real category data
  const categories: CategoryData[] = [
    { name: 'Bitcoin', icon: <Bitcoin className="h-4 w-4" />, count: 45, trending: true },
    { name: 'Ethereum', icon: <Coins className="h-4 w-4" />, count: 38 },
    { name: 'Altcoins', icon: <Zap className="h-4 w-4" />, count: 52 },
    { name: 'DeFi', icon: <BarChart3 className="h-4 w-4" />, count: 29, trending: true },
    { name: 'NFTs', icon: <Palette className="h-4 w-4" />, count: 24 },
    { name: 'Web3', icon: <Globe className="h-4 w-4" />, count: 31 },
    { name: 'Regulations', icon: <Shield className="h-4 w-4" />, count: 18 },
    { name: 'Markets', icon: <TrendingUp className="h-4 w-4" />, count: 67, trending: true }
  ];

  // Extract trending coins from API data with comprehensive defensive handling
  const trendingCoins = Array.isArray(trendingData?.coins)
    ? trendingData.coins
        .slice(0, 7)
        .filter(coin => coin?.item && coin.item.id && coin.item.symbol && coin.item.name) // Guard against null items and missing required fields
        .map((coin, index) => ({
          rank: index + 1,
          id: coin.item.id,
          name: coin.item.name,
          symbol: coin.item.symbol.toUpperCase(),
          change: coin.item.data?.price_change_percentage_24h?.usd ?? null,
          marketCapRank: coin.item.market_cap_rank || null,
        }))
    : [];

  return (
    <aside className="w-full lg:w-80 space-y-6" data-testid="sidebar">
      {/* Categories */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-card-foreground mb-4" data-testid="text-categories-title">
          Categories
        </h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <Link key={category.name} href={`/category/${category.name.toLowerCase()}`}>
              <div 
                className="flex items-center justify-between p-3 rounded-lg hover-elevate cursor-pointer group"
                data-testid={`link-category-${category.name.toLowerCase()}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    {category.icon}
                  </div>
                  <span className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </span>
                  {category.trending && (
                    <Badge 
                      variant="secondary" 
                      className="text-xs bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30"
                      data-testid={`badge-trending-${category.name.toLowerCase()}`}
                    >
                      Hot
                    </Badge>
                  )}
                </div>
                <span className="text-xs text-muted-foreground" data-testid={`text-count-${category.name.toLowerCase()}`}>
                  {category.count}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Card>

      {/* Trending Now - Hot Cryptocurrencies */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Flame className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-card-foreground" data-testid="text-trending-title">
              Hot Cryptocurrencies
            </h3>
          </div>
          {!isLoading && !isError && (
            <Badge variant="secondary" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Live
            </Badge>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto space-y-3 pr-2" data-testid="container-trending-list">
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between p-3 space-x-3">
                <Skeleton className="h-6 w-8" />
                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-4 w-12" />
              </div>
            ))
          ) : isError ? (
            <div className="text-center py-8" data-testid="error-trending">
              <AlertCircle className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground mb-2">
                Unable to load trending coins
              </p>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => queryClient.invalidateQueries({ queryKey: ['/api/crypto/trending'] })}
                data-testid="button-retry-trending"
              >
                Retry
              </Button>
            </div>
          ) : trendingCoins.length > 0 ? (
            trendingCoins.map((coin) => (
              <Link key={coin.id} href={`/coin/${coin.id}`}>
                <div 
                  className="flex items-center justify-between p-3 rounded-lg hover-elevate cursor-pointer group"
                  data-testid={`link-trending-${coin.id}`}
                >
                  <div className="flex items-center space-x-3">
                    <Badge 
                      variant="secondary" 
                      className="text-xs w-8 h-6 flex items-center justify-center bg-gradient-to-r from-primary/20 to-accent/20 text-primary border-primary/30"
                    >
                      #{coin.rank}
                    </Badge>
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors truncate">
                        {coin.name}
                      </div>
                      <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                    </div>
                  </div>
                  <div className="flex flex-col items-end ml-2">
                    {coin.change !== null ? (
                      <div className={`text-sm font-medium ${
                        coin.change >= 0 ? 'text-primary' : 'text-destructive'
                      }`} data-testid={`text-change-${coin.id}`}>
                        {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(1)}%
                      </div>
                    ) : (
                      <div className="text-sm font-medium text-muted-foreground" data-testid={`text-change-${coin.id}`}>
                        N/A
                      </div>
                    )}
                    {coin.marketCapRank && (
                      <div className="text-xs text-muted-foreground">
                        Rank #{coin.marketCapRank}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-sm text-muted-foreground text-center py-4">
              No trending data available
            </div>
          )}
        </div>
      </Card>

      {/* Newsletter CTA */}
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
        <h3 className="text-lg font-semibold text-card-foreground mb-2" data-testid="text-newsletter-title">
          Never Miss an Update
        </h3>
        <p className="text-sm text-muted-foreground mb-4" data-testid="text-newsletter-description">
          Get the latest crypto news and market analysis delivered to your inbox.
        </p>
        <Button 
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-semibold"
          data-testid="button-sidebar-newsletter"
          onClick={() => console.log('Sidebar newsletter signup triggered')}
        >
          Subscribe Now
        </Button>
      </Card>
    </aside>
  );
}
import { useQuery } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BarChart3, TrendingUp, TrendingDown, Eye, ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';
import { Link } from 'wouter';

interface GlobalData {
  data: {
    total_market_cap: { usd: number };
    total_volume: { usd: number };
    market_cap_percentage: { btc: number };
    active_cryptocurrencies: number;
    market_cap_change_percentage_24h_usd: number;
  };
}

interface CoinData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
}

export default function MarketWidgets() {
  const { data: globalData, isLoading: globalLoading, isError: globalError, refetch: refetchGlobal } = useQuery<GlobalData>({
    queryKey: ['/api/crypto/global'],
    refetchInterval: 60000,
  });

  const { data: marketsData, isLoading: marketsLoading, isError: marketsError, refetch: refetchMarkets } = useQuery<CoinData[]>({
    queryKey: ['/api/crypto/coins/markets'],
    queryFn: async () => {
      const res = await fetch('/api/crypto/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h');
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
      return res.json();
    },
    refetchInterval: 60000,
  });

  const formatMarketCap = (value: number) => {
    if (value >= 1_000_000_000_000) {
      return `$${(value / 1_000_000_000_000).toFixed(2)}T`;
    } else if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(2)}B`;
    } else {
      return `$${(value / 1_000_000).toFixed(2)}M`;
    }
  };

  const globalStats = globalData?.data ? {
    totalMarketCap: formatMarketCap(globalData.data.total_market_cap.usd),
    totalVolume: formatMarketCap(globalData.data.total_volume.usd),
    btcDominance: `${globalData.data.market_cap_percentage.btc.toFixed(2)}%`,
    activeCoins: globalData.data.active_cryptocurrencies.toLocaleString(),
    marketChange: globalData.data.market_cap_change_percentage_24h_usd,
  } : null;

  const topGainers = marketsData
    ? [...marketsData]
      .filter((coin) => coin.price_change_percentage_24h > 0)
      .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
      .slice(0, 5)
    : [];

  const topLosers = marketsData
    ? [...marketsData]
      .filter((coin) => coin.price_change_percentage_24h < 0)
      .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
      .slice(0, 5)
    : [];

  if (globalLoading || marketsLoading) {
    return (
      <section data-testid="market-widgets-section">
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="flex items-center justify-center py-12">
            <div className="text-muted-foreground">Loading market data...</div>
          </div>
        </Card>
      </section>
    );
  }

  if (globalError || marketsError) {
    return (
      <section data-testid="market-widgets-section">
        <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <div className="flex flex-col items-center justify-center py-12 gap-3">
            <div className="text-muted-foreground">Failed to load market data</div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { refetchGlobal(); refetchMarkets(); }}
              data-testid="button-retry-markets"
            >
              Retry
            </Button>
          </div>
        </Card>
      </section>
    );
  }

  return (
    <section data-testid="market-widgets-section">
      {/* Global Market Stats */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20 mb-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-card-foreground">Global Market Stats</h2>
          <Badge variant="secondary" data-testid="badge-live-data">
            <BarChart3 className="h-3 w-3 mr-1" />
            Live Data
          </Badge>
        </div>
        {globalStats && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
              <div className="text-center" data-testid="stat-market-cap">
                <div className="text-2xl font-bold text-card-foreground mb-1">
                  {globalStats.totalMarketCap}
                </div>
                <div className="text-sm text-muted-foreground">Total Market Cap</div>
                {globalStats.marketChange && (
                  <div className={`text-xs mt-1 ${globalStats.marketChange >= 0 ? 'text-primary' : 'text-destructive'}`}>
                    {globalStats.marketChange >= 0 ? '+' : ''}{globalStats.marketChange.toFixed(2)}%
                  </div>
                )}
              </div>
              <div className="text-center" data-testid="stat-volume">
                <div className="text-2xl font-bold text-card-foreground mb-1">
                  {globalStats.totalVolume}
                </div>
                <div className="text-sm text-muted-foreground">24h Volume</div>
              </div>
              <div className="text-center" data-testid="stat-btc-dominance">
                <div className="text-2xl font-bold text-card-foreground mb-1">
                  {globalStats.btcDominance}
                </div>
                <div className="text-sm text-muted-foreground">BTC Dominance</div>
              </div>
              <div className="text-center" data-testid="stat-active-coins">
                <div className="text-2xl font-bold text-card-foreground mb-1">
                  {globalStats.activeCoins}
                </div>
                <div className="text-sm text-muted-foreground">Active Coins</div>
              </div>
            </div>
            <div className="text-center">
              <Link href="/markets">
                <Button
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-black font-semibold"
                  data-testid="button-view-markets"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  View Full Markets
                </Button>
              </Link>
            </div>
          </>
        )}
      </Card>

      {/* Top Movers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Gainers */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-card-foreground flex items-center">
              <ArrowUpCircle className="h-5 w-5 mr-2 text-primary" />
              Top Gainers
            </h3>
            <Badge className="bg-primary text-black" data-testid="badge-gainers">
              <TrendingUp className="h-3 w-3 mr-1" />
              24h
            </Badge>
          </div>
          <div className="space-y-3">
            {topGainers.map((coin, index) => (
              <Link key={coin.id} href={`/coin/${coin.id}`}>
                <div
                  className="flex items-center justify-between p-3 rounded-md hover-elevate cursor-pointer"
                  data-testid={`gainer-${index + 1}`}
                >
                  <div className="flex items-center space-x-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="font-semibold text-card-foreground text-sm">
                        {coin.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {coin.symbol.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-card-foreground text-sm">
                      ${coin.current_price >= 1
                        ? coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : coin.current_price.toFixed(6)}
                    </div>
                    <Badge
                      variant="default"
                      className="bg-primary text-black text-xs"
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      +{coin.price_change_percentage_24h.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {/* Top Losers */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-card-foreground flex items-center">
              <ArrowDownCircle className="h-5 w-5 mr-2 text-destructive" />
              Top Losers
            </h3>
            <Badge variant="destructive" data-testid="badge-losers">
              <TrendingDown className="h-3 w-3 mr-1" />
              24h
            </Badge>
          </div>
          <div className="space-y-3">
            {topLosers.map((coin, index) => (
              <Link key={coin.id} href={`/coin/${coin.id}`}>
                <div
                  className="flex items-center justify-between p-3 rounded-md hover-elevate cursor-pointer"
                  data-testid={`loser-${index + 1}`}
                >
                  <div className="flex items-center space-x-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <div className="font-semibold text-card-foreground text-sm">
                        {coin.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {coin.symbol.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-card-foreground text-sm">
                      ${coin.current_price >= 1
                        ? coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                        : coin.current_price.toFixed(6)}
                    </div>
                    <Badge
                      variant="destructive"
                      className="bg-destructive text-white text-xs"
                    >
                      <TrendingDown className="h-3 w-3 mr-1" />
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </Badge>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </div>
    </section>
  );
}

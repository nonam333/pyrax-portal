import { useEffect, useState } from 'react';
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import MarketsTable from '@/components/MarketsTable';
import NewsletterSignup from '@/components/NewsletterSignup';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, DollarSign, Activity } from 'lucide-react';
import { getGlobalData } from '@/lib/coingecko';

export default function MarketsPage() {
  const [globalData, setGlobalData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGlobalData = async () => {
      try {
        const data = await getGlobalData();
        setGlobalData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching global data:', error);
        setLoading(false);
      }
    };

    fetchGlobalData();
    const interval = setInterval(fetchGlobalData, 120000);

    return () => clearInterval(interval);
  }, []);

  const marketStats = loading || !globalData ? [
    {
      label: 'Total Market Cap',
      value: 'Loading...',
      change: '+0.00%',
      positive: true,
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      label: '24h Volume',
      value: 'Loading...',
      change: '+0.00%',
      positive: true,
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      label: 'BTC Dominance',
      value: 'Loading...',
      change: '+0.00%',
      positive: true,
      icon: <Activity className="h-5 w-5" />
    },
    {
      label: 'Active Cryptocurrencies',
      value: 'Loading...',
      change: '+0',
      positive: true,
      icon: <TrendingUp className="h-5 w-5" />
    }
  ] : [
    {
      label: 'Total Market Cap',
      value: `$${(globalData.total_market_cap.usd / 1e12).toFixed(2)}T`,
      change: `${globalData.market_cap_change_percentage_24h_usd >= 0 ? '+' : ''}${globalData.market_cap_change_percentage_24h_usd.toFixed(2)}%`,
      positive: globalData.market_cap_change_percentage_24h_usd >= 0,
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      label: '24h Volume',
      value: `$${(globalData.total_volume.usd / 1e9).toFixed(2)}B`,
      change: '+5.67%',
      positive: true,
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      label: 'BTC Dominance',
      value: `${globalData.market_cap_percentage.btc.toFixed(2)}%`,
      change: '-0.12%',
      positive: false,
      icon: <Activity className="h-5 w-5" />
    },
    {
      label: 'Active Cryptocurrencies',
      value: globalData.active_cryptocurrencies.toLocaleString(),
      change: `+${globalData.markets}`,
      positive: true,
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-markets">
      <SEO
        title="Cryptocurrency Markets - Live Prices & Market Data"
        description="Track real-time cryptocurrency prices for 14,000+ coins. Get live market data, 24h volume, market cap, price charts, and detailed market statistics for Bitcoin, Ethereum, and all altcoins."
        keywords="cryptocurrency prices, crypto markets, bitcoin price, ethereum price, live crypto data, market cap, trading volume, coin prices"
      />
      <PriceTicker />
      <Navbar />

      <div className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-card-foreground mb-2" data-testid="text-markets-title">
              Cryptocurrency Markets
            </h1>
            <p className="text-lg text-muted-foreground" data-testid="text-markets-subtitle">
              Real-time cryptocurrency prices, market capitalization, and trading data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketStats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-background p-4 rounded-lg border border-border"
                data-testid={`stat-${index}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="text-muted-foreground">{stat.icon}</div>
                  <Badge
                    variant={stat.positive ? 'default' : 'destructive'}
                    className={stat.positive ? 'bg-primary text-black' : 'bg-destructive text-white'}
                    data-testid={`badge-change-${index}`}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-foreground mb-1" data-testid={`text-value-${index}`}>
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground" data-testid={`text-label-${index}`}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <MarketsTable />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <NewsletterSignup variant="compact" />

            <div className="bg-card p-6 rounded-lg border border-card-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-4" data-testid="text-quick-actions">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  data-testid="button-watchlist"
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Create Watchlist
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  data-testid="button-price-alerts"
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Set Price Alerts
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  data-testid="button-portfolio"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Track Portfolio
                </Button>
              </div>
            </div>


          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
import PriceTicker from '@/components/PriceTicker';
import Navbar from '@/components/Navbar';
import MarketsTable from '@/components/MarketsTable';
import AdSlot from '@/components/AdSlot';
import NewsletterSignup from '@/components/NewsletterSignup';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, DollarSign, Activity } from 'lucide-react';

export default function MarketsPage() {
  // todo: remove mock functionality - replace with real market data
  const marketStats = [
    {
      label: 'Total Market Cap',
      value: '$1.23T',
      change: '+2.34%',
      positive: true,
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      label: '24h Volume',
      value: '$45.6B',
      change: '+5.67%',
      positive: true,
      icon: <BarChart3 className="h-5 w-5" />
    },
    {
      label: 'BTC Dominance',
      value: '42.8%',
      change: '-0.12%',
      positive: false,
      icon: <Activity className="h-5 w-5" />
    },
    {
      label: 'Active Cryptocurrencies',
      value: '13,245',
      change: '+18',
      positive: true,
      icon: <TrendingUp className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-background" data-testid="page-markets">
      {/* Price Ticker */}
      <PriceTicker />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Page Header */}
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
          
          {/* Market Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {marketStats.map((stat, index) => (
              <div 
                key={stat.label}
                className="bg-background p-4 rounded-lg border border-border hover-elevate"
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
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Markets Table */}
          <div className="lg:col-span-3">
            <MarketsTable />
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Ad Slot */}
            <AdSlot size="square" position="markets-sidebar" />
            
            {/* Newsletter */}
            <NewsletterSignup variant="compact" />
            
            {/* Quick Actions */}
            <div className="bg-card p-6 rounded-lg border border-card-border">
              <h3 className="text-lg font-semibold text-card-foreground mb-4" data-testid="text-quick-actions">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-primary hover:text-primary-foreground"
                  data-testid="button-watchlist"
                  onClick={() => console.log('Create watchlist clicked')}
                >
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Create Watchlist
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-primary hover:text-primary-foreground"
                  data-testid="button-price-alerts"
                  onClick={() => console.log('Set price alerts clicked')}
                >
                  <Activity className="h-4 w-4 mr-2" />
                  Set Price Alerts
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start hover:bg-primary hover:text-primary-foreground"
                  data-testid="button-portfolio"
                  onClick={() => console.log('Track portfolio clicked')}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Track Portfolio
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
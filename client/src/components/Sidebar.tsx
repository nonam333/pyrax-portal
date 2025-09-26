import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { TrendingUp, Bitcoin, Coins, Zap, Palette, Globe, Shield, BarChart3 } from 'lucide-react';
import { Link } from 'wouter';

interface CategoryData {
  name: string;
  icon: React.ReactNode;
  count: number;
  trending?: boolean;
}

interface TrendingItem {
  rank: number;
  name: string;
  symbol: string;
  change: number;
}

export default function Sidebar() {
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

  // todo: remove mock functionality - replace with real trending data
  const trendingCoins: TrendingItem[] = [
    { rank: 1, name: 'Bitcoin', symbol: 'BTC', change: 5.2 },
    { rank: 2, name: 'Ethereum', symbol: 'ETH', change: -2.1 },
    { rank: 3, name: 'Solana', symbol: 'SOL', change: 8.7 },
    { rank: 4, name: 'Cardano', symbol: 'ADA', change: 3.4 },
    { rank: 5, name: 'Polygon', symbol: 'MATIC', change: -1.8 }
  ];

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

      {/* Trending Now */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold text-card-foreground" data-testid="text-trending-title">
            Trending Now
          </h3>
        </div>
        <div className="space-y-3">
          {trendingCoins.map((coin) => (
            <Link key={coin.symbol} href={`/coin/${coin.symbol.toLowerCase()}`}>
              <div 
                className="flex items-center justify-between p-3 rounded-lg hover-elevate cursor-pointer group"
                data-testid={`link-trending-${coin.symbol.toLowerCase()}`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-xs font-medium text-muted-foreground w-4">
                    #{coin.rank}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-card-foreground group-hover:text-primary transition-colors">
                      {coin.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                  </div>
                </div>
                <div className={`text-sm font-medium ${
                  coin.change >= 0 ? 'text-primary' : 'text-destructive'
                }`} data-testid={`text-change-${coin.symbol.toLowerCase()}`}>
                  {coin.change >= 0 ? '+' : ''}{coin.change.toFixed(1)}%
                </div>
              </div>
            </Link>
          ))}
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
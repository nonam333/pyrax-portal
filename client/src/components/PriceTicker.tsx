import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface CryptoPrice {
  symbol: string;
  price: number;
  change: number;
}

export default function PriceTicker() {
  const [prices, setPrices] = useState<CryptoPrice[]>([
    // todo: remove mock functionality - replace with real API data
    { symbol: 'BTC', price: 43250.50, change: 2.34 },
    { symbol: 'ETH', price: 2650.25, change: -1.25 },
    { symbol: 'BNB', price: 310.75, change: 0.85 },
    { symbol: 'ADA', price: 0.485, change: 3.42 },
    { symbol: 'SOL', price: 105.80, change: -0.75 },
    { symbol: 'XRP', price: 0.62, change: 1.95 },
    { symbol: 'DOT', price: 7.35, change: -2.10 },
    { symbol: 'AVAX', price: 25.40, change: 4.15 }
  ]);

  useEffect(() => {
    // todo: remove mock functionality - implement real price updates
    const interval = setInterval(() => {
      setPrices(prev => prev.map(coin => ({
        ...coin,
        price: coin.price + (Math.random() - 0.5) * coin.price * 0.001,
        change: coin.change + (Math.random() - 0.5) * 0.5
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-black border-b border-border overflow-hidden py-2" data-testid="price-ticker">
      <div className="relative">
        <div className="flex animate-pulse">
          <div className="flex space-x-8 animate-[scroll_60s_linear_infinite] whitespace-nowrap">
            {[...prices, ...prices, ...prices].map((coin, index) => (
              <div 
                key={`${coin.symbol}-${index}`}
                className="flex items-center space-x-2 text-sm font-medium"
                data-testid={`ticker-${coin.symbol.toLowerCase()}-${index}`}
              >
                <span className="text-white">{coin.symbol}</span>
                <span className="text-white">${coin.price.toFixed(2)}</span>
                <div className={`flex items-center space-x-1 ${
                  coin.change >= 0 ? 'text-primary' : 'text-destructive'
                }`}>
                  {coin.change >= 0 ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  <span>{Math.abs(coin.change).toFixed(2)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { getTickerCoins, type CoinPrice } from '@/lib/coingecko';

interface TickerCoin {
  symbol: string;
  price: number;
  change: number;
}

export default function PriceTicker() {
  const [prices, setPrices] = useState<TickerCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          const coins = await getTickerCoins(15);
          const formattedPrices = coins.map(coin => ({
            symbol: coin.symbol.toUpperCase(),
            price: coin.current_price,
            change: coin.price_change_percentage_24h
          }));
          setPrices(formattedPrices);
          setLoading(false);
          setError(false);
          return;
        } catch (err) {
          if (attempt < 2) {
            await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
          }
        }
      }
      setLoading(false);
      setError(true);
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);

    return () => clearInterval(interval);
  }, []);

  if (error && prices.length === 0) {
    return (
      <div className="bg-black border-b border-border overflow-hidden py-2" data-testid="price-ticker">
        <div className="text-center text-muted-foreground text-sm">Prices unavailable — retrying shortly</div>
      </div>
    );
  }

  if (loading || prices.length === 0) {
    return (
      <div className="bg-black border-b border-border overflow-hidden py-2" data-testid="price-ticker">
        <div className="text-center text-white text-sm">Loading live prices...</div>
      </div>
    );
  }

  return (
    <div className="bg-black border-b border-border overflow-hidden py-2" data-testid="price-ticker">
      <div className="relative">
        <div className="flex">
          <div className="flex space-x-8 animate-[scroll_60s_linear_infinite] whitespace-nowrap">
            {[...prices, ...prices, ...prices].map((coin, index) => (
              <div
                key={`${coin.symbol}-${index}`}
                className="flex items-center space-x-2 text-sm font-medium"
                data-testid={`ticker-${coin.symbol.toLowerCase()}-${index}`}
              >
                <span className="text-white">{coin.symbol}</span>
                <span className="text-white">
                  ${coin.price >= 1
                    ? coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                    : coin.price.toFixed(6)}
                </span>
                <div className={`flex items-center space-x-1 ${coin.change >= 0 ? 'text-primary' : 'text-destructive'
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
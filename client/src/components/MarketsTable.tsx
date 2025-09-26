import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, TrendingUp, TrendingDown, ChevronUp, ChevronDown } from 'lucide-react';
import { Link } from 'wouter';

interface CryptoData {
  id: string;
  name: string;
  symbol: string;
  logo: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  rank: number;
}

type SortField = 'rank' | 'name' | 'price' | 'change24h' | 'marketCap' | 'volume24h';
type SortDirection = 'asc' | 'desc';

export default function MarketsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // todo: remove mock functionality - replace with real crypto data
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: '₿',
      price: 43250.50,
      change24h: 2.34,
      marketCap: 846000000000,
      volume24h: 15600000000,
      circulatingSupply: 19580000,
      rank: 1
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      logo: 'Ξ',
      price: 2650.25,
      change24h: -1.25,
      marketCap: 318000000000,
      volume24h: 8900000000,
      circulatingSupply: 120000000,
      rank: 2
    },
    {
      id: 'binancecoin',
      name: 'BNB',
      symbol: 'BNB',
      logo: 'B',
      price: 310.75,
      change24h: 0.85,
      marketCap: 47500000000,
      volume24h: 890000000,
      circulatingSupply: 153000000,
      rank: 3
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      logo: 'S',
      price: 105.80,
      change24h: 4.15,
      marketCap: 45200000000,
      volume24h: 1200000000,
      circulatingSupply: 427000000,
      rank: 4
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      logo: 'A',
      price: 0.485,
      change24h: 3.42,
      marketCap: 17100000000,
      volume24h: 245000000,
      circulatingSupply: 35300000000,
      rank: 5
    }
  ]);

  useEffect(() => {
    // todo: remove mock functionality - implement real price updates
    const interval = setInterval(() => {
      setCryptoData(prev => prev.map(coin => ({
        ...coin,
        price: coin.price + (Math.random() - 0.5) * coin.price * 0.002,
        change24h: coin.change24h + (Math.random() - 0.5) * 0.5
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredAndSortedData = cryptoData
    .filter(coin => 
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField];
      const bValue = b[sortField];
      const multiplier = sortDirection === 'asc' ? 1 : -1;
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * multiplier;
      }
      return (Number(aValue) - Number(bValue)) * multiplier;
    });

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="h-4 w-4" /> : 
      <ChevronDown className="h-4 w-4" />;
  };

  return (
    <Card className="p-6" data-testid="markets-table">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-card-foreground" data-testid="text-markets-title">
          Cryptocurrency Prices
        </h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
              data-testid="input-search"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full" data-testid="table-crypto">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSort('rank')}
                  className="font-semibold text-muted-foreground hover:text-foreground"
                  data-testid="button-sort-rank"
                >
                  #
                  <SortIcon field="rank" />
                </Button>
              </th>
              <th className="text-left py-3 px-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSort('name')}
                  className="font-semibold text-muted-foreground hover:text-foreground"
                  data-testid="button-sort-name"
                >
                  Name
                  <SortIcon field="name" />
                </Button>
              </th>
              <th className="text-right py-3 px-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSort('price')}
                  className="font-semibold text-muted-foreground hover:text-foreground"
                  data-testid="button-sort-price"
                >
                  Price
                  <SortIcon field="price" />
                </Button>
              </th>
              <th className="text-right py-3 px-2">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSort('change24h')}
                  className="font-semibold text-muted-foreground hover:text-foreground"
                  data-testid="button-sort-change"
                >
                  24h %
                  <SortIcon field="change24h" />
                </Button>
              </th>
              <th className="text-right py-3 px-2 hidden md:table-cell">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSort('marketCap')}
                  className="font-semibold text-muted-foreground hover:text-foreground"
                  data-testid="button-sort-marketcap"
                >
                  Market Cap
                  <SortIcon field="marketCap" />
                </Button>
              </th>
              <th className="text-right py-3 px-2 hidden lg:table-cell">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleSort('volume24h')}
                  className="font-semibold text-muted-foreground hover:text-foreground"
                  data-testid="button-sort-volume"
                >
                  Volume (24h)
                  <SortIcon field="volume24h" />
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedData.map((coin) => (
              <tr 
                key={coin.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
                data-testid={`row-crypto-${coin.symbol.toLowerCase()}`}
              >
                <td className="py-4 px-2">
                  <span className="text-sm text-muted-foreground" data-testid={`text-rank-${coin.symbol.toLowerCase()}`}>
                    {coin.rank}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <Link href={`/coin/${coin.id}`}>
                    <div className="flex items-center space-x-3 hover:text-primary transition-colors cursor-pointer">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-black font-bold text-sm">
                        {coin.logo}
                      </div>
                      <div>
                        <div 
                          className="font-semibold text-card-foreground"
                          data-testid={`text-name-${coin.symbol.toLowerCase()}`}
                        >
                          {coin.name}
                        </div>
                        <div 
                          className="text-sm text-muted-foreground"
                          data-testid={`text-symbol-${coin.symbol.toLowerCase()}`}
                        >
                          {coin.symbol}
                        </div>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className="py-4 px-2 text-right">
                  <span 
                    className="font-semibold text-card-foreground"
                    data-testid={`text-price-${coin.symbol.toLowerCase()}`}
                  >
                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </td>
                <td className="py-4 px-2 text-right">
                  <Badge 
                    variant={coin.change24h >= 0 ? 'default' : 'destructive'}
                    className={`${coin.change24h >= 0 ? 'bg-primary text-black' : 'bg-destructive text-white'}`}
                    data-testid={`badge-change-${coin.symbol.toLowerCase()}`}
                  >
                    {coin.change24h >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(coin.change24h).toFixed(2)}%
                  </Badge>
                </td>
                <td className="py-4 px-2 text-right hidden md:table-cell">
                  <span 
                    className="text-card-foreground"
                    data-testid={`text-marketcap-${coin.symbol.toLowerCase()}`}
                  >
                    {formatNumber(coin.marketCap)}
                  </span>
                </td>
                <td className="py-4 px-2 text-right hidden lg:table-cell">
                  <span 
                    className="text-card-foreground"
                    data-testid={`text-volume-${coin.symbol.toLowerCase()}`}
                  >
                    {formatNumber(coin.volume24h)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
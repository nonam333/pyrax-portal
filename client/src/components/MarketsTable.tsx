import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Search, TrendingUp, TrendingDown, ChevronUp, ChevronDown,
  Filter, X, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Link } from 'wouter';
import { getTopCoins, type CoinPrice } from '@/lib/coingecko';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortField = 'market_cap_rank' | 'name' | 'current_price' | 'price_change_percentage_24h' | 'market_cap' | 'total_volume';
type SortDirection = 'asc' | 'desc';
type FilterCategory = 'all' | 'gainers' | 'losers' | 'high-volume';

export default function MarketsTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('market_cap_rank');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [coins, setCoins] = useState<CoinPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);

  const fetchCoins = async () => {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const data = await getTopCoins(100);
        const formattedData = data.map((coin: any) => ({
          ...coin,
          market_cap_rank: coin.market_cap_rank || 0
        }));
        setCoins(formattedData);
        setLoading(false);
        setError(false);
        return;
      } catch (err) {
        console.error(`Error fetching coins (attempt ${attempt + 1}/3):`, err);
        if (attempt < 2) {
          await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
        }
      }
    }
    setLoading(false);
    setError(true);
  };

  useEffect(() => {
    fetchCoins();
    const interval = setInterval(fetchCoins, 120000);

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

  const applyFilters = (data: CoinPrice[]) => {
    switch (filterCategory) {
      case 'gainers':
        return data.filter(coin => coin.price_change_percentage_24h > 0);
      case 'losers':
        return data.filter(coin => coin.price_change_percentage_24h < 0);
      case 'high-volume':
        return data.filter(coin => coin.total_volume > 1e9); // Over $1B volume
      default:
        return data;
    }
  };

  const filteredAndSortedData = applyFilters(coins)
    .filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aValue = a[sortField as keyof CoinPrice];
      const bValue = b[sortField as keyof CoinPrice];
      const multiplier = sortDirection === 'asc' ? 1 : -1;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return aValue.localeCompare(bValue) * multiplier;
      }
      return (Number(aValue) - Number(bValue)) * multiplier;
    });

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);
  const paginatedData = filteredAndSortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterCategory, itemsPerPage]);

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

  if (loading) {
    return (
      <Card className="p-6" data-testid="markets-table">
        <div className="text-center py-12">
          <div className="text-lg text-muted-foreground">Loading cryptocurrency data...</div>
        </div>
      </Card>
    );
  }

  if (error && coins.length === 0) {
    return (
      <Card className="p-6" data-testid="markets-table">
        <div className="text-center py-12 space-y-3">
          <div className="text-lg text-muted-foreground">Failed to load cryptocurrency data</div>
          <Button
            variant="outline"
            onClick={() => { setLoading(true); setError(false); fetchCoins(); }}
            data-testid="button-retry-markets-table"
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6" data-testid="markets-table">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-2xl font-bold text-card-foreground" data-testid="text-markets-title">
            Cryptocurrency Prices
          </h2>
          <div className="flex items-center gap-2">
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
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchTerm('')}
                data-testid="button-clear-search"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Filter:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {(['all', 'gainers', 'losers', 'high-volume'] as FilterCategory[]).map((category) => (
              <Button
                key={category}
                variant={filterCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilterCategory(category)}
                className={filterCategory === category ? 'bg-gradient-to-r from-primary to-accent text-black' : ''}
                data-testid={`button-filter-${category}`}
              >
                {category === 'all' && 'All Coins'}
                {category === 'gainers' && (
                  <>
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Top Gainers
                  </>
                )}
                {category === 'losers' && (
                  <>
                    <TrendingDown className="h-3 w-3 mr-1" />
                    Top Losers
                  </>
                )}
                {category === 'high-volume' && 'High Volume'}
              </Button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Show:</span>
            <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
              <SelectTrigger className="w-24" data-testid="select-items-per-page">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-muted-foreground">
          Showing {paginatedData.length} of {filteredAndSortedData.length} cryptocurrencies
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full" data-testid="table-crypto">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('market_cap_rank')}
                  className="font-semibold text-muted-foreground hover:text-foreground"
                  data-testid="button-sort-rank"
                >
                  #
                  <SortIcon field="market_cap_rank" />
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
                  onClick={() => handleSort('current_price')}
                  className="font-semibold text-muted-foreground hover:text-foreground"
                  data-testid="button-sort-price"
                >
                  Price
                  <SortIcon field="current_price" />
                </Button>
              </th>
              <th className="text-right py-3 px-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('price_change_percentage_24h')}
                  className="font-semibold text-muted-foreground hover:text-foreground"
                  data-testid="button-sort-change"
                >
                  24h %
                  <SortIcon field="price_change_percentage_24h" />
                </Button>
              </th>
              <th className="text-right py-3 px-2 hidden md:table-cell">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('market_cap')}
                  className="font-semibold text-muted-foreground hover:text-foreground"
                  data-testid="button-sort-marketcap"
                >
                  Market Cap
                  <SortIcon field="market_cap" />
                </Button>
              </th>
              <th className="text-right py-3 px-2 hidden lg:table-cell">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleSort('total_volume')}
                  className="font-semibold text-muted-foreground hover:text-foreground"
                  data-testid="button-sort-volume"
                >
                  Volume (24h)
                  <SortIcon field="total_volume" />
                </Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((coin, index) => (
              <tr
                key={coin.id}
                className="border-b border-border hover:bg-muted/50 transition-all duration-200"
                style={{
                  animation: `fadeIn 0.3s ease-in-out ${index * 0.02}s both`
                }}
                data-testid={`row-crypto-${coin.symbol.toLowerCase()}`}
              >
                <td className="py-4 px-2">
                  <span className="text-sm text-muted-foreground" data-testid={`text-rank-${coin.symbol.toLowerCase()}`}>
                    {(coin as any).market_cap_rank || '-'}
                  </span>
                </td>
                <td className="py-4 px-2">
                  <Link href={`/coin/${coin.id}`}>
                    <div className="flex items-center space-x-3 hover:text-primary transition-colors cursor-pointer">
                      {coin.image ? (
                        <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-black font-bold text-sm">
                          {coin.symbol.charAt(0).toUpperCase()}
                        </div>
                      )}
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
                          {coin.symbol.toUpperCase()}
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
                    ${coin.current_price >= 1
                      ? coin.current_price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                      : coin.current_price.toFixed(6)}
                  </span>
                </td>
                <td className="py-4 px-2 text-right">
                  <Badge
                    variant={coin.price_change_percentage_24h >= 0 ? 'default' : 'destructive'}
                    className={`${coin.price_change_percentage_24h >= 0 ? 'bg-primary text-black' : 'bg-destructive text-white'}`}
                    data-testid={`badge-change-${coin.symbol.toLowerCase()}`}
                  >
                    {coin.price_change_percentage_24h >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {Math.abs(coin.price_change_percentage_24h).toFixed(2)}%
                  </Badge>
                </td>
                <td className="py-4 px-2 text-right hidden md:table-cell">
                  <span
                    className="text-card-foreground"
                    data-testid={`text-marketcap-${coin.symbol.toLowerCase()}`}
                  >
                    {formatNumber(coin.market_cap)}
                  </span>
                </td>
                <td className="py-4 px-2 text-right hidden lg:table-cell">
                  <span
                    className="text-card-foreground"
                    data-testid={`text-volume-${coin.symbol.toLowerCase()}`}
                  >
                    {formatNumber(coin.total_volume)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              data-testid="button-first-page"
            >
              First
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              data-testid="button-prev-page"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? 'bg-gradient-to-r from-primary to-accent text-black' : ''}
                    data-testid={`button-page-${pageNum}`}
                  >
                    {pageNum}
                  </Button>
                );
              })}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              data-testid="button-next-page"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              data-testid="button-last-page"
            >
              Last
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
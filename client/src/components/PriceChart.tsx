import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { getCoinChartData } from '@/lib/coingecko';

interface PriceChartProps {
  coinId: string;
  days: number;
}

interface ChartDataPoint {
  timestamp: number;
  price: number;
  date: string;
}

export default function PriceChart({ coinId, days }: PriceChartProps) {
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChartData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCoinChartData(coinId, days);
        const formattedData = data.prices.map((price: [number, number]) => ({
          timestamp: price[0],
          price: price[1],
          date: new Date(price[0]).toLocaleDateString()
        }));
        setChartData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching chart data:', err);
        setError('Failed to load chart data');
        setLoading(false);
      }
    };

    fetchChartData();
  }, [coinId, days]);

  if (loading) {
    return (
      <div className="h-96 flex items-center justify-center bg-muted rounded-lg">
        <div className="text-center">
          <div className="text-xl font-medium text-muted-foreground mb-2">Loading chart data...</div>
          <div className="text-sm text-muted-foreground">Please wait</div>
        </div>
      </div>
    );
  }

  if (error || chartData.length === 0) {
    return (
      <div className="h-96 flex items-center justify-center bg-muted rounded-lg border-dashed border-2 border-muted-foreground/30">
        <div className="text-center text-muted-foreground">
          <div className="text-xl font-medium mb-2">Chart data unavailable</div>
          <div className="text-sm">{error || 'No data available for this period'}</div>
        </div>
      </div>
    );
  }

  const minPrice = Math.min(...chartData.map(d => d.price));
  const maxPrice = Math.max(...chartData.map(d => d.price));
  const priceChange = chartData[chartData.length - 1].price - chartData[0].price;
  const isPositive = priceChange >= 0;

  return (
    <div className="h-96 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
              <stop 
                offset="5%" 
                stopColor={isPositive ? "hsl(var(--primary))" : "hsl(var(--destructive))"} 
                stopOpacity={0.3}
              />
              <stop 
                offset="95%" 
                stopColor={isPositive ? "hsl(var(--primary))" : "hsl(var(--destructive))"} 
                stopOpacity={0}
              />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="date" 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
            domain={[minPrice * 0.95, maxPrice * 1.05]}
            tickFormatter={(value) => `$${value.toLocaleString()}`}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '8px',
              padding: '12px'
            }}
            labelStyle={{ color: 'hsl(var(--card-foreground))', fontWeight: 'bold', marginBottom: '4px' }}
            itemStyle={{ color: 'hsl(var(--card-foreground))' }}
            formatter={(value: any) => [`$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Price']}
          />
          <Area 
            type="monotone" 
            dataKey="price" 
            stroke={isPositive ? "hsl(var(--primary))" : "hsl(var(--destructive))"} 
            strokeWidth={2}
            fill="url(#colorPrice)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
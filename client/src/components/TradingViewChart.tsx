import { useEffect, useRef } from 'react';

interface TradingViewChartProps {
  symbol: string;
  coinName?: string;
}

export default function TradingViewChart({ symbol, coinName }: TradingViewChartProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: `BINANCE:${symbol.toUpperCase()}USDT`,
      interval: 'D',
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      enable_publishing: false,
      backgroundColor: 'rgba(0, 0, 0, 1)',
      gridColor: 'rgba(255, 120, 41, 0.06)',
      hide_top_toolbar: false,
      hide_legend: false,
      save_image: false,
      calendar: false,
      support_host: 'https://www.tradingview.com'
    });

    containerRef.current.appendChild(script);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, [symbol]);

  return (
    <div className="tradingview-widget-container" style={{ height: '100%', width: '100%' }} data-testid="chart-container">
      <div 
        className="tradingview-widget-container__widget" 
        style={{ height: 'calc(100% - 32px)', width: '100%' }}
        ref={containerRef}
      />
      <div className="tradingview-widget-copyright">
        <a 
          href={`https://www.tradingview.com/symbols/${symbol.toUpperCase()}USDT/?exchange=BINANCE`}
          rel="noopener nofollow" 
          target="_blank"
        >
          <span className="text-xs text-muted-foreground">
            {coinName || symbol.toUpperCase()} chart
          </span>
        </a>
        {' by TradingView'}
      </div>
    </div>
  );
}

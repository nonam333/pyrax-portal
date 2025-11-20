import { Router } from 'express';

const router = Router();
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// Simple in-memory cache
interface CacheEntry {
  data: any;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 30000; // 30 seconds for most data
const CHART_CACHE_DURATION = 300000; // 5 minutes for chart data (changes less frequently)

// Pre-warm cache with initial data
async function prewarmCache() {
  try {
    console.log('Prewarming cryptocurrency data cache...');
    
    // Fetch markets data
    const marketsResponse = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=24h`
    );
    if (marketsResponse.ok) {
      const marketsData = await marketsResponse.json();
      setCache('markets_usd_market_cap_desc_100_1', marketsData);
      console.log('Cached markets data');
    }
    
    // Wait to avoid rate limit
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Fetch global data
    const globalResponse = await fetch(`${COINGECKO_API_BASE}/global`);
    if (globalResponse.ok) {
      const globalData = await globalResponse.json();
      setCache('global', globalData.data);
      console.log('Cached global data');
    }
    
    // Wait to avoid rate limit
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Fetch bitcoin details for the most common coin
    const bitcoinResponse = await fetch(
      `${COINGECKO_API_BASE}/coins/bitcoin?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
    );
    if (bitcoinResponse.ok) {
      const bitcoinData = await bitcoinResponse.json();
      setCache('coin_bitcoin', bitcoinData);
      console.log('Cached Bitcoin details');
    }
    
    console.log('Cache prewarming complete');
  } catch (error) {
    console.error('Error prewarming cache:', error);
  }
}

// Start cache prewarming
prewarmCache();

function getCached(key: string, allowStale: boolean = false): any | null {
  const entry = cache.get(key);
  if (!entry) return null;
  
  const isChart = key.startsWith('chart_');
  const duration = isChart ? CHART_CACHE_DURATION : CACHE_DURATION;
  
  if (Date.now() - entry.timestamp < duration) {
    return entry.data;
  }
  
  // Return stale data if requested (better than error)
  if (allowStale) {
    return entry.data;
  }
  
  return null;
}

function setCache(key: string, data: any): void {
  cache.set(key, { data, timestamp: Date.now() });
}

router.get('/coins/markets', async (req, res) => {
  try {
    const { vs_currency = 'usd', order = 'market_cap_desc', per_page = 100, page = 1 } = req.query;
    const cacheKey = `markets_${vs_currency}_${order}_${per_page}_${page}`;
    
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json(cached);
    }
    
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/markets?vs_currency=${vs_currency}&order=${order}&per_page=${per_page}&page=${page}&sparkline=false&price_change_percentage=24h`
    );
    
    if (!response.ok) {
      const staleData = getCached(cacheKey, true);
      if (staleData) {
        return res.json(staleData);
      }
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    setCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching markets:', error);
    
    const cacheKey = `markets_${req.query.vs_currency || 'usd'}_${req.query.order || 'market_cap_desc'}_${req.query.per_page || 100}_${req.query.page || 1}`;
    const staleData = getCached(cacheKey, true);
    if (staleData) {
      return res.json(staleData);
    }
    
    res.status(500).json({ error: 'Failed to fetch market data' });
  }
});

router.get('/coins/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cacheKey = `coin_${id}`;
    
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json(cached);
    }
    
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/${id}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
    );
    
    if (!response.ok) {
      const staleData = getCached(cacheKey, true);
      if (staleData) {
        return res.json(staleData);
      }
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    setCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching coin detail:', error);
    
    const cacheKey = `coin_${req.params.id}`;
    const staleData = getCached(cacheKey, true);
    if (staleData) {
      return res.json(staleData);
    }
    
    res.status(500).json({ error: 'Failed to fetch coin data' });
  }
});

router.get('/coins/:id/market_chart', async (req, res) => {
  try {
    const { id } = req.params;
    const { vs_currency = 'usd', days = 30 } = req.query;
    const interval = Number(days) === 1 ? 'hourly' : 'daily';
    const cacheKey = `chart_${id}_${vs_currency}_${days}`;
    
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json(cached);
    }
    
    const response = await fetch(
      `${COINGECKO_API_BASE}/coins/${id}/market_chart?vs_currency=${vs_currency}&days=${days}&interval=${interval}`
    );
    
    if (!response.ok) {
      // If rate limited, try to return stale cache data
      const staleData = getCached(cacheKey, true);
      if (staleData) {
        return res.json(staleData);
      }
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    setCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching chart data:', error);
    
    // Last resort: try to return any cached data, even if very stale
    const cacheKey = `chart_${req.params.id}_${req.query.vs_currency || 'usd'}_${req.query.days || 30}`;
    const staleData = getCached(cacheKey, true);
    if (staleData) {
      return res.json(staleData);
    }
    
    res.status(500).json({ error: 'Failed to fetch chart data' });
  }
});

router.get('/global', async (req, res) => {
  try {
    const cacheKey = 'global';
    
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json(cached);
    }
    
    const response = await fetch(`${COINGECKO_API_BASE}/global`);
    
    if (!response.ok) {
      const staleData = getCached(cacheKey, true);
      if (staleData) {
        return res.json(staleData);
      }
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    const globalData = data.data;
    setCache(cacheKey, globalData);
    res.json(globalData);
  } catch (error) {
    console.error('Error fetching global data:', error);
    
    const staleData = getCached('global', true);
    if (staleData) {
      return res.json(staleData);
    }
    
    res.status(500).json({ error: 'Failed to fetch global data' });
  }
});

// Trending coins endpoint
router.get('/trending', async (req, res) => {
  try {
    const cacheKey = 'trending';
    
    const cached = getCached(cacheKey);
    if (cached) {
      return res.json(cached);
    }
    
    const response = await fetch(`${COINGECKO_API_BASE}/search/trending`);
    
    if (!response.ok) {
      const staleData = getCached(cacheKey, true);
      if (staleData) {
        return res.json(staleData);
      }
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    // Validate response content type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid content type from CoinGecko:', contentType);
      const staleData = getCached(cacheKey, true);
      if (staleData) {
        return res.json(staleData);
      }
      return res.status(502).json({ error: 'Invalid response from CoinGecko API' });
    }
    
    const data = await response.json();
    
    // Validate response shape
    if (!data || !Array.isArray(data.coins)) {
      console.error('Invalid trending data shape:', data);
      const staleData = getCached(cacheKey, true);
      if (staleData) {
        return res.json(staleData);
      }
      return res.status(502).json({ error: 'Invalid trending data format' });
    }
    
    setCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching trending data:', error);
    
    const staleData = getCached('trending', true);
    if (staleData) {
      return res.json(staleData);
    }
    
    res.status(500).json({ error: 'Failed to fetch trending data' });
  }
});

// Export function to access cached markets data for sitemap generation
export function getCachedMarkets(limit: number = 50): Array<{ id: string }> {
  const cacheKey = 'markets_usd_market_cap_desc_100_1';
  const cached = getCached(cacheKey, true); // Allow stale for sitemap
  
  if (!cached || !Array.isArray(cached)) {
    return [];
  }
  
  return cached.slice(0, limit).map((coin: any) => ({ id: coin.id }));
}

export default router;
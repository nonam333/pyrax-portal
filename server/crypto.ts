import { Router } from 'express';

const router = Router();
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// Simple in-memory cache
interface CacheEntry {
  data: any;
  timestamp: number;
}

const cache = new Map<string, CacheEntry>();
const CACHE_DURATION = 30000; // 30 seconds

function getCached(key: string): any | null {
  const entry = cache.get(key);
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data;
  }
  cache.delete(key);
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
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    setCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching markets:', error);
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
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    setCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching coin detail:', error);
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
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    setCache(cacheKey, data);
    res.json(data);
  } catch (error) {
    console.error('Error fetching chart data:', error);
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
      throw new Error(`CoinGecko API error: ${response.status}`);
    }
    
    const data = await response.json();
    const globalData = data.data;
    setCache(cacheKey, globalData);
    res.json(globalData);
  } catch (error) {
    console.error('Error fetching global data:', error);
    res.status(500).json({ error: 'Failed to fetch global data' });
  }
});

export default router;
const COINGECKO_API_BASE = 'https://api.coingecko.com/api/v3';

// Simple in-memory cache
const cache: Record<string, { data: any, timestamp: number }> = {};
const CACHE_DURATION = 60 * 1000; // 1 minute

// Client-side rate limiting helper
async function fetchWithRetry(url: string, maxRetries = 3): Promise<Response> {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url);
      if (response.status === 429 && attempt < maxRetries - 1) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 8000);
        console.warn(`CoinGecko rate-limited (429), retrying in ${delay}ms (attempt ${attempt + 1}/${maxRetries})`);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      return response;
    } catch (error) {
      if (attempt < maxRetries - 1) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 8000);
        await new Promise(resolve => setTimeout(resolve, delay));
        continue;
      }
      throw error;
    }
  }
  return fetch(url); // Final attempt
}

async function fetchJsonWithCache<T>(url: string): Promise<T> {
  const now = Date.now();
  if (cache[url] && (now - cache[url].timestamp < CACHE_DURATION)) {
    // console.log(`Serving from cache: ${url}`);
    return cache[url].data as T;
  }

  const response = await fetchWithRetry(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  cache[url] = { data, timestamp: now };
  return data as T;
}

export interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
  image?: string;
}

export interface CoinDetail {
  id: string;
  symbol: string;
  name: string;
  image: {
    large: string;
  };
  market_data: {
    current_price: {
      usd: number;
    };
    price_change_percentage_24h: number;
    market_cap: {
      usd: number;
    };
    total_volume: {
      usd: number;
    };
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    high_24h: {
      usd: number;
    };
    low_24h: {
      usd: number;
    };
    ath: {
      usd: number;
    };
    atl: {
      usd: number;
    };
    price_change_percentage_7d: number;
    price_change_percentage_30d: number;
    price_change_percentage_1y: number;
  };
  market_cap_rank: number;
  description: {
    en: string;
  };
  links: {
    homepage: string[];
    whitepaper: string;
    blockchain_site: string[];
    official_forum_url: string[];
    twitter_screen_name: string;
    subreddit_url: string;
  };
}

export interface ChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export async function getTopCoins(limit = 100): Promise<CoinPrice[]> {
  return await fetchJsonWithCache<CoinPrice[]>(
    `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`
  );
}

export async function getTickerCoins(limit = 10): Promise<CoinPrice[]> {
  return await fetchJsonWithCache<CoinPrice[]>(
    `${COINGECKO_API_BASE}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${limit}&page=1&sparkline=false&price_change_percentage=24h`
  );
}

export async function getCoinDetail(coinId: string): Promise<CoinDetail> {
  return await fetchJsonWithCache<CoinDetail>(
    `${COINGECKO_API_BASE}/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false`
  );
}

export async function getCoinChartData(
  coinId: string,
  days: number = 30
): Promise<ChartData> {
  return await fetchJsonWithCache<ChartData>(
    `${COINGECKO_API_BASE}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${days === 1 ? 'hourly' : 'daily'}`
  );
}

export async function searchCoins(query: string): Promise<any[]> {
  // Search is dynamic, so we might want to cache shorter or not at all.
  // But for now, let's cache it briefly to avoid debounce spam issues.
  const response = await fetchWithRetry(
    `${COINGECKO_API_BASE}/search?query=${encodeURIComponent(query)}`
  );
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data.coins || [];
}

export async function getGlobalData(): Promise<any> {
  return await fetchJsonWithCache<any>(`${COINGECKO_API_BASE}/global`);
}
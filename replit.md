# Pyrax - Crypto News & Markets Portal

## Overview

Pyrax is a modern cryptocurrency news and markets portal built with a full-stack TypeScript architecture. The application combines real-time market data with a news platform, featuring an elegant black and orange gradient design inspired by theblock.co. It provides cryptocurrency price tracking, market analysis, and news articles in a newspaper-style digital interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack React Query for server state and data fetching
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom dark theme configuration
- **Form Handling**: React Hook Form with Zod validation

**Design System:**
- Color palette restricted to vivid orange gradient (HSL: 20 100% 60% to 35 100% 55%) and pure black background
- Typography using Inter font family via Google Fonts
- Spacing system based on Tailwind primitives (2, 4, 6, 8, 12, 16, 24)
- Component-based architecture with reusable UI elements
- Responsive design with mobile-first approach

**Key Pages:**
- Homepage: Featured articles with hero section and news grid
- Markets Page: Real-time cryptocurrency price tables and market statistics
- Coin Detail Pages: Individual cryptocurrency analysis with price charts
- Article Pages: Full article view with related content
- About Page: Team and mission information

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Session Management**: Connect-pg-simple for PostgreSQL-based sessions
- **API Proxy**: Custom cryptocurrency data aggregation layer

**API Structure:**
- RESTful API design with `/api` prefix
- Crypto data endpoints proxied through `/api/crypto/*`
- CoinGecko API integration with intelligent caching layer
- In-memory caching with configurable TTL (30s for market data, 5min for charts)
- Stale-while-revalidate pattern for improved reliability

**Data Flow:**
1. Server prewarms cache on startup with top markets, global stats, and Bitcoin data
2. Client requests crypto data through custom API endpoints
3. Server checks in-memory cache for fresh data
4. If cache hit and fresh, returns cached data immediately
5. If cache miss, fetches from CoinGecko API with rate limit handling
6. On successful fetch, caches data with timestamp
7. On rate limit (429), returns stale cached data if available
8. If no cached data available, returns user-friendly error with retry option

### Database Architecture

**ORM Choice**: Drizzle ORM selected for type-safe database operations

**Schema Design:**
- Users table with UUID primary keys (generated via PostgreSQL)
- Username/password authentication structure
- Extensible schema supporting future content management

**Database Provider**: Configured for Neon Database (PostgreSQL-compatible serverless)

**Migration Strategy**: Drizzle Kit for schema migrations with push-based deployment

### External Dependencies

**Third-Party APIs:**
- **CoinGecko API**: Primary cryptocurrency market data source
  - **Endpoints**: 
    - `/coins/markets` - List of cryptocurrencies with market data
    - `/coins/{id}` - Detailed coin information
    - `/coins/{id}/market_chart` - Historical price data for charts
    - `/global` - Global cryptocurrency market statistics
  - **Rate Limiting**: Free tier allows 30 API calls per minute
  - **Caching Strategy**:
    - 30-second cache for markets and global data
    - 5-minute cache for chart data (less frequently changing)
    - Stale-while-revalidate fallback when rate limited
    - Cache prewarming on server startup (markets, global, bitcoin)
    - Graceful degradation with user-friendly error messages
  - **Known Limitations**:
    - Uncached coin detail pages may fail on first load during high traffic
    - Chart data may be delayed when API is throttled
    - User-friendly error messages displayed when rate limited
    - Retry functionality available for failed requests
  - **Production Recommendation**: Upgrade to CoinGecko paid tier for guaranteed uptime and higher rate limits

**Email Services:**
- **SendGrid**: Newsletter subscription and email notifications
  - Integration prepared but implementation pending
  - API key configuration via environment variables

**UI Component Libraries:**
- **Radix UI**: Headless component primitives for accessibility
  - Full suite including Dialog, Dropdown, Popover, Toast, etc.
  - Customized with brand-specific theming

**Analytics & Monetization:**
- **Google AdSense**: Ad slot infrastructure prepared
  - Multiple ad formats supported (banner, square, skyscraper, mobile)
  - Currently using placeholder components

**Development Tools:**
- **Replit Integration**: Custom Vite plugins for Replit environment
  - Runtime error overlay for development
  - Cartographer plugin for code mapping
  - Development banner for external access

**Chart Visualization:**
- **Recharts**: Cryptocurrency price chart rendering
  - Line and area charts for historical price data
  - Responsive container implementation
  - Custom tooltip and axis formatting

**Utility Libraries:**
- **date-fns**: Date formatting and manipulation
- **clsx/tailwind-merge**: Dynamic className composition
- **nanoid**: Unique ID generation
- **zod**: Runtime type validation and schema definition

## Recent Changes

### December 2024
- **Live Cryptocurrency Data Integration**: Integrated CoinGecko API with backend proxy system
  - Implemented server-side caching with 30s-5min TTL based on data type
  - Added cache prewarming on server startup for instant data availability
  - Implemented stale-while-revalidate fallback for improved reliability
  - Updated all market components with real live data:
    - PriceTicker: Live scrolling prices with 60s refresh
    - MarketsTable: 14,000+ cryptocurrencies with sorting/filtering
    - GlobalStats: Live market cap, volume, and dominance data
    - CoinDetailPage: Dynamic coin pages with live charts and market data
  - Added user-friendly error handling for API rate limits
  - Optimized refresh intervals to balance freshness with rate limit compliance

### November 2024
- **Logo Enhancement**: Increased Pyrax logo size for maximum readability
  - Updated from h-8 to h-16 for prominent brand visibility
  - Maintained responsive navbar layout without height changes

### October 2024
- **Initial Development**: Built comprehensive crypto news portal
  - Implemented newspaper-style article grid with category filtering
  - Created responsive navigation with dark theme
  - Set up full-stack TypeScript architecture
  - Configured Tailwind CSS with custom orange/black theme
  - Integrated Shadcn UI component library

## Development Guidelines

### Code Conventions
- **TypeScript**: Strict mode enabled with comprehensive type coverage
- **Components**: Functional components with TypeScript interfaces
- **Styling**: Tailwind CSS utility-first approach
- **State Management**: React Query for server state, useState for local state
- **File Organization**: Feature-based structure with shared components

### API Development
- **Caching**: All external API calls must implement caching strategy
- **Error Handling**: Graceful degradation with user-friendly messages
- **Rate Limiting**: Respect third-party API limits with intelligent retry logic
- **Response Format**: Consistent JSON structure across all endpoints

### Testing Strategy
- **Manual Testing**: Verify core user flows before deployment
- **Error States**: Test rate limit scenarios and cache behavior
- **Responsive Design**: Validate across mobile, tablet, and desktop viewports

## Known Issues & Limitations

1. **CoinGecko Free Tier Constraints**:
   - 30 API calls per minute rate limit
   - Uncached coin pages may fail on first load during traffic spikes
   - Solution: Cache prewarming helps, but paid tier recommended for production

2. **Newsletter Integration**:
   - SendGrid integration prepared but not fully implemented
   - Requires SENDGRID_API_KEY environment variable

3. **Google AdSense**:
   - Ad slots rendered but not connected to real AdSense account
   - Placeholder components show ad dimensions

## Future Enhancements

1. **API Improvements**:
   - Implement request queuing for better rate limit management
   - Add Redis for persistent caching across server restarts
   - Consider alternative crypto data providers for redundancy

2. **Content Management**:
   - Admin panel for article creation and management
   - User authentication for watchlists and alerts
   - Comment system for articles

3. **Analytics**:
   - Real-time user activity tracking
   - Popular coin tracking dashboard
   - Newsletter subscription analytics

## Environment Variables

Required:
- `SESSION_SECRET`: Express session encryption key
- `DATABASE_URL`: PostgreSQL connection string

Optional:
- `SENDGRID_API_KEY`: Email service API key
- `GOOGLE_ADSENSE_ID`: AdSense publisher ID

## Deployment Notes

- Application runs on port 5000 (configured for Replit)
- Frontend and backend served from same Express instance
- Vite dev server in development, static build in production
- Database migrations managed via Drizzle Kit
- Cache prewarming occurs automatically on server startup
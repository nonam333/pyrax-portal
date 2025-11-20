# Pyrax - Crypto News & Markets Portal

## Overview
Pyrax is a modern, full-stack TypeScript cryptocurrency news and markets portal. It provides real-time market data, price tracking, market analysis, and news articles in a digital newspaper-style interface. The project aims to offer a comprehensive platform for crypto enthusiasts, featuring an elegant black and orange gradient design inspired by theblock.co.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend
- **Technology Stack**: React with TypeScript (Vite), Wouter for routing, TanStack React Query for state, Shadcn/ui (Radix UI) for components, Tailwind CSS for styling, React Hook Form with Zod for forms.
- **Design System**: Vivid orange gradient and pure black background, Inter font, Tailwind-based spacing, component-based, responsive design.
- **Key Pages**: Homepage, Markets, Learn, Analysis, Regulation, Coin Detail, Article, About, Blog CMS.

### Backend
- **Technology Stack**: Node.js with Express.js, TypeScript, Drizzle ORM for PostgreSQL, Connect-pg-simple for sessions.
- **API Structure**: RESTful API, custom crypto data aggregation layer with CoinGecko integration.
- **Data Flow**: Server prewarms cache, client requests data, server checks in-memory cache (30s for market, 5min for charts), fetches from CoinGecko if miss (with rate limit handling), caches data. Stale-while-revalidate fallback.

### Database
- **ORM**: Drizzle ORM for type-safe operations.
- **Schema**: Users table with UUIDs, username/password auth.
- **Provider**: Neon Database (PostgreSQL-compatible serverless).
- **Migrations**: Drizzle Kit.

## External Dependencies

### Third-Party APIs
- **CoinGecko API**: Primary source for cryptocurrency market data (e.g., `/coins/markets`, `/coins/{id}/market_chart`). Implements 30-second to 5-minute caching and stale-while-revalidate for rate limit handling.
- **SendGrid**: Prepared for newsletter subscriptions and email notifications (implementation pending).

### UI Component Libraries
- **Radix UI**: Headless component primitives for accessibility.

### Analytics & Monetization
- **Google AdSense**: Ad slot infrastructure prepared (currently placeholders).

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit environment (e.g., runtime error overlay, Cartographer, development banner).

### Chart Visualization
- **TradingView**: Integrated advanced chart widget for interactive cryptocurrency price charts.

### Utility Libraries
- **date-fns**: Date formatting.
- **clsx/tailwind-merge**: Dynamic className composition.
- **nanoid**: Unique ID generation.
- **zod**: Runtime type validation.
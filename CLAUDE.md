# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Pyrax Portal is a cryptocurrency news and information portal built as a full-stack monorepo. It combines a React frontend with an Express backend, featuring real-time market data, educational content, news articles, and a content management system.

## Development Commands

### Core Development
```bash
npm run dev          # Start development server with hot reload (port 5000)
npm run build        # Build both frontend and backend for production
npm start            # Run production build
npm run check        # Type-check TypeScript without emitting files
```

### Database Operations
```bash
npm run db:push      # Push schema changes to database using Drizzle
```

Note: The project currently uses in-memory storage. To use a real database, set `DATABASE_URL` in `.env` and replace `MemStorage` with actual Drizzle database connection in `server/storage.ts`.

## Project Architecture

### Monorepo Structure
```
├── client/          # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── pages/   # Route-based page components
│   │   ├── components/  # Reusable UI components
│   │   ├── hooks/   # Custom React hooks
│   │   └── lib/     # Utilities and API client
├── server/          # Express.js backend
│   ├── index.ts     # Server entry point with route registration
│   ├── routes.ts    # API route handlers
│   ├── crypto.ts    # CoinGecko API proxy with caching
│   ├── notion.ts    # Notion CMS integration
│   ├── storage.ts   # Data storage abstraction layer with seeded articles
│   └── article-content.ts  # Rich article content with custom tags
├── shared/          # Shared between client and server
│   └── schema.ts    # Drizzle schema + Zod validation schemas
└── attached_assets/ # Static assets
```

### Key Architectural Patterns

**Path Aliases:**
- `@/*` → `client/src/*`
- `@shared/*` → `shared/*`
- `@assets/*` → `attached_assets/*`

**Frontend Routing (Wouter):**
Routes are defined in `client/src/App.tsx`. Main routes include `/`, `/markets`, `/learn`, `/learn/:topic`, `/coin/:id`, `/analysis`, `/regulation`, `/cms`, `/article/:id`, and legal pages.

**State Management:**
- React Query (TanStack Query) for server state with `staleTime: Infinity`
- Query keys follow pattern: `['/api/endpoint', params]`
- All API requests go through `apiRequest()` utility in `client/src/lib/queryClient.ts`
- Mutations invalidate affected queries automatically

**API Design:**
All backend routes are registered in `server/routes.ts` via `registerRoutes()`. API endpoints use `/api/*` prefix. The server uses Express with JSON middleware and serves the built frontend in production.

### Database Schema

Schema is defined in `shared/schema.ts` using Drizzle ORM with PostgreSQL dialect:

**Tables:**
- `users`: id (UUID), username (unique), password (hashed)
- `blog_posts`: id (UUID), title, slug (unique), excerpt, content (HTML), category, contentType (News/Learn/Markets/Analysis/Regulation), coverImage, images[], author, readTime, status (draft/published/unpublished), publishedAt, lastSyncedAt, updatedAt, notionPageId

**Type Inference:**
Use `typeof tableName.$inferSelect` for SELECT types and `insertTableNameSchema` (Zod) for INSERT/UPDATE validation.

### API Endpoints

**Blog Posts:**
```
GET    /api/blog-posts              # List all posts, accepts ?contentType filter
GET    /api/blog-posts/:id          # Get single post by ID
POST   /api/blog-posts              # Create new post (validates with Zod)
PATCH  /api/blog-posts/:id          # Update post (partial updates)
DELETE /api/blog-posts/:id          # Delete post
POST   /api/blog-posts/sync-notion  # Bulk import from Notion database
```

**Cryptocurrency (CoinGecko Proxy):**
```
GET /api/crypto/coins/markets                    # Top coins by market cap
GET /api/crypto/coins/:id                        # Individual coin details
GET /api/crypto/coins/:id/market_chart           # Historical price data
GET /api/crypto/global                           # Global market statistics
GET /api/crypto/trending                         # Trending coins
```

The crypto endpoints include intelligent caching (30s for general data, 5min for charts) with stale-cache fallback for resilience.

**Notion Integration:**
```
GET /api/notion/databases          # List available Notion databases
GET /api/notion/pages/:databaseId  # List pages in a database
```

### External Integrations

**CoinGecko API (`server/crypto.ts`):**
- Proxies CoinGecko API with caching layer
- Cache prewarming on startup (bitcoin, markets, global data)
- Stale cache fallback when API rate limits are hit
- No API key required for current implementation

**Notion API (`server/notion.ts`):**
- Imports blog posts from Notion databases
- Supports paragraphs, headings (h1-h3), lists, code blocks
- Auto-maps categories to contentType based on keywords
- Requires `NOTION_API_KEY` and `NOTION_DATABASE_ID` environment variables

**SendGrid (Configured but not implemented):**
- Package installed but not actively used
- Requires `SENDGRID_API_KEY` for email functionality

### Authentication Status

Authentication dependencies are installed (Passport.js, express-session) but not fully implemented. The CMS at `/cms` is currently unauthenticated. Users table exists in schema but no authentication middleware is active.

### Key Dependencies

**Frontend:**
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **Wouter**: Lightweight routing
- **React Query (TanStack Query)**: Server state management
- **Framer Motion**: Animation library for 3D effects and scroll animations
- **Recharts**: Data visualization for charts
- **Embla Carousel**: Image galleries
- **Tailwind CSS**: Utility-first styling
- **Shadcn/ui + Radix UI**: Component primitives
- **Lucide React**: Icon library

**Backend:**
- **Express.js**: Web server
- **Drizzle ORM**: Database toolkit
- **Zod**: Schema validation
- **@node-rs/argon2**: Password hashing
- **Passport.js**: Authentication (installed but not active)

## Design System

### Color Palette
- **Primary**: Orange gradient (hsl(20 100% 60%) to hsl(35 100% 55%))
- **Background**: Pure black (hsl(0 0% 0%))
- **Text**: White (hsl(0 0% 100%))
- **Cards**: Dark gray (hsl(0 0% 15%))
- **Secondary text**: Medium gray (hsl(0 0% 40%))

### Component Library
Built on Shadcn/ui components (Radix UI primitives + Tailwind). 30+ pre-built components in `client/src/components/ui/`. All components support dark mode and are keyboard accessible.

### Rich Article Components
The project includes a sophisticated rich content system for articles (`client/src/components/article/`):

**RichArticleContent Component (`client/src/components/RichArticleContent.tsx`):**
- Parses custom HTML tags and renders them as interactive React components
- Implements scroll-triggered animations using Framer Motion
- Supports custom tags: `<chart>`, `<datatable>`, `<statbox>`, `<callout>`, `<gallery>`, `<pullquote>`

**Article Components:**
- **ArticleChart.tsx**: Recharts wrapper supporting line, area, bar, and pie charts with orange gradient styling
- **DataTable.tsx**: Styled tables with orange gradient headers and hover effects
- **StatBox.tsx**: Animated statistics boxes with counting number animations
- **Callout.tsx**: Highlighted content boxes with 4 types (info, tip, warning, insight)
- **ImageGallery.tsx**: Embla carousel for image galleries
- **PullQuote.tsx**: Styled block quotes with orange borders and gradients

**Example Usage in Articles:**
```html
<statbox>{"label": "Market Impact", "value": "$52,400", "change": "+12.3%"}</statbox>
<chart type="area" title="Price Chart" data='[{"name": "Jan", "value": 100}, ...]'></chart>
<datatable title="Statistics" data='{"headers": ["Metric", "Value"], "rows": [...]}'></datatable>
<callout type="insight" title="Why This Matters">Important context here...</callout>
<pullquote content="Quote text" author="Author Name"></pullquote>
```

### 3D Card Effects
Article cards (`client/src/components/ArticleCard.tsx`) feature sophisticated 3D interactions:
- Mouse-tracking tilt using Framer Motion (±8° on X/Y axes)
- Orange glow shadow on hover: `0 20px 40px rgba(255, 141, 0, 0.3)`
- Image zoom with bounce easing (110% scale)
- Shine/gleam effect (white gradient sweep)
- Spring animations for smooth, natural movement
- GPU-accelerated with `transformStyle: preserve-3d`

### Typography
- Font family: Inter (modern sans-serif)
- Headlines: Bold weights (700-800)
- Body: Regular (400) and medium (500)
- Metadata: Light (300)

### Spacing
Use Tailwind spacing primitives: 2, 4, 6, 8, 12, 16, 24 (corresponds to 0.5rem, 1rem, 1.5rem, 2rem, 3rem, 4rem, 6rem).

## Important Implementation Notes

### When Adding New Blog Features
- All blog-related types are in `shared/schema.ts`
- Use `insertBlogPostSchema` for POST/PATCH validation
- Status field controls visibility: `draft` (hidden), `published` (visible), `unpublished` (hidden)
- Slugs must be unique and URL-friendly
- Content field stores HTML with custom tags (rendered via `RichArticleContent` component)
- **Seeded Articles**: The project includes 12 pre-seeded professional articles in `server/storage.ts`
  - Featured articles: Bitcoin ETF approval, Ethereum Shanghai upgrade (with rich content)
  - Market analysis: JPMorgan crypto desk, DeFi TVL, Trading volume analysis
  - Quick reads: Regulation updates, Solana DeFi, NFT recovery
  - Breaking news: Technical analysis, Correlation study, Web3 investment
  - All articles are SEO-optimized with professional journalism quality

### When Working with Cryptocurrency Data
- All crypto data goes through the cache layer in `server/crypto.ts`
- Never bypass the cache by calling CoinGecko directly from frontend
- Cache TTLs are configurable via `CACHE_DURATION` and `CHART_CACHE_DURATION`
- Handle rate limits gracefully by returning stale cache data

### When Modifying Database Schema
1. Edit `shared/schema.ts` to update table definitions
2. Run `npm run db:push` to apply changes to database
3. Zod schemas will auto-update via `drizzle-zod`
4. Update TypeScript types if needed (usually inferred automatically)

### When Adding New API Routes
1. Add route handler in `server/routes.ts`
2. Register in `registerRoutes()` function
3. Add corresponding client-side query in React Query
4. Follow RESTful conventions for endpoint naming

### Vite Build Configuration
- Frontend builds to `dist/public/`
- Backend bundles to `dist/index.js` via esbuild
- In development, Vite runs in middleware mode integrated with Express
- Static assets are served from `attached_assets/` in development

### Environment Variables
Required variables (see `.env.example`):
- `DATABASE_URL`: PostgreSQL connection string (currently optional as in-memory storage is used)
- `NODE_ENV`: "development" or "production"
- `PORT`: Server port (default 5000)
- `SESSION_SECRET`: Random secret for sessions (required if authentication is implemented)

Optional variables:
- `NOTION_API_KEY`, `NOTION_DATABASE_ID`: For Notion CMS integration
- `SENDGRID_API_KEY`: For email functionality
- `FRONTEND_URL`: For CORS configuration

## Article Content Enhancement System

### Rich Content Architecture
The project implements a custom tag parsing system for creating visually rich, interactive articles:

1. **Content Storage**: Articles are stored in `server/storage.ts` (seeded) and `server/article-content.ts` (extended content)
2. **Custom Tags**: HTML content includes special tags like `<chart>`, `<datatable>`, `<statbox>`, etc.
3. **Parsing**: `RichArticleContent` component parses these tags using regex
4. **Rendering**: Custom tags are converted to animated React components
5. **Animation**: Framer Motion provides scroll-triggered animations with viewport triggers

### Writing Rich Articles
When creating article content, use these custom tags:

**Charts** (supports line, area, bar, pie):
```html
<chart type="area" title="Bitcoin Price" description="Last 7 days"
  data='[{"name": "Mon", "value": 50000}, {"name": "Tue", "value": 52000}]'>
</chart>
```

**Data Tables**:
```html
<datatable title="Market Statistics"
  data='{"headers": ["Metric", "Value"], "rows": [["Market Cap", "$1.2T"], ["Volume", "$45B"]]}'>
</datatable>
```

**Stat Boxes** (with animated counting):
```html
<statbox>{"label": "Total Value Locked", "value": "$45.2B", "change": "+8.5%",
  "description": "Across all DeFi protocols"}</statbox>
```

**Callouts** (types: info, tip, warning, insight):
```html
<callout type="insight" title="Key Takeaway">
  This represents a major shift in market dynamics...
</callout>
```

**Pull Quotes**:
```html
<pullquote content="The future of finance is being built today."
  author="Vitalik Buterin, Ethereum Founder"></pullquote>
```

**Image Galleries**:
```html
<gallery images='[{"url": "https://...", "caption": "Chart showing..."}, ...]'></gallery>
```

### Article Page Features
The ArticlePage component includes:
- **Scroll Progress Bar**: Orange gradient bar at top tracking reading progress
- **Back to Top Button**: Floating button appears after scrolling 500px
- **Page Transitions**: Framer Motion fade-in animations
- **Social Sharing**: Twitter/X, Facebook, LinkedIn sharing buttons
- **Responsive Layout**: Mobile-optimized with proper spacing

### Performance Considerations
- All animations use GPU-accelerated transforms (`translate3d`, `scale`)
- Spring animations prevent jank with proper stiffness/damping values
- Scroll-triggered animations use `viewport: { once: true }` to prevent re-triggering
- Images lazy-load and use proper aspect ratios

## Common Development Scenarios

### Adding a New Content Type
1. Update `contentType` enum in `shared/schema.ts` (blogPosts table)
2. Add new tab in CMS (`client/src/pages/BlogCMS.tsx`)
3. Update content type mapping in Notion sync if applicable (`server/notion.ts`)
4. Create dedicated page route if needed (e.g., `/new-content-type`)

### Adding a New Cryptocurrency Feature
1. Check if data exists in CoinGecko API documentation
2. Add proxy endpoint in `server/crypto.ts` with appropriate caching
3. Create TypeScript interface for response data in `client/src/lib/coingecko.ts`
4. Add React Query hook in component
5. Build UI component with market data display

### Implementing Authentication
1. Configure Passport strategy in `server/index.ts`
2. Add session middleware with `connect-pg-simple` for PostgreSQL sessions
3. Create login/logout routes in `server/routes.ts`
4. Add authentication middleware to protected routes (especially `/api/blog-posts` mutations)
5. Create login UI components in `client/src/components/`
6. Update CMS to check authentication status

### Working with Notion CMS
The Notion integration maps Notion database properties to blog post fields:
- **Name/Title** → `title`
- **Excerpt** (rich text) → `excerpt`
- **Category/Tags** (multi-select) → auto-mapped to `contentType`
- **Cover image** → `coverImage`
- **Content blocks** → `content` (converted to markdown)

Categories are auto-detected: keywords like "learn", "education" → Learn; "analysis", "research" → Analysis; "regulation", "policy" → Regulation; default → News.

### Testing API Endpoints
Use curl or tools like Postman/Insomnia:
```bash
# Get all news articles
curl http://localhost:5000/api/blog-posts?contentType=News

# Get coin details
curl http://localhost:5000/api/crypto/coins/bitcoin

# Create a blog post
curl -X POST http://localhost:5000/api/blog-posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Test","slug":"test","contentType":"News","status":"draft"}'
```

## Code Style Conventions

- Use TypeScript strict mode (already configured)
- Prefer functional components with hooks over class components
- Use async/await over promise chains
- Keep components small and focused (single responsibility)
- Extract complex logic into custom hooks
- Use Zod for runtime validation at API boundaries
- Follow REST conventions for API design (GET, POST, PATCH, DELETE)
- Use semantic HTML and ARIA attributes for accessibility

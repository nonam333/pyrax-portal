# Deploy PyraxPortal to Render with Custom Domain (pyrax.io)

This guide will walk you through deploying your PyraxPortal application to Render and connecting your custom domain **pyrax.io**.

---

## Why Render?

- ✅ Free tier available (perfect for testing)
- ✅ Full Node.js + Express support
- ✅ Built-in PostgreSQL database
- ✅ Automatic HTTPS/SSL
- ✅ Custom domain support
- ✅ Auto-deploy from GitHub
- ✅ Easy environment variable management

---

## Part 1: Prepare Your Code

### Step 1: Push to GitHub

```bash
cd c:\Users\harsh\Desktop\PyraxPortal\PyraxPortal

# Initialize git (if not already done)
git init

# Add all files
git add .

# Create first commit
git commit -m "Initial commit - ready for Render deployment"

# Create a GitHub repository at https://github.com/new
# Then connect and push:
git remote add origin https://github.com/YOUR-USERNAME/pyrax-portal.git
git branch -M main
git push -u origin main
```

---

## Part 2: Set Up Database

### Option A: Render PostgreSQL (Recommended - Free tier available)

You'll create this directly in Render in the next steps.

### Option B: Neon Database (Alternative - Free tier)

1. Go to https://neon.tech
2. Sign up and create a new project
3. Copy the connection string (starts with `postgresql://`)
4. Save it for later - you'll add it to Render

---

## Part 3: Deploy to Render

### Step 1: Create Render Account

1. Go to https://render.com
2. Click "Get Started for Free"
3. Sign up with GitHub (recommended)

### Step 2: Create PostgreSQL Database (if using Render's database)

1. In Render dashboard, click "New +"
2. Select "PostgreSQL"
3. Configure:
   - **Name**: `pyrax-db`
   - **Database**: `pyrax`
   - **User**: `pyrax_user`
   - **Region**: Choose closest to your target audience
   - **Plan**: Free (or paid for better performance)
4. Click "Create Database"
5. **Save the connection details** - you'll need the "Internal Database URL"

### Step 3: Create Web Service

1. In Render dashboard, click "New +"
2. Select "Web Service"
3. Click "Connect a repository"
4. Authorize Render to access your GitHub
5. Select your `pyrax-portal` repository

### Step 4: Configure Web Service

Fill in the following:

- **Name**: `pyrax-portal` (or any name you prefer)
- **Region**: Same as your database
- **Branch**: `main`
- **Root Directory**: Leave blank
- **Runtime**: `Node`
- **Build Command**:
  ```
  npm install && npm run build
  ```
- **Start Command**:
  ```
  npm run start
  ```
- **Plan**: Free (or Starter for $7/month for better performance)

### Step 5: Add Environment Variables

Click "Advanced" then add these environment variables:

| Key | Value |
|-----|-------|
| `NODE_ENV` | `production` |
| `DATABASE_URL` | Paste your database connection string (from Step 2 or Neon) |
| `SESSION_SECRET` | Generate using the command below |
| `SENDGRID_API_KEY` | Your SendGrid API key (if using email) |
| `NOTION_API_KEY` | Your Notion API key (if using) |
| `NOTION_DATABASE_ID` | Your Notion database ID (if using) |

**To generate SESSION_SECRET**, run this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 6: Deploy

1. Click "Create Web Service"
2. Render will start building and deploying
3. Wait 3-5 minutes for the first deployment
4. You'll get a URL like: `https://pyrax-portal.onrender.com`

---

## Part 4: Push Database Schema

Once your app is deployed, you need to push your database schema:

```bash
# In your local project directory
# Make sure DATABASE_URL in your local .env points to your Render/Neon database

npm run db:push
```

---

## Part 5: Connect Your Custom Domain (pyrax.io)

### Step 1: Add Custom Domain in Render

1. In your Render web service dashboard, go to "Settings"
2. Scroll down to "Custom Domains"
3. Click "Add Custom Domain"
4. Enter: `pyrax.io`
5. Click "Add Custom Domain"
6. Render will show you DNS records to configure

### Step 2: Configure DNS at Your Domain Provider

Render will provide you with specific DNS records. You need to add these to your domain (where you bought pyrax.io from WordPress/whoever).

#### If you want to use the apex domain (pyrax.io):

Go to your domain provider's DNS settings and add:

**A Records** (Render will provide the exact IPs):
```
Type: A
Name: @
Value: [IP from Render - will be something like 216.24.57.1]
TTL: 3600 (or Auto)
```

#### If you want to use www (www.pyrax.io):

```
Type: CNAME
Name: www
Value: pyrax-portal.onrender.com (your Render URL without https://)
TTL: 3600 (or Auto)
```

#### Recommended: Set up both

Add both A record for apex and CNAME for www, then in Render, add both domains:
- `pyrax.io`
- `www.pyrax.io`

### Step 3: Where to Update DNS

Since you bought from WordPress hosting, you need to find where your DNS is managed:

**Common scenarios:**

1. **Managed by your hosting provider**:
   - Login to your hosting control panel
   - Look for "DNS Management" or "Domain Management"

2. **Managed separately (like Namecheap, GoDaddy)**:
   - Login to where you registered the domain
   - Find "DNS Settings" or "DNS Management"

3. **Using Cloudflare** (recommended for better performance):
   - You can transfer DNS management to Cloudflare (free)
   - Better performance, DDoS protection, analytics

### Step 4: Wait for DNS Propagation

- DNS changes can take 1-48 hours to propagate (usually 1-4 hours)
- You can check status at: https://dnschecker.org
- Enter `pyrax.io` and check if it points to Render's IP

### Step 5: SSL Certificate

Once DNS is configured:
1. Render will automatically provision an SSL certificate
2. This usually takes 5-15 minutes after DNS propagates
3. Your site will be accessible via `https://pyrax.io`

---

## Part 6: Test Your Deployment

1. Visit `https://pyrax.io` (after DNS propagates)
2. Test all major features:
   - Homepage loads
   - News articles display
   - Market data loads
   - Navigation works
   - Forms submit correctly

---

## Part 7: Set Up Auto-Deploy (Optional but Recommended)

Render automatically deploys when you push to GitHub:

1. Make a change to your code locally
2. Commit and push:
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```
3. Render will automatically detect the change and redeploy

To disable auto-deploy:
- Go to Settings → Build & Deploy → Auto-Deploy: OFF

---

## Troubleshooting

### Build fails

**Check logs in Render dashboard:**
- Look for missing dependencies
- Ensure all required packages are in `dependencies` (not `devDependencies`)

**Common fixes:**
```bash
# Make sure TypeScript and build tools are in dependencies
npm install --save-prod typescript tsx esbuild
git add package.json package-lock.json
git commit -m "Move build dependencies"
git push
```

### Database connection fails

1. Check `DATABASE_URL` environment variable is correct
2. Ensure database is running in Render
3. Verify you ran `npm run db:push`

### Site shows 404 or blank page

1. Check that build completed successfully
2. Verify `dist/public` folder was created
3. Check browser console for errors

### Custom domain not working

1. Verify DNS records are correct
2. Check DNS propagation at https://dnschecker.org
3. Wait 24-48 hours for full propagation
4. Check Render dashboard for SSL certificate status

### App is slow or goes to sleep

**Free tier sleeps after 15 minutes of inactivity**

Solutions:
- Upgrade to Starter plan ($7/month) for always-on service
- Use a free uptime monitor like:
  - https://uptimerobot.com
  - https://cron-job.org
  - Pings your site every 5-10 minutes to keep it awake

---

## Cost Breakdown

### Free Option
- Render Free tier: $0
- Neon PostgreSQL Free: $0
- Custom domain: Already paid for
- **Total: $0/month** (but service sleeps after 15min inactivity)

### Recommended Production Setup
- Render Starter: $7/month (always-on, no sleep)
- PostgreSQL: Included in Render Starter or Neon free tier
- **Total: $7/month**

### Full Production
- Render Pro: $25/month (better resources, scaling)
- PostgreSQL Pro: $20/month (better performance)
- **Total: $45/month**

---

## Environment Variables Reference

Create a `.env` file locally (for reference):

```env
NODE_ENV=production
DATABASE_URL=postgresql://user:password@host:5432/database
SESSION_SECRET=your-generated-secret
PORT=5000

# Optional - if using email
SENDGRID_API_KEY=your-api-key

# Optional - if using Notion CMS
NOTION_API_KEY=your-notion-key
NOTION_DATABASE_ID=your-database-id

# Optional - crypto APIs if needed
# COINGECKO_API_KEY=your-key
# COINMARKETCAP_API_KEY=your-key
```

**Never commit `.env` to git!** (already in `.gitignore`)

---

## Useful Commands

```bash
# Run locally in production mode
npm run build
npm run start

# Push database schema changes
npm run db:push

# Check TypeScript errors
npm run check

# View Render logs
# Go to dashboard → Logs tab

# Connect to production database (if using Render DB)
# Get connection string from Render dashboard
psql "your-database-url"
```

---

## Next Steps After Deployment

1. **Set up monitoring**: Use Render's built-in monitoring or add external tools
2. **Configure SEO**: Update meta tags, sitemap, robots.txt
3. **Add analytics**: Google Analytics, Plausible, etc.
4. **Set up backups**: Configure database backups in Render
5. **Add custom error pages**: Create 404, 500 error pages
6. **Optimize performance**: Add caching, CDN for static assets

---

## Additional Resources

- [Render Documentation](https://render.com/docs)
- [Render Node.js Deployment](https://render.com/docs/deploy-node-express-app)
- [Custom Domain Setup](https://render.com/docs/custom-domains)
- [Environment Variables](https://render.com/docs/environment-variables)
- [PostgreSQL on Render](https://render.com/docs/databases)

---

## Support

If you run into issues:
1. Check Render's status page: https://status.render.com
2. Review deployment logs in Render dashboard
3. Render support: https://render.com/docs/support

---

## Summary Checklist

- [ ] Push code to GitHub
- [ ] Create Render account
- [ ] Create PostgreSQL database
- [ ] Create web service
- [ ] Add environment variables
- [ ] Deploy application
- [ ] Push database schema
- [ ] Add custom domain in Render
- [ ] Configure DNS records at domain provider
- [ ] Wait for DNS propagation
- [ ] Verify SSL certificate
- [ ] Test production site
- [ ] Set up monitoring

---

Good luck with your deployment! Your Pyrax portal should be live at https://pyrax.io soon! 🚀

# Deploying PyraxPortal to Netlify

## Important Note About Your Application

Your application uses an **Express.js server** which runs continuously. Netlify is optimized for:
- Static sites
- Serverless functions (not long-running servers)

### Recommended Alternatives for Full-Stack Apps:
1. **Render** (easiest for your stack) - https://render.com
2. **Railway** (great PostgreSQL support) - https://railway.app
3. **Vercel** (good for full-stack) - https://vercel.com
4. **Fly.io** (containerized deployments) - https://fly.io

However, if you want to use Netlify, follow the steps below:

---

## Prerequisites

1. Your project is already on your local machine
2. You have a Netlify account (sign up at https://netlify.com)
3. You have a PostgreSQL database (Neon, Supabase, or another provider)
4. You have Git installed

---

## Step 1: Initialize Git Repository (if not already done)

```bash
cd c:\Users\harsh\Desktop\PyraxPortal\PyraxPortal
git init
git add .
git commit -m "Initial commit - prepare for Netlify deployment"
```

---

## Step 2: Push to GitHub/GitLab

Create a new repository on GitHub or GitLab, then:

```bash
git remote add origin <your-repository-url>
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Netlify

### Option A: Via Netlify Dashboard (Recommended)

1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your Git provider (GitHub/GitLab)
4. Select your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist/public`
   - **Node version**: 20

### Option B: Via Netlify CLI

```bash
# Install Netlify CLI globally
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init

# Follow the prompts
```

---

## Step 4: Configure Environment Variables

In your Netlify dashboard, go to:
**Site settings → Environment variables → Add a variable**

Add these variables (adjust to your setup):

```
DATABASE_URL=<your-neon-database-url>
NODE_ENV=production
SESSION_SECRET=<generate-a-random-secret>
SENDGRID_API_KEY=<your-sendgrid-key>
NOTION_API_KEY=<your-notion-key>
NOTION_DATABASE_ID=<your-notion-database-id>
```

### To generate a secure SESSION_SECRET:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Step 5: Database Setup

Your app uses PostgreSQL. Make sure you have a production database:

### Using Neon (Recommended)
1. Go to https://neon.tech
2. Create a new project
3. Copy the connection string
4. Add it to Netlify environment variables as `DATABASE_URL`

### Push your database schema:
```bash
npm run db:push
```

---

## Step 6: Connect Your Custom Domain

1. In Netlify dashboard, go to: **Domain settings**
2. Click **Add custom domain**
3. Enter your domain name (e.g., `pyrax.io` or `www.pyrax.io`)
4. Netlify will provide you with DNS records

### Update Your Domain DNS Settings:

Go to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.) and add these records:

**For apex domain (pyrax.io):**
```
Type: A
Name: @
Value: 75.2.60.5
```

**For www subdomain (www.pyrax.io):**
```
Type: CNAME
Name: www
Value: <your-site-name>.netlify.app
```

**Alternative - Use Netlify DNS (Easier):**
1. In Netlify, click "Set up Netlify DNS"
2. Netlify will provide nameservers
3. Update nameservers at your domain registrar
4. Wait 24-48 hours for propagation

---

## Step 7: SSL Certificate

Netlify automatically provisions an SSL certificate for your custom domain. This usually takes a few minutes after DNS is configured.

You can verify in: **Domain settings → HTTPS**

---

## Important Limitations with Netlify

⚠️ **Your Express.js server won't run on Netlify as-is**

Netlify doesn't support long-running Node.js servers. You would need to:

1. **Convert Express routes to Netlify Functions**
   - Each route becomes a serverless function
   - This requires significant refactoring

2. **OR Deploy backend separately**
   - Deploy frontend to Netlify
   - Deploy backend to Render/Railway/Fly.io
   - Update API URLs in frontend

---

## Alternative: Deploy to Render (Recommended for Your Stack)

Since your app has a backend server, Render is a better fit:

1. Go to https://render.com
2. Create a new "Web Service"
3. Connect your GitHub repo
4. Configure:
   - **Build Command**: `npm run build`
   - **Start Command**: `npm run start`
   - **Environment**: Node
5. Add environment variables
6. Deploy
7. Connect custom domain in Render dashboard

Render supports:
- Full Node.js servers ✅
- PostgreSQL databases ✅
- Automatic SSL ✅
- Custom domains ✅
- Auto-deploy from Git ✅

---

## Next Steps

Choose your deployment path:

1. **For Netlify**: You'll need to refactor your backend to serverless functions
2. **For Render/Railway/Vercel**: Your app will work with minimal changes

Let me know which option you prefer, and I can help you with the specific configuration!

---

## Troubleshooting

### Build fails
- Check Node version is set to 20
- Verify all dependencies are in `dependencies` (not `devDependencies`)
- Check build logs in Netlify dashboard

### Database connection fails
- Verify `DATABASE_URL` environment variable
- Check if database allows external connections
- Ensure IP whitelist includes Netlify IPs (or allow all)

### Routes not working
- Check `netlify.toml` redirects
- Verify build output directory is correct

---

## Resources

- [Netlify Documentation](https://docs.netlify.com)
- [Neon Database](https://neon.tech)
- [Render Documentation](https://render.com/docs)
- [Custom Domain Setup](https://docs.netlify.com/domains-https/custom-domains/)

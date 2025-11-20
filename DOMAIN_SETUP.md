# Quick Guide: Connect pyrax.io to Render

## Step-by-Step Domain Connection

### 1. Find Your DNS Management Panel

Since you bought your domain with WordPress hosting, you need to locate your DNS settings:

#### Option A: Through Your Hosting Provider
1. Login to your WordPress hosting control panel
2. Look for one of these sections:
   - "Domain Management"
   - "DNS Settings"
   - "DNS Management"
   - "Advanced DNS"
   - "Name Servers"

#### Option B: Check Your Domain Registrar
Your domain might be registered with a different company:
- **GoDaddy**: https://dcc.godaddy.com/manage/dns
- **Namecheap**: https://ap.www.namecheap.com/domains/domaincontrolpanel/pyrax.io/advancedns
- **Google Domains**: https://domains.google.com/registrar/pyrax.io/dns
- **Bluehost**: cPanel → Domains → Zone Editor

### 2. Add DNS Records in Render First

1. Go to your Render dashboard: https://dashboard.render.com
2. Open your `pyrax-portal` web service
3. Click "Settings" in the sidebar
4. Scroll to "Custom Domains"
5. Click "Add Custom Domain"
6. Enter: `pyrax.io`
7. Click "Verify"

**Render will show you the exact DNS records you need to add**

It will look something like this:

```
A Record:
Name: @
Value: 216.24.57.1

CNAME Record:
Name: www
Value: pyrax-portal.onrender.com
```

### 3. Add DNS Records to Your Domain

Go back to your DNS management panel and add these records:

#### For Main Domain (pyrax.io):

```
Record Type: A
Host/Name: @ (or leave blank, or "pyrax.io" depending on your provider)
Value/Points to: [The IP address Render provided]
TTL: 3600 (or Auto)
```

#### For WWW Subdomain (www.pyrax.io):

```
Record Type: CNAME
Host/Name: www
Value/Points to: pyrax-portal.onrender.com
TTL: 3600 (or Auto)
```

### 4. Remove Conflicting Records (Important!)

Before adding new records, check if there are existing records for:
- A record for `@` or `pyrax.io`
- CNAME for `www`

**Delete or disable these old records** before adding the new ones.

### 5. Save and Wait

1. Save your DNS changes
2. Wait for propagation (usually 1-4 hours, can take up to 48 hours)
3. Check status at: https://dnschecker.org
   - Enter `pyrax.io`
   - Should show Render's IP address

### 6. Verify in Render

1. Go back to Render dashboard
2. In Custom Domains section, you should see:
   - `pyrax.io` - Status: "Pending" → "Verified"
3. Once verified, Render will automatically provision SSL certificate
4. After 5-15 minutes, status should show "Certificate Issued"

### 7. Test Your Site

Visit these URLs:
- https://pyrax.io ✅
- https://www.pyrax.io ✅
- http://pyrax.io (should redirect to https)

---

## Common DNS Provider Instructions

### GoDaddy

1. Login to https://account.godaddy.com
2. Go to "My Products"
3. Next to "Domains", click "DNS"
4. Click "Manage" next to pyrax.io
5. Scroll to "Records"
6. Click "Add" for each record
7. Select type (A or CNAME)
8. Fill in values
9. Save

### Namecheap

1. Login to https://www.namecheap.com
2. Go to "Domain List"
3. Click "Manage" next to pyrax.io
4. Go to "Advanced DNS" tab
5. Click "Add New Record"
6. Select type and fill values
7. Save changes

### Bluehost

1. Login to Bluehost control panel
2. Go to "Domains" → "Zone Editor"
3. Select pyrax.io
4. Click "A Record" or "CNAME Record"
5. Fill in the details
6. Click "Add Record"

### WordPress.com (if domain is there)

1. Login to https://wordpress.com
2. Go to "My Site" → "Upgrades" → "Domains"
3. Click on pyrax.io
4. Click "DNS Records"
5. Add A and CNAME records
6. Save

---

## Troubleshooting

### "Domain is already in use"
- The domain might be pointed elsewhere
- Remove old DNS records first
- Wait 1 hour and try again

### DNS not propagating
- Can take up to 48 hours
- Check at https://dnschecker.org
- Try different DNS servers: `8.8.8.8` (Google) or `1.1.1.1` (Cloudflare)

### SSL certificate not issued
- Make sure DNS is fully propagated
- Can take 15 minutes to 1 hour after DNS is verified
- Check Render dashboard for status

### Site shows "Not Secure" or certificate error
- Wait for SSL to finish provisioning
- Clear browser cache
- Try incognito/private browsing mode

### Still showing old content
- Clear browser cache (Ctrl + Shift + R or Cmd + Shift + R)
- DNS might still be propagating
- Check if you're seeing cached content

---

## Alternative: Use Cloudflare (Recommended)

For better performance and security, you can use Cloudflare as your DNS provider:

1. Go to https://cloudflare.com and create free account
2. Add your domain `pyrax.io`
3. Cloudflare will scan your current DNS records
4. Update nameservers at your domain registrar to Cloudflare's nameservers
5. In Cloudflare DNS settings, add the Render records
6. Enable proxy (orange cloud) for better performance
7. Free SSL, DDoS protection, and caching included

Benefits:
- Faster DNS propagation
- Better security
- Free CDN
- Analytics
- DDoS protection

---

## Quick Check Commands

```bash
# Check if DNS is pointing to Render
nslookup pyrax.io

# Check CNAME for www
nslookup www.pyrax.io

# Check from multiple locations
# Visit: https://dnschecker.org

# Test SSL certificate
# Visit: https://www.ssllabs.com/ssltest/analyze.html?d=pyrax.io
```

---

## Timeline

| Step | Time |
|------|------|
| Add DNS records | 5 minutes |
| DNS propagation | 1-4 hours (up to 48h) |
| SSL certificate | 15 minutes after DNS |
| **Total** | **2-5 hours typically** |

---

## Need Help?

If you're stuck:
1. Screenshot your DNS settings
2. Check Render's custom domain status
3. Verify DNS with https://dnschecker.org
4. Wait a bit longer (DNS can be slow)

The most common issue is DNS propagation time - be patient! ⏰

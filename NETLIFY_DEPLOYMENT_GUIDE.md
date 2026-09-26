# 👑 The Maharashtra King — Netlify Deployment Guide

This repository is already pre-configured for Netlify with:
- `netlify.toml` (auto-detects build command `npm run build` and publish directory `dist`)
- `public/_redirects` (ensures Single Page Application routing works with 0 routing errors / no 404 on refresh)
- Node.js 20 LTS runtime configuration
- Asset cache headers for lightning-fast image and font delivery

---

## Method 1: Deploy with Git & GitHub (Recommended — Auto-Updates on Every Commit)

This is the best method because whenever you or your client edit menu prices, phone numbers, or text, Netlify automatically redeploys in seconds.

### Step 1: Push Code to GitHub
If you haven't already pushed to GitHub:
```bash
git init
git add .
git commit -m "Initial commit for The Maharashtra King"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/the-maharashtra-king.git
git push -u origin main
```

### Step 2: Connect GitHub in Netlify
1. Log in to [Netlify.com](https://app.netlify.com).
2. Click the **"Add new site"** button at the top right, then select **"Import an existing project"**.
3. Choose **GitHub** (authorize Netlify if prompted).
4. Select your repository: `the-maharashtra-king`.

### Step 3: Verify Build Settings (Auto-Detected)
Netlify reads your `netlify.toml` and will automatically populate:
- **Base directory**: (leave empty or `.`)
- **Build command**: `npm run build`
- **Publish directory**: `dist`

### Step 4: Environment Variables (Optional)
If you have any environment variables:
1. Click **"Add environment variables"**.
2. Add:
   - `NODE_VERSION`: `20`
   - `APP_URL`: Your live website URL (e.g., `https://themaharashtraking.com` or your Netlify subdomain).
   - Any other variables from `.env.example`.

### Step 5: Click "Deploy The Maharashtra King"
Netlify will build the application in under 45 seconds and give you a live URL like:
`https://the-maharashtra-king.netlify.app`

---

## Method 2: Instant Drag-and-Drop (Netlify Drop — No Git Required)

If you just want to get the site live immediately without pushing code to GitHub:

### Step 1: Build the Project Locally
Run this in your terminal:
```bash
npm run build
```
This generates the optimized production folder named `dist`.

### Step 2: Drag and Drop to Netlify
1. Go to [app.netlify.com/drop](https://app.netlify.com/drop).
2. Drag the **`dist`** folder from your computer and drop it into the designated upload area on the screen.
3. Your site goes live instantly with an HTTPS address!

---

## Method 3: Deploy via Netlify CLI

If you prefer terminal commands:
```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login to your account
netlify login

# 3. Initialize and deploy
netlify init

# 4. Deploy production build
netlify deploy --prod
```

---

## How to Connect Your Client's Custom Domain (e.g. `themaharashtraking.com`)

1. In your Netlify site dashboard, go to **Site configuration** ➔ **Domain management**.
2. Click **"Add a domain"** and enter the client's custom domain (e.g. `themaharashtraking.com`).
3. Netlify will show you the exact DNS records to enter into GoDaddy, Hostinger, Namecheap, etc.:
   - **Apex domain (`@`)**: Point to Netlify load balancer `75.2.60.5` (or use Netlify DNS nameservers).
   - **Subdomain (`www`)**: Add a `CNAME` pointing to `your-site-name.netlify.app`.
4. Netlify will automatically generate and renew a **free Let's Encrypt SSL (HTTPS)** certificate.

---

## Troubleshooting Common Issues

1. **Page reload gives 404**:
   - Fixed! The repository contains `netlify.toml` and `public/_redirects` which route all traffic to `/index.html`.
2. **Build fails due to Node version**:
   - Fixed! `netlify.toml` specifies `NODE_VERSION = "20"`.
3. **Menu edits not reflecting**:
   - Edit `src/data/restaurantData.ts`, commit and push to Git. Netlify will trigger a new build automatically.

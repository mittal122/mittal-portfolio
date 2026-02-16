# 🚀 DEPLOYMENT GUIDE - Quick Start

## Step 1: Initialize Git Repository

Open terminal/PowerShell in the project folder and run:

```bash
git init
git add .
git commit -m "Initial commit: Clean portfolio website ready for deployment"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com
2. Click "New Repository"
3. Name it: `portfolio-website` (or any name you prefer)
4. Do NOT initialize with README (we already have one)
5. Click "Create Repository"

## Step 3: Link and Push to GitHub

Copy the commands from GitHub (will look like this):

```bash
git remote add origin https://github.com/YOUR-USERNAME/portfolio-website.git
git branch -M main
git push -u origin main
```

## Step 4: Deploy to Vercel

### Option A: Vercel Dashboard (Recommended)

1. Go to https://vercel.com
2. Click "Add New..." → "Project"
3. Import your GitHub repository
4. Vercel will auto-detect:
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Click "Deploy"
6. Wait 1-2 minutes
7. Your site is live! 🎉

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Step 5: Configure Custom Domain (Optional)

1. In Vercel Dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## ✅ Project Structure Verification

Your clean project should have:
- ✅ .gitignore (proper ignores)
- ✅ vercel.json (Vercel config)
- ✅ README.md (documentation)
- ✅ Clean index.html (no Hostinger code)
- ✅ No @fs, @vite, plugins folders
- ✅ No .jsxsourcemap files
- ✅ Production build works

## 🔧 Troubleshooting

### If build fails:
```bash
npm install
npm run build
```

### If Git push fails:
```bash
git remote -v  # Check if remote is set
git pull origin main --allow-unrelated-histories
git push -u origin main
```

### If Vercel detects wrong framework:
- Go to Project Settings → "Build & Development Settings"
- Framework Preset: Choose "Vite"
- Build Command: `npm run build`
- Output Directory: `dist`

## 📝 Important Notes

- The .gitignore file excludes node_modules, dist, and development files
- Vercel will run `npm install` and `npm run build` automatically
- Your environment variables should be added in Vercel Dashboard (Settings → Environment Variables)
- The site supports SPA routing with the vercel.json configuration

## 🎨 Post-Deployment

After deployment, you can:
1. Update content by editing files locally
2. Commit and push changes: `git add . && git commit -m "Update" && git push`
3. Vercel will automatically redeploy (takes 1-2 minutes)

## 📞 Need Help?

- Vercel Docs: https://vercel.com/docs
- GitHub Docs: https://docs.github.com
- Vite Docs: https://vitejs.dev

---
Your portfolio is now production-ready! 🚀

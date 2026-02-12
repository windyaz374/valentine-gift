# Deployment Guide for Valentine's Day Web App

## Prerequisites
- GitHub account
- Git installed on your computer
- Node.js 18+ installed

## Step 1: Initialize Git Repository (if not already done)

```bash
cd /Users/tule/repo/valentine-gift
git init
git add .
git commit -m "Initial commit: Valentine's Day web app"
```

## Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `valentine-gift` (or your preferred name)
3. Keep it Public
4. Don't initialize with README (we already have one)
5. Click "Create repository"

## Step 3: Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/valentine-gift.git

# Push your code
git branch -M main
git push -u origin main
```

## Step 4: Configure GitHub Pages

### Option A: Using GitHub Actions (Recommended)

1. Go to your repository on GitHub
2. Click on **Settings** tab
3. Click on **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The deployment workflow is already configured in `.github/workflows/deploy.yml`
6. Every push to main branch will automatically deploy your site!
7. Your site will be available at: `https://YOUR_USERNAME.github.io/valentine-gift/`

### Option B: Manual Deployment

```bash
# Install gh-pages package
npm install -D gh-pages

# Deploy to GitHub Pages
npm run deploy
```

Then configure GitHub Pages:
1. Go to repository **Settings** > **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Select **gh-pages** branch
4. Click **Save**

## Step 5: Update Base Path (if needed)

If your repository name is different from `valentine-gift`, update `vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  base: '/YOUR-REPO-NAME/', // Update this
})
```

## Step 6: Customize Your App

### Update Predefined Answers
Edit `src/components/SecretLovePath.jsx` around line 19:

```javascript
const myAnswers = {
  moment: "Your special moment here...",
  reason: "Your reason here...",
  target: "Your 2026 target here..."
};
```

### Change Wheel Options
Edit `src/components/SurpriseWheel.jsx` around line 8:

```javascript
const options = [
  'Romantic Dinner',
  'Watch a Movie',
  'Your Custom Option 1',
  'Your Custom Option 2',
  'Your Custom Option 3'
];
```

### Update Cupid Messages
Edit `src/components/Cupid.jsx` around line 9:

```javascript
const messages = [
  "Your custom message 1",
  "Your custom message 2",
  // Add more...
];
```

## Troubleshooting

### Issue: Site shows 404 or blank page
**Solution**: Make sure the `base` path in `vite.config.js` matches your repository name

### Issue: GitHub Actions workflow fails
**Solution**: 
- Check that GitHub Actions is enabled in your repository settings
- Make sure you have the correct permissions set

### Issue: Assets not loading
**Solution**: All assets should be in the `public` folder or imported in components

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Important Notes

1. **Custom Domain**: You can add a custom domain in GitHub Pages settings
2. **HTTPS**: GitHub Pages automatically provides HTTPS
3. **Updates**: Just push to main branch to update your site (with GitHub Actions)
4. **Build Time**: It may take 1-2 minutes for changes to appear after deployment

## Verification

After deployment, check:
- [ ] Countdown timer is working
- [ ] Love message can be sent and saved
- [ ] Wheel spins and shows results
- [ ] Cupid appears and shows messages when clicked
- [ ] Secret Love Path game works through all steps
- [ ] Mobile responsive layout works

## Support

If you encounter issues:
1. Check the GitHub Actions logs in the "Actions" tab
2. Verify all paths in `vite.config.js`
3. Make sure all dependencies are installed
4. Check browser console for errors

---

Made with ❤️ for a special Valentine!

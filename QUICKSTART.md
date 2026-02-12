# Quick Start Guide 🚀

## Welcome to Your Valentine's Day Web App!

This is a complete, ready-to-deploy romantic web application. Follow these steps to get it running!

## 🎯 In 3 Minutes or Less

### Step 1: View Locally (30 seconds)
The dev server should already be running at: http://localhost:5173/valentine-gift/

If not, run:
```bash
npm run dev
```

### Step 2: Customize (2 minutes)

Open these files to personalize:

**1. Your Secret Answers** - `src/components/SecretLovePath.jsx` (Line 19)
```javascript
const myAnswers = {
  moment: "Write your special moment here",
  reason: "Write why you love them here",
  target: "Write your 2026 goal here"
};
```

**2. Date Ideas** - `src/components/SurpriseWheel.jsx` (Line 8)
```javascript
const options = [
  'Romantic Dinner',
  'Movie Night',
  'Your idea',
  'Another idea',
  'More ideas'
];
```

**3. Cupid Messages** - `src/components/Cupid.jsx` (Line 9)
```javascript
const messages = [
  "Your sweet message",
  "Another message",
  // Add more
];
```

### Step 3: Deploy to GitHub Pages (30 seconds)

See detailed instructions in `DEPLOYMENT.md`, but here's the summary:

```bash
# Create a new repo on GitHub called 'valentine-gift'

# Then run:
git init
git add .
git commit -m "My Valentine's gift"
git remote add origin https://github.com/YOUR_USERNAME/valentine-gift.git
git push -u origin main

# Enable GitHub Pages in repo Settings > Pages > Source: GitHub Actions
```

Your site will be live at: `https://YOUR_USERNAME.github.io/valentine-gift/`

## ✨ What's Included

- ✅ Countdown to Valentine's Day (Feb 14)
- ✅ Love Message with envelope animation
- ✅ Spinning wheel for date ideas
- ✅ Hidden Cupid easter egg (click it!)
- ✅ Memory snapshot polaroid
- ✅ Secret Love Path game (3 questions)
- ✅ Fully mobile responsive
- ✅ Beautiful animations
- ✅ LocalStorage support
- ✅ GitHub Pages ready

## 🎨 Features Overview

### Countdown Timer
Shows days, hours, and minutes until Valentine's Day. When it reaches zero, confetti appears!

### Love Message
Write a romantic message that gets displayed in a beautiful animated envelope.

### Surprise Wheel
Spin to get random date night ideas. Customize the options to your preferences!

### Cupid Easter Egg
A floating cupid appears on the page. Click it to see romantic/funny messages!

### Memory Snapshot
A polaroid-style photo frame. You can replace the placeholder with your own image.

### Secret Love Path Game
Answer 3 questions:
1. Most Memorable Moment
2. Why I Love You
3. Our Target in 2026

After completing all questions, unlock the reveal to see both your answers and the predefined answers side by side!

## 🛠 Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run deploy   # Deploy to GitHub Pages (after setup)
```

## 📱 Mobile Friendly

The app is fully responsive and works beautifully on:
- 📱 Phones
- 📱 Tablets
- 💻 Desktops
- 🖥 Large screens

## 🎁 Tips

1. **Test First**: Click around and test all features locally before deploying
2. **Personalize**: Change the predefined answers to make it special
3. **Add Photo**: Replace the heart icon in Memory Snapshot with a real photo
4. **Share**: Send the link to your special someone on Valentine's Day!

## ❤️ Have Fun!

This app is designed to be a fun, interactive Valentine's Day experience. Enjoy customizing it and sharing it with someone special!

---

Need help? Check `DEPLOYMENT.md` for detailed deployment instructions or `README.md` for full documentation.

# Valentine's Day Web App 💕

A romantic Valentine's Day web application built with React and Vite, designed for a special someone!

## Features

- **Countdown Timer** - Count down to Valentine's Day with real-time updates
- **Love Message** - Send and store romantic messages with a beautiful envelope UI
- **Surprise Wheel** - Spin the wheel to get date night ideas
- **Cupid Easter Egg** - Interactive floating cupid with surprise messages
- **Memory Snapshot** - Display special moments in a polaroid-style frame
- **Secret Love Path Game** - Answer 3 romantic questions and reveal both answers together

## Tech Stack

- React 19
- Vite 7
- CSS Animations
- LocalStorage for data persistence

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

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

## Deployment to GitHub Pages

### Option 1: Automatic Deployment (GitHub Actions)

The project includes a GitHub Actions workflow that automatically deploys to GitHub Pages on every push to the main branch.

1. Push your code to GitHub
2. Go to your repository Settings > Pages
3. Set Source to "GitHub Actions"
4. The site will be automatically deployed at `https://yourusername.github.io/valentine-gift/`

### Option 2: Manual Deployment

```bash
# Install gh-pages
npm install -D gh-pages

# Deploy to GitHub Pages
npm run deploy
```

### Configuration

Before deploying, update the `base` path in `vite.config.js`:

```javascript
export default defineConfig({
  base: '/your-repo-name/', // Replace with your repository name
})
```

## Customization

### Change Predefined Answers

Edit the `myAnswers` object in `src/components/SecretLovePath.jsx`:

```javascript
const myAnswers = {
  moment: "Your special moment...",
  reason: "Your reason...",
  target: "Your target..."
};
```

### Customize Wheel Options

Edit the `options` array in `src/components/SurpriseWheel.jsx`:

```javascript
const options = [
  'Romantic Dinner',
  'Movie Night',
  'Your custom option',
  // Add more options
];
```

### Change Cupid Messages

Edit the `messages` array in `src/components/Cupid.jsx`

## Project Structure

```
valentine-gift/
├── src/
│   ├── components/
│   │   ├── Countdown.jsx
│   │   ├── Countdown.css
│   │   ├── LoveMessage.jsx
│   │   ├── LoveMessage.css
│   │   ├── SurpriseWheel.jsx
│   │   ├── SurpriseWheel.css
│   │   ├── Cupid.jsx
│   │   ├── Cupid.css
│   │   ├── MemorySnapshot.jsx
│   │   ├── MemorySnapshot.css
│   │   ├── SecretLovePath.jsx
│   │   └── SecretLovePath.css
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── public/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── index.html
├── package.json
└── vite.config.js
```

## Features Details

### 1. Countdown to Valentine's Day
- Real-time countdown showing days, hours, and minutes
- Celebration animation when countdown reaches zero
- Fully responsive design

### 2. Love Message
- Write and save romantic messages
- Beautiful envelope animation
- Messages stored in localStorage
- Edit functionality

### 3. Surprise Wheel
- Interactive spinning wheel
- 5 predefined date ideas
- Smooth CSS animations
- Result display after spinning

### 4. Cupid Easter Egg
- Floating cupid that appears randomly
- Click to reveal romantic/funny messages
- 6 different messages to discover

### 5. Memory Snapshot
- Polaroid-style photo frame
- Placeholder for adding your own image
- Hover effects and animations

### 6. Secret Love Path Game
- 3 progressive questions:
  - Most Memorable Moment
  - Why I Love You
  - Our Target in 2026
- Answer all questions to unlock
- Reveals both user and predefined answers
- Smooth fade-in animations
- Progress tracking

## Mobile Friendly

The app is fully responsive and optimized for mobile devices with:
- Responsive layouts
- Touch-friendly interactions
- Optimized font sizes
- Smooth mobile animations

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

## Made with ❤️

Created as a special Valentine's Day gift!

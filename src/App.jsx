import { useState, useEffect, useRef } from 'react';
import './App.css';
import Countdown from './components/Countdown';
import LoveMessage from './components/LoveMessage';
import SurpriseWheel from './components/SurpriseWheel';
import Cupid from './components/Cupid';
import MemorySnapshot from './components/MemorySnapshot';
import SecretLovePath from './components/SecretLovePath';

function App() {
  const [currentStep, setCurrentStep] = useState(0); // 0: countdown, 1: love message, 2: wheel, 3: memory, 4: game
  const [isValentineDay, setIsValentineDay] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(true);
  
  const countdownMusicRef = useRef(null);
  const valentineMusicRef = useRef(null);
  const musicInitializedRef = useRef(false);
  const lastValentineStateRef = useRef(false);

  // Check if it's Valentine's Day
  useEffect(() => {
    const checkValentineDay = () => {
      const valentineDay = new Date('2026-02-14T00:00:00');
      const now = new Date();
      return now >= valentineDay;
    };

    const isValentine = checkValentineDay();
    setIsValentineDay(isValentine);

    // Reset journey on page load - user must click "Let's Go" again
    localStorage.removeItem('valentineStep');
    localStorage.removeItem('memoryImage');
    setCurrentStep(0);

    const timer = setInterval(() => {
      const isValentine = checkValentineDay();
      setIsValentineDay(isValentine);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Initialize music on mount
  useEffect(() => {
    const countdownMusic = countdownMusicRef.current;
    const valentineMusic = valentineMusicRef.current;

    if (!musicInitializedRef.current && countdownMusic && valentineMusic) {
      musicInitializedRef.current = true;
      
      // Auto-play countdown music on load
      if (!isValentineDay) {
        countdownMusic.play().catch(err => {
          console.log('Auto-play blocked, click anywhere to start music:', err);
        });
      } else {
        valentineMusic.play().catch(err => {
          console.log('Auto-play blocked, click anywhere to start music:', err);
        });
      }
    }
  }, [isValentineDay]);

  // Handle background music switching
  useEffect(() => {
    const countdownMusic = countdownMusicRef.current;
    const valentineMusic = valentineMusicRef.current;

    if (!musicInitializedRef.current || !isMusicPlaying) return;
    
    // Only switch if Valentine state actually changed
    if (lastValentineStateRef.current === isValentineDay) return;
    lastValentineStateRef.current = isValentineDay;

    if (isValentineDay) {
      // Switch to Valentine music
      if (countdownMusic && !countdownMusic.paused) {
        countdownMusic.pause();
      }
      if (valentineMusic) {
        valentineMusic.play().catch(err => console.log('Music play failed:', err));
      }
    } else {
      // Play countdown music
      if (valentineMusic && !valentineMusic.paused) {
        valentineMusic.pause();
      }
      if (countdownMusic) {
        countdownMusic.play().catch(err => console.log('Music play failed:', err));
      }
    }
  }, [isValentineDay, isMusicPlaying]);

  const toggleMusic = () => {
    const countdownMusic = countdownMusicRef.current;
    const valentineMusic = valentineMusicRef.current;
    
    if (isMusicPlaying) {
      countdownMusic?.pause();
      valentineMusic?.pause();
    } else {
      if (isValentineDay) {
        valentineMusic?.play().catch(err => console.log('Music play failed:', err));
      } else {
        countdownMusic?.play().catch(err => console.log('Music play failed:', err));
      }
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  const handleCountdownComplete = () => {
    setIsValentineDay(true);
  };

  const handleStartJourney = () => {
    setCurrentStep(1);
    localStorage.setItem('valentineStep', '1');
  };

  const handleFeatureComplete = () => {
    setCurrentStep(prev => {
      const nextStep = prev + 1;
      localStorage.setItem('valentineStep', nextStep.toString());
      return nextStep;
    });
  };

  const handleAppClick = () => {
    // Fallback: If music hasn't started due to auto-play restrictions, start it on first click
    const countdownMusic = countdownMusicRef.current;
    const valentineMusic = valentineMusicRef.current;
    
    if (isMusicPlaying) {
      if (isValentineDay && valentineMusic && valentineMusic.paused) {
        valentineMusic.play().catch(err => console.log('Music play failed:', err));
      } else if (!isValentineDay && countdownMusic && countdownMusic.paused) {
        countdownMusic.play().catch(err => console.log('Music play failed:', err));
      }
    }
  };

  return (
    <div className="app" onClick={handleAppClick}>
      {/* Audio elements */}
      <audio ref={countdownMusicRef} loop>
        <source src="/valentine-gift/background_music.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={valentineMusicRef} loop>
        <source src="/valentine-gift/valentine_music.mp3" type="audio/mpeg" />
      </audio>

      {/* Music toggle button */}
      <button 
        className="music-toggle" 
        onClick={(e) => {
          e.stopPropagation();
          toggleMusic();
        }} 
        title={isMusicPlaying ? "Mute Music" : "Play Music"}
      >
        {isMusicPlaying ? '🔊' : '🔇'}
      </button>

      {/* Floating Cupid Easter Egg - only shows messages when Valentine's Day */}
      <Cupid isActive={isValentineDay} />
      
      {/* Main Content */}
      <div className="container">
        {/* Countdown Section - Always visible */}
        <Countdown 
          onComplete={handleCountdownComplete} 
          onStartJourney={handleStartJourney}
        />
        
        {/* Features appear sequentially */}
        {currentStep >= 1 && <LoveMessage onComplete={handleFeatureComplete} />}
        {currentStep >= 2 && <SurpriseWheel onComplete={handleFeatureComplete} />}
        {currentStep >= 3 && <MemorySnapshot onComplete={handleFeatureComplete} />}
        {currentStep >= 4 && <SecretLovePath />}
      </div>
    </div>
  );
}

export default App;

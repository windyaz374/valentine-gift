import { useState, useEffect } from 'react';
import './Countdown.css';

const Countdown = ({ onComplete, onStartJourney }) => {
  const DEV_PASSWORD = '14022026';
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isValentine: false
  });
  const [testMode, setTestMode] = useState(false);
  const [testSeconds, setTestSeconds] = useState(10);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [showTimeSetup, setShowTimeSetup] = useState(false);
  const [tempTestSeconds, setTempTestSeconds] = useState(10);
  const [journeyStarted, setJourneyStarted] = useState(false);

  // Reset to realtime mode on page load
  useEffect(() => {
    localStorage.removeItem('testCountdownStart');
    setTestMode(false);
    setJourneyStarted(false);
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (testMode) {
        // Test mode: countdown from set seconds
        const storedStartTime = localStorage.getItem('testCountdownStart');
        let startTime;
        
        if (!storedStartTime) {
          startTime = new Date().getTime();
          localStorage.setItem('testCountdownStart', startTime);
        } else {
          startTime = parseInt(storedStartTime);
        }
        
        const targetTime = startTime + (testSeconds * 1000);
        const now = new Date().getTime();
        const difference = targetTime - now;

        if (difference > 0) {
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: Math.floor(difference / 1000),
            isValentine: false
          };
        } else {
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isValentine: true
          };
        }
      } else {
        // Real mode: countdown to Valentine's Day
        const valentineDay = new Date('2026-02-14T00:00:00');
        const now = new Date();
        const difference = valentineDay - now;

        if (difference > 0) {
          return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            isValentine: false
          };
        } else {
          return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            isValentine: true
          };
        }
      }
    };

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      // Trigger onComplete when countdown reaches 0
      if (newTimeLeft.isValentine && onComplete) {
        onComplete();
      }
    }, 1000);

    const initialTime = calculateTimeLeft();
    setTimeLeft(initialTime);
    
    // Call onComplete immediately if already Valentine's Day
    if (initialTime.isValentine && onComplete) {
      onComplete();
    }

    return () => clearInterval(timer);
  }, [onComplete, testMode, testSeconds]);

  const handleTestModeToggle = () => {
    if (!testMode) {
      // Switching to test mode - require password
      setShowPasswordPrompt(true);
    } else {
      // Switching back to normal mode - no password needed
      localStorage.removeItem('testCountdownStart');
      setTestMode(false);
    }
  };

  const handlePasswordSubmit = () => {
    if (passwordInput === DEV_PASSWORD) {
      setShowPasswordPrompt(false);
      setPasswordInput('');
      setShowTimeSetup(true);
    } else {
      alert('Incorrect password!');
      setPasswordInput('');
    }
  };

  const handlePasswordCancel = () => {
    setShowPasswordPrompt(false);
    setPasswordInput('');
  };

  const handlePasswordKeyPress = (e) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    } else if (e.key === 'Escape') {
      handlePasswordCancel();
    }
  };

  const handleApplyTestTime = () => {
    localStorage.removeItem('testCountdownStart');
    setTestSeconds(tempTestSeconds);
    setTestMode(true);
    setShowTimeSetup(false);
  };

  const handleCancelTimeSetup = () => {
    setShowTimeSetup(false);
    setTempTestSeconds(10);
  };

  const handleTimeSetupKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleApplyTestTime();
    } else if (e.key === 'Escape') {
      handleCancelTimeSetup();
    }
  };

  return (
    <div className="countdown-section">
      {/* Developer Test Button */}
      <div className="dev-test-controls">
        <button 
          className="dev-test-button"
          onClick={handleTestModeToggle}
          title="Developer Test Mode"
        >
          {testMode ? '🔧' : '⚙️'}
        </button>
        {testMode && (
          <div className="test-mode-panel">
            <span className="test-mode-label">Test Mode: {testSeconds}s</span>
          </div>
        )}
      </div>

      {/* Password Prompt Modal */}
      {showPasswordPrompt && (
        <div className="password-modal-overlay">
          <div className="password-modal">
            <h3 className="password-modal-title">Developer Access</h3>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              onKeyDown={handlePasswordKeyPress}
              placeholder="Enter password"
              className="password-input"
              autoFocus
            />
            <div className="password-modal-buttons">
              <button onClick={handlePasswordSubmit} className="password-btn confirm-btn">
                Confirm
              </button>
              <button onClick={handlePasswordCancel} className="password-btn cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Time Setup Modal */}
      {showTimeSetup && (
        <div className="password-modal-overlay">
          <div className="password-modal">
            <h3 className="password-modal-title">Set Test Duration</h3>
            <input
              type="number"
              value={tempTestSeconds}
              onChange={(e) => setTempTestSeconds(parseInt(e.target.value) || 10)}
              onKeyDown={handleTimeSetupKeyPress}
              placeholder="Seconds"
              className="password-input"
              autoFocus
              min="5"
              max="3600"
            />
            <div className="password-modal-buttons">
              <button onClick={handleApplyTestTime} className="password-btn confirm-btn">
                Apply
              </button>
              <button onClick={handleCancelTimeSetup} className="password-btn cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {!timeLeft.isValentine && (
        <h1 className="countdown-title">Countdown to Valentine's Day!</h1>
      )}
      
      {!timeLeft.isValentine ? (
        <div className="countdown-display">
          <div className="countdown-card">
            <div className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</div>
            <div className="countdown-label">Days</div>
          </div>
          <div className="countdown-card">
            <div className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</div>
            <div className="countdown-label">Hours</div>
          </div>
          <div className="countdown-card">
            <div className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</div>
            <div className="countdown-label">Minutes</div>
          </div>
          <div className="countdown-card">
            <div className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</div>
            <div className="countdown-label">Seconds</div>
          </div>
        </div>
      ) : (
        <div className="celebration">
          {!journeyStarted && (
            <>
              {/* Happy Valentine's Day Text */}
              <h1 className="valentine-title">Happy Valentine's Day!</h1>
              
              {/* Main Fireworks Bursts */}
              <div className="fireworks-container">
                {[...Array(12)].map((_, i) => (
                  <div key={`burst-${i}`} className="firework-burst-container" style={{
                    left: `${20 + Math.random() * 60}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `3.6s`
                  }}>
                    {/* Rocket Trail */}
                    <div className="rocket-trail"></div>
                    {/* Burst Particles */}
                    {[...Array(8)].map((_, j) => (
                      <div key={`particle-${j}`} className="burst-particle" style={{
                        '--angle': `${j * 45}deg`,
                        '--distance': `${80 + Math.random() * 30}px`,
                        backgroundColor: ['#ff1493', '#ff69b4', '#ffd700', '#ffff00', '#fff'][Math.floor(Math.random() * 5)],
                        animationDelay: 'inherit'
                      }}></div>
                    ))}
                  </div>
                ))}
              </div>
              
              {/* Secondary Sparkles */}
              <div className="sparkles-container">
                {[...Array(40)].map((_, i) => (
                  <div key={`sparkle-${i}`} className="sparkle" style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.09}s`,
                    animationDuration: `3.6s`,
                    '--spark-color': ['#ffd700', '#ffff00', '#ffffff'][Math.floor(Math.random() * 3)]
                  }}></div>
                ))}
              </div>
              
              {/* Glowing Particles Rising */}
              <div className="glow-particles">
                {[...Array(25)].map((_, i) => (
                  <div key={`glow-${i}`} className="glow-particle" style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `5s`,
                    backgroundColor: ['#ff69b4', '#ffd700'][Math.floor(Math.random() * 2)]
                  }}></div>
                ))}
              </div>
              
              {/* Falling Confetti */}
              <div className="confetti-rain">
                {[...Array(30)].map((_, i) => (
                  <div key={`conf-${i}`} className="confetti-drop" style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `6s`,
                    width: `${8 + Math.random() * 4}px`,
                    height: `${8 + Math.random() * 4}px`,
                    backgroundColor: ['#ff69b4', '#ffd700'][Math.floor(Math.random() * 2)]
                  }}></div>
                ))}
              </div>
              
              <button 
                className="lets-go-button"
                onClick={() => {
                  setJourneyStarted(true);
                  if (onStartJourney) onStartJourney();
                }}
              >
                Let's Go! 💕
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Countdown;

import { useState } from 'react';
import './LoveMessage.css';

const LoveMessage = ({ onComplete }) => {
  const [opened, setOpened] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Predefined love message
  const loveMessage = `My Dearest Valentine,

Every moment with you feels like a beautiful dream come true. You are the sunshine that brightens my darkest days, the laughter that fills my heart with joy, and the love that makes every day worth living.

From the first time I saw you, I knew my life would never be the same. You've shown me what it means to truly love and be loved. Your smile, your kindness, your beautiful soul - everything about you makes me fall deeper in love every single day.

Thank you for being my partner, my best friend, and my forever Valentine. I can't wait to create a lifetime of beautiful memories with you.

Forever yours,
With all my love 💕`;

  const handleOpenMessage = () => {
    setOpened(true);
  };

  const handleCloseMessage = () => {
    setOpened(false);
    if (!completed) {
      setCompleted(true);
      if (onComplete) onComplete();
    }
  };

  return (
    <div className="love-message-section">
      {!opened ? (
        <div className="envelope-closed-container">
          <h2 className="section-title">Send a Love Message 💌</h2>
          
          {/* Floating hearts decoration */}
          <div className="floating-hearts-decoration">
            <span className="float-heart">💕</span>
            <span className="float-heart">💖</span>
            <span className="float-heart">💗</span>
          </div>
          
          <div className="envelope-closed" onClick={handleOpenMessage}>
            <div className="envelope-icon-wrapper">
              <div className="envelope-icon">💌</div>
              <div className="envelope-glow"></div>
              <div className="envelope-sparkles">
                <span className="sparkle">✨</span>
                <span className="sparkle">⭐</span>
                <span className="sparkle">💫</span>
                <span className="sparkle">✨</span>
              </div>
            </div>
            
            <div className="envelope-ribbon">🎀</div>
            
            <div className="envelope-closed-flap">
              <div className="flap-pattern"></div>
            </div>
            
            <div className="envelope-closed-body">
              <div className="heart-seal">
                <span className="heart-main">❤️</span>
                <span className="heart-shadow">💕</span>
              </div>
              <p className="envelope-label">Love Letter</p>
              <div className="envelope-decorations">
                <span className="deco">🌹</span>
                <span className="deco">💝</span>
                <span className="deco">🌹</span>
              </div>
            </div>
          </div>
          <p className="envelope-hint">👆 Click to open your love letter</p>
        </div>
      ) : (
        <div className="envelope-container">
          <h2 className="section-title">Your Love Message 💌</h2>
          <div className="envelope">
            <div className="envelope-flap"></div>
            <div className="envelope-body">
              <div className="letter">
                <p className="letter-text">{loveMessage}</p>
              </div>
            </div>
          </div>
          <button onClick={handleCloseMessage} className="edit-button">
            Close Message
          </button>
        </div>
      )}
    </div>
  );
};

export default LoveMessage;

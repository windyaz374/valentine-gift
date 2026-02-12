import { useState } from 'react';
import './Cupid.css';

// Single Cupid Component
const SingleCupid = ({ message, index, isActive }) => {
  const [clicked, setClicked] = useState(false);
  const [position] = useState({
    x: Math.random() * (window.innerWidth - 100),
    y: Math.random() * (window.innerHeight - 100)
  });

  const handleClick = () => {
    // Only show message if active (Valentine's Day)
    if (!clicked && isActive) {
      setClicked(true);

      setTimeout(() => {
        setClicked(false);
      }, 3000);
    }
  };

  return (
    <>
      <div 
        className="cupid"
        onClick={handleClick}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          animationDelay: `${index * 0.5}s`
        }}
      >
        <img 
          src="/valentine-gift/cupid.png" 
          alt="Cupid" 
          className={`cupid-icon ${clicked ? 'clicked' : ''}`}
        />
      </div>

      {clicked && (
        <div className="cupid-message">
          <div className="message-bubble">
            {message}
          </div>
        </div>
      )}
    </>
  );
};

// Main Cupid Container
const Cupid = ({ isActive = false }) => {
  const messages = [
    "You make my heart skip a beat! 💓",
    "Love you to the moon and back! 🌙",
    "You're my favorite notification! 📱",
    "My heart autocorrects 'hmm' to 'I love you' 😄",
    "You're the reason I smile at my phone! 📱💕",
    "Every love story is beautiful, but ours is my favorite! ❤️"
  ];

  return (
    <>
      {messages.map((message, index) => (
        <SingleCupid key={index} message={message} index={index} isActive={isActive} />
      ))}
    </>
  );
};

export default Cupid;

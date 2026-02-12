import { useState } from 'react';
import './SurpriseWheel.css';

const SurpriseWheel = ({ onComplete }) => {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState(false);

  const options = [
    { text: 'FUJIFILM CAMERA', emoji: '📷', color: '#FF69B4' },
    { text: '1 MACE OF GOLD', emoji: '🪙', color: '#8B5A3C' },
    { text: 'A MONTH OF NO CLEANING', emoji: '🧹', color: '#FFB6D9' },
    { text: '2KG OF CHERRIES', emoji: '🍒', color: '#FFD700' },
    { text: '1000 KISSES IN A WEEK', emoji: '💋', color: '#FFC1E3' },
    { text: 'COUPLE OF BAO-AO CUDDLE', emoji: '🧸', color: '#D2691E' }
  ];

  const handleSpin = () => {
    if (spinning) return;

    setSpinning(true);
    setResult('');

    // Random spins (5-10 full rotations) + random segment
    const spins = 5 + Math.floor(Math.random() * 5);
    const randomDegree = Math.floor(Math.random() * 360);
    const totalRotation = rotation + (spins * 360) + randomDegree;
    
    setRotation(totalRotation);

    setTimeout(() => {
      const normalizedRotation = totalRotation % 360;
      const segmentAngle = 360 / options.length;
      const selectedIndex = Math.floor((360 - normalizedRotation) / segmentAngle) % options.length;
      setResult(options[selectedIndex]);
      setSpinning(false);
      if (!completed) {
        setCompleted(true);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 2000);
      }
    }, 4000);
  };

  return (
    <div className="surprise-wheel-section">
      <h2 className="section-title">Spin for Your Valentine Gift! 🎁</h2>
      
      <div className="wheel-container">
        <div className="wheel-pointer">▼</div>
        <div 
          className={`wheel ${spinning ? 'spinning' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {options.map((option, index) => {
            const angle = 360 / options.length;
            return (
              <div
                key={index}
                className="wheel-segment"
                style={{
                  transform: `rotate(${angle * index}deg)`,
                  backgroundColor: option.color
                }}
              >
                <div className="wheel-text">
                  <span className="gift-emoji">{option.emoji}</span>
                  <span className="gift-text">{option.text}</span>
                </div>
              </div>
            );
          })}
          <div className="wheel-center">🎁</div>
        </div>
      </div>

      <button 
        onClick={handleSpin} 
        className="spin-button"
        disabled={spinning}
      >
        {spinning ? 'Spinning...' : 'Spin the Wheel!'}
      </button>

      {result && !spinning && (
        <div className="result-display">
          <p className="result-text">
            Your Valentine Gift: <strong>{result.emoji} {result.text}</strong> 💝
          </p>
        </div>
      )}
    </div>
  );
};

export default SurpriseWheel;

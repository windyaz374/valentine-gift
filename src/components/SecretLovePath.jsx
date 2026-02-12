import { useState, useEffect } from 'react';
import './SecretLovePath.css';

const SecretLovePath = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    moment: '',
    reason: '',
    target: ''
  });
  const [completed, setCompleted] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [revealStep, setRevealStep] = useState(0);

  // Predefined answers (hidden until unlock)
  const myAnswers = {
    moment: "Our first trip to Đà Lạt for your birthday. The atmosphere felt incredibly romantic, and we truly enjoyed every moment. ✨",
    reason: "You are a smart, capable girl who always puts in so much effort. Sometimes you can be a little difficult and a bit unreasonable, but I can handle that. Especially because being with you makes me feel truly happy 💫",
    target: "Save an additional 600 million VND or more. Strive to do well in my personal work. Spend more time going out, having fun, and truly enjoying life 🏡✈️"
  };

  const prompts = [
    { key: 'moment', label: 'Most Memorable Moment', placeholder: 'Share your favorite memory with me...' },
    { key: 'reason', label: 'Why I Love You', placeholder: 'Tell me what makes your heart flutter...' },
    { key: 'target', label: 'Our Target in 2026', placeholder: 'What do you dream for us this year...' }
  ];

  useEffect(() => {
    // Reset on page refresh - clear localStorage
    localStorage.removeItem('lovePath');
  }, []);

  const handleStartGame = () => {
    setGameStarted(true);
  };

  const handleInputChange = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (step < prompts.length - 1) {
      const newStep = step + 1;
      setStep(newStep);
      localStorage.setItem('lovePath', JSON.stringify({ answers, step: newStep, completed: false }));
    } else {
      setCompleted(true);
      localStorage.setItem('lovePath', JSON.stringify({ answers, step, completed: true }));
    }
  };

  const handleUnlock = () => {
    setRevealed(true);
    setRevealStep(0);
  };

  const handleNextReveal = () => {
    if (revealStep < prompts.length - 1) {
      setRevealStep(revealStep + 1);
    }
  };

  const handleReset = () => {
    setGameStarted(false);
    setStep(0);
    setAnswers({ moment: '', reason: '', target: '' });
    setCompleted(false);
    setRevealed(false);
    setRevealStep(0);
    localStorage.removeItem('lovePath');
  };

  // Show start screen if game hasn't started
  if (!gameStarted) {
    return (
      <div className="secret-love-path-section">
        <h2 className="section-title">Secret Valentine Game 🎮</h2>
        
        <div className="game-start-container">
          <div className="game-icon">💘</div>
          <h3 className="game-title">Unlock Our Love Story</h3>
          <button onClick={handleStartGame} className="start-game-button">
            🎮 Start Game
          </button>
        </div>
      </div>
    );
  }

  const currentPrompt = prompts[step];
  const currentAnswer = answers[currentPrompt.key];
  const isStepComplete = currentAnswer && currentAnswer.trim().length > 0;

  if (revealed) {
    const currentRevealPrompt = prompts[revealStep];
    const userAnswer = answers[currentRevealPrompt.key];
    const myAnswer = myAnswers[currentRevealPrompt.key];

    return (
      <div className="secret-love-path-section">
        <h2 className="section-title">💕 Our Love Path Together 💕</h2>
        
        <div className="reveal-container">
          <div className="reveal-step">
            <h3 className="reveal-prompt">{currentRevealPrompt.label}</h3>
            
            <div className="reveal-answer user-answer">
              <h4>Your Answer:</h4>
              <p className="fade-in">{userAnswer}</p>
            </div>

            <div className="reveal-answer my-answer">
              <h4>My Answer:</h4>
              <p className="fade-in delay">{myAnswer}</p>
            </div>
          </div>

          <div className="reveal-navigation">
            {revealStep < prompts.length - 1 ? (
              <button onClick={handleNextReveal} className="reveal-button">
                Next Question →
              </button>
            ) : (
              <div className="final-message">
                <p className="final-text">Thank you for walking this love path with me! 💖</p>
                <button onClick={handleReset} className="reset-button">
                  Start Over
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (completed) {
    return (
      <div className="secret-love-path-section">
        <h2 className="section-title">Start Secret Valentine Game! 🎮</h2>
        
        <div className="completion-container">
          <div className="treasure-chest">
            <div className="chest-icon">🎁</div>
            <h3 className="completion-title">All Questions Answered!</h3>
            <p className="completion-subtitle">Ready to see what we both said?</p>
            
            <button onClick={handleUnlock} className="unlock-button">
              Walk the Love Path Together 💕
            </button>
            
            <button onClick={handleReset} className="reset-small-button">
              Edit Answers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="secret-love-path-section">
      <h2 className="section-title">Start Secret Valentine Game! 🎮</h2>
      
      <div className="progress-bar">
        {prompts.map((_, index) => (
          <div 
            key={index} 
            className={`progress-dot ${index <= step ? 'active' : ''} ${index < step ? 'completed' : ''}`}
          ></div>
        ))}
      </div>

      <div className="question-container">
        <h3 className="question-title">{currentPrompt.label}</h3>
        <p className="question-step">Question {step + 1} of {prompts.length}</p>
        
        <textarea
          className="question-input"
          placeholder={currentPrompt.placeholder}
          value={currentAnswer}
          onChange={(e) => handleInputChange(currentPrompt.key, e.target.value)}
          rows="5"
        />

        <button 
          onClick={handleNext}
          className="next-button"
          disabled={!isStepComplete}
        >
          {step < prompts.length - 1 ? 'Next Question →' : 'Complete ✓'}
        </button>
      </div>
    </div>
  );
};

export default SecretLovePath;

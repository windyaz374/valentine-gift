import { useState, useEffect } from 'react';
import './MemorySnapshot.css';

const MemorySnapshot = ({ onComplete }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [completed, setCompleted] = useState(false);

  // Load saved image from localStorage on mount
  useEffect(() => {
    const savedImage = localStorage.getItem('memoryImage');
    if (savedImage) {
      setUploadedImage(savedImage);
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setUploadedImage(imageData);
        localStorage.setItem('memoryImage', imageData);
        if (!completed) {
          setCompleted(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 1000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    localStorage.removeItem('memoryImage');
  };

  return (
    <div className="memory-snapshot-section">
      <h2 className="section-title">Our Beautiful Moment 📸</h2>
      
      <div className="polaroid">
        <div className="polaroid-image">
          {uploadedImage ? (
            <>
              <img src={uploadedImage} alt="Our Memory" className="uploaded-image" />
              <button onClick={handleRemoveImage} className="remove-image-btn" title="Remove image">
                ✕
              </button>
            </>
          ) : (
            <>
              <div className="placeholder-heart">
                ❤️
              </div>
              <p className="placeholder-text">Upload Your Beautiful Moment</p>
              <label htmlFor="image-upload" className="upload-button">
                📤 Choose Image
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="file-input"
              />
            </>
          )}
        </div>
        <div className="polaroid-caption">
          <p>Feb 14</p>
          <p className="caption-text">Forever in my heart 💕</p>
        </div>
      </div>
    </div>
  );
};

export default MemorySnapshot;

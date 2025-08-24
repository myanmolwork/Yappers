import React, { useState } from 'react';
import axios from 'axios';

function CreatePost({ onPostCreated }) {
  const [content, setContent] = useState('');
  const [image_url, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('https://yappers-yevm.onrender.com/api/posts', {
        content,
        image_url
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setContent('');
      setImageUrl('');
      onPostCreated();
    } catch (err) {
      alert('Failed to create post');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundElements}>
        <div style={styles.gradient1}></div>
        <div style={styles.gradient2}></div>
        <div style={styles.gradient3}></div>
      </div>
      
      <div style={styles.card}>
        <div style={styles.cardGlow}></div>
        
        <div style={styles.cardBody}>
          <h5 style={styles.cardTitle}>Create a Post 📝</h5>
          <form onSubmit={handleSubmit}>
            <div style={styles.inputGroup}>
              <textarea
                style={styles.textarea}
                rows="3"
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div style={styles.inputGroup}>
              <input
                type="url"
                style={styles.input}
                placeholder="Image URL (optional)"
                value={image_url}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
            <div style={styles.buttonContainer}>
              <button type="submit" style={styles.submitButton}>
                <span style={styles.buttonIcon}>✨</span>
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'relative',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
    padding: '40px 20px',
    overflow: 'hidden'
  },
  backgroundElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 0
  },
  gradient1: {
    position: 'absolute',
    top: '20%',
    left: '10%',
    width: '300px',
    height: '300px',
    background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 8s ease-in-out infinite'
  },
  gradient2: {
    position: 'absolute',
    top: '50%',
    right: '15%',
    width: '250px',
    height: '250px',
    background: 'radial-gradient(circle, rgba(255, 182, 193, 0.1) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 10s ease-in-out infinite reverse'
  },
  gradient3: {
    position: 'absolute',
    bottom: '20%',
    left: '30%',
    width: '200px',
    height: '200px',
    background: 'radial-gradient(circle, rgba(173, 216, 230, 0.08) 0%, transparent 70%)',
    borderRadius: '50%',
    animation: 'float 7s ease-in-out infinite'
  },
  card: {
    position: 'relative',
    maxWidth: '600px',
    margin: '0 auto',
    background: 'rgba(255, 255, 255, 0.12)',
    backdropFilter: 'blur(25px)',
    WebkitBackdropFilter: 'blur(25px)',
    border: '1px solid rgba(255, 255, 255, 0.18)',
    borderRadius: '24px',
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    zIndex: 1
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #ff6b9d, #4ecdc4, #667eea)',
    borderRadius: '24px 24px 0 0'
  },
  cardBody: {
    padding: '30px'
  },
  cardTitle: {
    fontSize: '24px',
    color: '#ffffff',
    fontWeight: '700',
    textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
    letterSpacing: '0.5px',
    marginBottom: '25px',
    background: 'linear-gradient(135deg, #ffffff, #f0f8ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textAlign: 'center'
  },
  inputGroup: {
    marginBottom: '20px'
  },
  textarea: {
    width: '100%',
    padding: '18px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '1.6',
    resize: 'vertical',
    minHeight: '120px',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit'
  },
  input: {
    width: '100%',
    padding: '18px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '16px',
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '400',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit'
  },
  buttonContainer: {
    display: 'grid'
  },
  submitButton: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '12px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    color: 'white',
    border: 'none',
    padding: '18px 30px',
    borderRadius: '50px',
    fontSize: '16px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
    letterSpacing: '1px',
    textTransform: 'uppercase',
    position: 'relative',
    overflow: 'hidden'
  },
  buttonIcon: {
    fontSize: '18px',
    transition: 'transform 0.3s ease'
  }
};

// Enhanced CSS animations
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-30px) rotate(180deg); }
  }
  
  .create-post-card:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  }
  
  textarea:focus, input:focus {
    outline: none !important;
    border-color: rgba(255, 255, 255, 0.4) !important;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1) !important;
    background-color: rgba(255, 255, 255, 0.12) !important;
  }
  
  textarea::placeholder, input::placeholder {
    color: rgba(255, 255, 255, 0.6) !important;
  }
  
  button:hover {
    transform: translateY(-2px) scale(1.05) !important;
    box-shadow: 0 12px 30px rgba(102, 126, 234, 0.4) !important;
  }
  
  button:hover .buttonIcon {
    transform: scale(1.2);
  }
  
  button:active {
    transform: translateY(0) scale(1.02) !important;
  }
  
  @media (max-width: 768px) {
    .card {
      margin: 0 10px !important;
      padding: 20px !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default CreatePost;
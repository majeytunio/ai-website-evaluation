// UI/Components/Header.jsx
import React from 'react';
import { Button, Container } from 'react-bootstrap';
import './Header.css';


import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Make sure you initialize this


const Header = () => {

  const navigate = useNavigate();

  const handleStart = async () => {
    const user = await supabase.auth.getUser();
    if (user.data.user) {
      navigate('/scanner');
    } else {
      navigate('/auth');
    }
  };

  return (
    <header className="ai-gradient-header">
      <div className="ai-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="ai-particle" style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            animationDelay: `${Math.random() * 5}s`
          }}></div>
        ))}
      </div>
      <Container className="py-5 position-relative">
        <h1 className="display-4 fw-bold mb-4 text-white">
          <span className="ai-highlight">Get Recommended</span> by ChatGPT & AI Assistants
        </h1>
        <h2 className="h3 text-light mb-4 opacity-75">
          AI is the new search engine. <br/>Is your business visible where decisions are made?
        </h2>
        <Button 
          variant="light" 
          size="lg" 
          onClick={handleStart}
          className="ai-glow-button fw-bold px-4 py-3"
        >
          <i className="fas fa-search me-2"></i> Start Free AI Visibility Scan
        </Button>
        <div className="ai-platform-logos mt-4">
          <img src="./logos/chat_gpt_logo.png" alt="ChatGPT" width="80" height="auto" />
          <img src="./logos/claude_logo.png" alt="Claude" width="80" height="auto" />
          <img src="./logos/gemini_google.png" alt="Gemini" width="80" height="auto" />
        </div>
      </Container>
    </header>
  );
};

export default Header;
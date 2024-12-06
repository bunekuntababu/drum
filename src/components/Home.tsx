// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Welcome to Bunekunta Babu Drum Kit</h1>
        
        <section className="intro-section">
        <h2>About Bunekunta Babu Drum Kit</h2>
          <p>
            Born from a passion for music and technology, <strong>Bunekunta Babu</strong> Drum Kit is more than 
            just an app – it's a platform that breaks down barriers to musical creativity. 
            Our mission is to make music creation accessible, fun, and engaging for everyone.
            Named after the legendary rhythm master Bunekunta Babu, our drum kit pays homage 
            to the universal language of rhythm that connects people across cultures and generations.
          </p>
         
          <p>
            Dive into the world of beats, sounds, and musical creativity with the most innovative 
            interactive drum kit experience on the web. Whether you're a professional drummer or 
            a complete beginner, Bunekunta Babu Drum Kit is your gateway to musical expression.
          </p>
        </section>
        
       
          <div className="action-buttons">
            <Link to="/signup" className="cta-button signup-button">
              Create Your Account
            </Link>
            <Link to="/login" className="cta-button login-button">
              Log In
            </Link>
          </div>
        
        
        
      </div>
    </div>
  );
};
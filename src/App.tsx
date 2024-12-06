// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Home } from './components/Home';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import InteractiveDrumKit from './components/InteractiveDrumKit';
import './App.css';
import './components/Home.css';

const Header: React.FC = () => {
  const { user, logout } = useAuth();

  return (
  
    <header className="app-header">
      <nav className="header-nav">
        <div className="nav-left">
          <Link to="/Home" className="nav-link">Home</Link>
        </div>
        <div className="nav-right">
          {!user ? (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </>
          ) : (
            <>
              <span className="username">Welcome, {user.username}</span>
              <button onClick={logout} className="logout-button">Logout</button>
            </>
          )}
        </div>
      </nav>
    </header>
    
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>Email: bunekuntababu@gmail.com</p>
          <p>Phone: +91 6303812064</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <Link to="/Home" className="footer-link">About</Link>
          <Link to="/privacy" className="footer-link">Privacy Policy</Link>
          <Link to="/terms" className="footer-link">Terms of Service</Link>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-links">
          <a href="https://www.instagram.com/babu568321221/" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://www.facebook.com/babu.bunekunta.5/" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://x.com/BBabu59817" target="_blank" rel="noopener noreferrer">Twitter</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; App Created by <strong>Bunekunta Babu</strong>.</p>
      </div>
    </footer>
  );
};

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

const App: React.FC = () => {
  return (
    <div className='body'>
    <AuthProvider>
      <Router>
        
        <div className="app-container">
          <Header />
          <main>
            <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/Home' element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/drum-kit" 
                element={
                  <ProtectedRoute>
                    <InteractiveDrumKit />
                  </ProtectedRoute>
                } 
              />
              <Route path="/" element={<Navigate to="/Login" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
        
      </Router>
    </AuthProvider>
    </div>
    
  );
};



export default App;
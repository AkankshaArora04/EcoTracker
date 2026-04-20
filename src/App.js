import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import bgImage from './login-bg.jpg';

// --- LOGIN PAGE COMPONENT ---
function LoginPage({ setAuth }) {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // 1. Auth state ko true karo
    setAuth(true); 
    // 2. Dashboard par navigate karo
    navigate('/dashboard'); 
  };

  const styles = {
    background: `url(${bgImage}) no-repeat center center/cover`,
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  };

  const cardStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    borderRadius: '24px',
    padding: '48px',
    width: '400px',
    boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
    textAlign: 'center',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  };

  // ... (Baki purane styles as it is rahenge)
  const socialButtonStyle = { width: '100%', padding: '12px', marginBottom: '12px', borderRadius: '12px', border: '1px solid #e0e0e0', backgroundColor: 'white', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: '500' };
  const inputStyle = { width: '100%', padding: '16px', marginBottom: '16px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.3)', backgroundColor: 'rgba(255, 255, 255, 0.5)', fontSize: '15px', boxSizing: 'border-box' };
  const buttonStyle = { width: '100%', padding: '16px', borderRadius: '12px', border: 'none', backgroundColor: '#3d8c66', color: 'white', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '10px' };

  return (
    <div style={styles}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '32px', color: 'white', fontSize: '24px', fontWeight: '700', textShadow: '0 2px 4px rgba(0,0,0,0.2)' }}>
        🌱 EcoTrack
      </div>

      <div style={cardStyle}>
        <h2 style={{ fontSize: '26px', fontWeight: '700', color: '#1a2e1a', marginBottom: '4px' }}>Sign In</h2>
        <p style={{ fontSize: '14px', color: '#444', marginBottom: '24px' }}>Welcome, Akanksha! Let's save the planet.</p>

        <button type="button" onClick={() => navigate('/dashboard')} style={socialButtonStyle}>Sign in with Google</button>
        <button type="button" style={socialButtonStyle}>Sign in with Apple</button>

        <div style={{ margin: '20px 0', display: 'flex', alignItems: 'center', color: '#666', fontSize: '12px' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
          <span style={{ padding: '0 10px' }}>OR</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#ccc' }}></div>
        </div>

        <form onSubmit={handleLogin}>
          <input type="email" placeholder="email@example.com" style={inputStyle} required />
          <input type="password" placeholder="••••••••" style={inputStyle} required />
          <button type="submit" style={buttonStyle}>Sign In →</button>
        </form>
      </div>
    </div>
  );
}

// --- MAIN APP COMPONENT ---
function App() {
  // State to track if user is logged in
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* Pass setAuth to LoginPage */}
        <Route path="/" element={<LoginPage setAuth={setIsAuthenticated} />} />
        
        {/* Protected Route Logic */}
        <Route 
          path="/dashboard" 
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
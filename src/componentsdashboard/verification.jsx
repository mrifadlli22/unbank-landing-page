
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from './sidebar';
import Header from './header';
import './app.css';

function Verification() {
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
    const [currentStep, setCurrentStep] = useState('welcome');
    const navigate = useNavigate(); // Inisialisasi navigate

    const handleStartVerification = () => {
        setCurrentStep('phoneVerification');
        navigate('/phoneverification'); // Navigasi ke phone verification
    };

    const handleContinueLater = () => {
        navigate('/dashboard'); // Navigasi ke dashboard
    };

    const toggleSidebar = () => {
        setIsMobileMenuActive(!isMobileMenuActive);
    };

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMobileMenuActive(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className="dashboard">
          <Header toggleSidebar={toggleSidebar} isMobileMenuActive={isMobileMenuActive} />
          <Sidebar isMobileMenuActive={isMobileMenuActive} toggleSidebar={toggleSidebar} />
          <div className="main">
              <div className="content2">
                <div className="contentdash">
              <div className="verification-container">
      {currentStep === 'welcome' && (
        <div className="welcome-section">
          <div className="progress-bar">
            <div className="step completed">Welcome</div>
            <div className="step">Phone Verification</div>
            <div className="step">Identity Verification</div>
            <div className="step">Know Your Customer</div>
          </div>
          <h1>Welcome to unbank!</h1>
          <div className="welcome-content">
            <img src="/Images/welcome.png" alt="Welcome" className="welcome-image" />
            <div className="welcome-text">
              <p>You are about to start the onboarding process.</p>
              <p>If you have any issues while onboarding - please reach out to our <a href="#support">Support Team</a>.</p>
              <p>By proceeding, you agree to our <a href="#terms">General Terms of Use</a>.</p>
              <button className="btn start-verification-btn" onClick={handleStartVerification}>Start Verification</button>
              <button className="btn continue-later-btn" onClick={handleContinueLater}>Continue Later</button>
              </div>
          </div>
        </div>
      )}

{currentStep === 'phoneVerification' && (
  <div className="phone-verification-section">
    <div className="progress-bar">
      <div className="step completed">Welcome</div>
      <div className="step completed">Phone Verification</div>
      <div className="step">Identity Verification</div>
      <div className="step">Know Your Customer</div>
    </div>
    <h1>Phone Verification</h1>
    <div className="phone-verification-content" style={{ padding: '10px', maxWidth: '400px', margin: '0 auto' }}>
      <p style={{ fontSize: '16px' }}>Please provide a mobile phone number that can be used as an extra layer of security. The number must be valid and belong to you.</p>
      <div className="phone-input-group" style={{ marginBottom: '15px' }}>
        <div className="phone-flag" style={{ padding: '8px', fontSize: '14px' }}>🇮🇩</div>
        <input type="text" className="phone-input" value="+62" readOnly style={{ width: '60px', padding: '8px' }} />
        <input type="text" className="phone-number-input" placeholder="Enter your phone number" style={{ flex: 1, padding: '8px', fontSize: '14px' }} />
      </div>
      <button className="btn send-code-btn" style={{ fontSize: '14px', padding: '10px 20px', marginBottom: '10px' }}>Send Code</button>
      <button className="btn continue-later-btn" onClick={handleContinueLater}>Continue Later</button>
      </div>
  </div>
)}

              </div>

        </div>
        </div>
        </div>
        </div>
      );
    }
    

export default Verification
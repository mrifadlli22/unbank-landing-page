import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import './app.css';
import { useLocation } from 'react-router-dom';


function Transfer() {
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
    const location = useLocation();

    const { flag } = location.state || {}; // Get flag from navigation state


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
              <div className="content">
              <div className="transfer-container">
      <div className="transfer-header">
        <h1>Transfer</h1>
      </div>
      <div className="transfer-content">
        <div className="transfer-flag">
          <img src={flag} alt="Currency Flag" className="flag-image" />
        </div>
        <div className="transfer-form">
          <form>
            <label htmlFor="amount">Amount:</label>
            <input type="text" id="amount" name="amount" />
            <button type="submit" className="transfer-button">Transfer</button>
          </form>
        </div>
      </div>
    </div>
        </div>
        </div>
        </div>
      );
    }
    

export default Transfer
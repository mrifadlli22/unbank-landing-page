import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import './app.css';

function Swap() {
    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

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
              <div className="contentdash">
            <div className="coming-soon">
              <h2 className="coming-soon-title">Coming Soon</h2>
              <p className="coming-soon-text">We're working hard to bring you new content. Stay tuned!</p>
            </div>
          </div>
        </div>
        </div>
        </div>
      );
    }
    

export default Swap
import React, { useState } from 'react';
import './app.css';
import { FaTachometerAlt, FaExchangeAlt, FaShieldAlt, FaHistory, FaBell, FaLock, FaQuestionCircle, FaCog, FaBars } from 'react-icons/fa';

function Sidebar({ isMobileMenuActive, toggleSidebar }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleSidebarToggle = () => {
    if (window.innerWidth <= 768) {
      toggleSidebar();
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''} ${isMobileMenuActive ? 'active' : ''}`}>
      <div className="logo-items">
        <img src="./Images/unbank.jpeg" alt="Unbank Logo" />
        <div className="divider"></div> {/* Divider di bawah logo */}
      </div>
      <div className="menu">
        <a href="#dashboard" className="menu-item active">
          <FaTachometerAlt className="icon" />{(!isCollapsed || isMobileMenuActive) && 'Dashboard'}
        </a>
        <a href="#swap" className="menu-item">
          <FaExchangeAlt className="icon" />{(!isCollapsed || isMobileMenuActive) && 'Swap'}
        </a>
        <a href="#xcrow" className="menu-item">
          <FaShieldAlt className="icon" />{(!isCollapsed || isMobileMenuActive) && 'Xcrow'}
        </a>
        <a href="#history" className="menu-item">
          <FaHistory className="icon" />{(!isCollapsed || isMobileMenuActive) && 'History'}
        </a>
        <a href="#notifications" className="menu-item">
          <FaBell className="icon" />{(!isCollapsed || isMobileMenuActive) && 'Notification'}
        </a>
        <a href="#securities" className="menu-item">
          <FaLock className="icon" />{(!isCollapsed || isMobileMenuActive) && 'Securities'}
        </a>
        <div className="divider"></div> {/* Divider di bawah Securities */}
        <a href="#help" className="menu-item">
          <FaQuestionCircle className="icon" />{(!isCollapsed || isMobileMenuActive) && 'Help'}
        </a>
        <a href="#settings" className="menu-item">
          <FaCog className="icon" />{(!isCollapsed || isMobileMenuActive) && 'Settings'}
        </a>
      </div>
      <div className="burger-menu sidebar-burger-menu" onClick={handleSidebarToggle}>
        <FaBars />
      </div>
    </div>
  );
}

export default Sidebar;

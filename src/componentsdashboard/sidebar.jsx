import React from 'react';
import './app.css';
import { FaTachometerAlt, FaExchangeAlt, FaShieldAlt, FaHistory, FaBell, FaLock, FaQuestionCircle, FaCog, FaBars } from 'react-icons/fa';

function Sidebar({ isMobileMenuActive, toggleSidebar }) {
  return (
    <div className={`sidebar ${isMobileMenuActive ? 'active' : ''}`}>
      <div className="logo-items">
        <img src="./Images/unbank.jpeg" alt="Unbank Logo" />
        <div className="divider"></div> {/* Divider di bawah logo */}
      </div>
      <div className="menu">
        <a href="#dashboard" className="menu-item active">
          <FaTachometerAlt className="icon" />{'Dashboard'}
        </a>
        <a href="#swap" className="menu-item">
          <FaExchangeAlt className="icon" />{'Swap'}
        </a>
        <a href="#xcrow" className="menu-item">
          <FaShieldAlt className="icon" />{'Xcrow'}
        </a>
        <a href="#history" className="menu-item">
          <FaHistory className="icon" />{'History'}
        </a>
        {/* <a href="#notifications" className="menu-item">
          <FaBell className="icon" />{'Notification'}
        </a>
        <a href="#securities" className="menu-item">
          <FaLock className="icon" />{'Securities'}
        </a> */}
        <div className="divider"></div> {/* Divider di bawah Securities */}
        <a href="#help" className="menu-item">
          <FaQuestionCircle className="icon" />{'Help'}
        </a>
        <a href="#settings" className="menu-item">
          <FaCog className="icon" />{'Settings'}
        </a>
      </div>
      <div className="burger-menu sidebar-burger-menu" onClick={toggleSidebar}>
        <FaBars />
      </div>
    </div>
  );
}

export default Sidebar;

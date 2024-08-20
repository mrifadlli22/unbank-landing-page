import React from 'react';
import { NavLink } from 'react-router-dom';
import './app.css';
import { FaTachometerAlt, FaExchangeAlt, FaShieldAlt, FaHistory, FaQuestionCircle, FaCog, FaBars } from 'react-icons/fa';

function Sidebar({ isMobileMenuActive, toggleSidebar }) {
  return (
    <div className={`sidebar ${isMobileMenuActive ? 'active' : ''}`}>
      <div className="logo-items">
        <img src="./Images/unbank.jpeg" alt="Unbank Logo" />
        <div className="divider2"></div> {/* Divider di bawah logo */}
      </div>
      <div className="menu">
        <NavLink to="/dashboard" className="menu-item" activeClassName="active">
          <FaTachometerAlt className="icon" />{'Dashboard'}
        </NavLink>
        <NavLink to="/swap" className="menu-item" activeClassName="active">
          <FaExchangeAlt className="icon" />{'Swap'}
        </NavLink>
        <NavLink to="/xcrow" className="menu-item" activeClassName="active">
          <FaShieldAlt className="icon" />{'Xcrow'}
        </NavLink>
        <NavLink to="/history" className="menu-item" activeClassName="active">
          <FaHistory className="icon" />{'History'}
        </NavLink>
        <div className="divider2"></div> {/* Divider di bawah Securities */}
        <NavLink to="/help" className="menu-item" activeClassName="active">
          <FaQuestionCircle className="icon" />{'Help'}
        </NavLink>
        <NavLink to="/settings" className="menu-item" activeClassName="active">
          <FaCog className="icon" />{'Settings'}
        </NavLink>
      </div>
      <div className="burger-menu sidebar-burger-menu" onClick={toggleSidebar}>
        <FaBars />
      </div>
    </div>
  );
}

export default Sidebar;

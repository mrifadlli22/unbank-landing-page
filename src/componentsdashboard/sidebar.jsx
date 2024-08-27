import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './app.css'; // Pastikan nama file yang benar
import { FaTachometerAlt, FaExchangeAlt, FaShieldAlt, FaHistory, FaQuestionCircle, FaCog, FaBars, FaCaretDown, FaCaretUp, FaCaretRight } from 'react-icons/fa';

function Sidebar({ isMobileMenuActive, toggleSidebar }) {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleDropdownToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <div className={`sidebar ${isMobileMenuActive ? 'active' : ''}`}>
      <div className="logo-items">
        <img src="./Images/unbank.jpeg" alt="Unbank Logo" />
        <div className="divider2"></div>
      </div>
      <div className="menu">
        {/* Account Information Dropdown */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${openDropdown === 1 ? 'active' : ''}`}
            onClick={() => handleDropdownToggle(1)}
          >
            <FaTachometerAlt className="icon" />{'Account Information'}
            {openDropdown === 1 ? <FaCaretDown className="dropdown-icon" /> : <FaCaretRight className="dropdown-icon" />}
          </button>
          <div className={`dropdown-container ${openDropdown === 1 ? 'show' : ''}`}>
            <NavLink to="/account-summary" className="dropdown-item">Account Summary</NavLink>
            <NavLink to="/transaction-inquiry" className="dropdown-item">Transaction Inquiry</NavLink>
            <NavLink to="/account-statement" className="dropdown-item">Account Statement</NavLink>
            <NavLink to="/beneficiary" className="dropdown-item">Beneficiary</NavLink>
          </div>
        </div>

        {/* Fiat Dropdown */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${openDropdown === 2 ? 'active' : ''}`}
            onClick={() => handleDropdownToggle(2)}
          >
            <FaExchangeAlt className="icon" />{'Fiat'}
            {openDropdown === 2 ? <FaCaretDown className="dropdown-icon" /> : <FaCaretRight className="dropdown-icon" />}
          </button>
          <div className={`dropdown-container ${openDropdown === 2 ? 'show' : ''}`}>
            <NavLink to="/topup" className="dropdown-item">Topup</NavLink>
            <NavLink to="/transfer" className="dropdown-item">Transfer</NavLink>
            <NavLink to="/exchange" className="dropdown-item">Exchange</NavLink>
          </div>
        </div>

        {/* Digital Asset Dropdown */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${openDropdown === 3 ? 'active' : ''}`}
            onClick={() => handleDropdownToggle(3)}
          >
            <FaShieldAlt className="icon" />{'Digital Asset'}
            {openDropdown === 3 ? <FaCaretDown className="dropdown-icon" /> : <FaCaretRight className="dropdown-icon" />}
          </button>
          <div className={`dropdown-container ${openDropdown === 3 ? 'show' : ''}`}>
            <NavLink to="/received" className="dropdown-item">Received</NavLink>
            <NavLink to="/send" className="dropdown-item">Send</NavLink>
            <NavLink to="/on-ramp" className="dropdown-item">On Ramp</NavLink>
            <NavLink to="/off-ramp" className="dropdown-item">Off Ramp</NavLink>
            <NavLink to="/swap" className="dropdown-item">Swap</NavLink>
          </div>
        </div>

        {/* Product Dropdown */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${openDropdown === 4 ? 'active' : ''}`}
            onClick={() => handleDropdownToggle(4)}
          >
            <FaHistory className="icon" />{'Product'}
            {openDropdown === 4 ? <FaCaretDown className="dropdown-icon" /> : <FaCaretRight className="dropdown-icon" />}
          </button>
          <div className={`dropdown-container ${openDropdown === 4 ? 'show' : ''}`}>
            <NavLink to="/stacking" className="dropdown-item">Stacking</NavLink>
            <NavLink to="/guarantee" className="dropdown-item">Guarantee</NavLink>
            <NavLink to="/xcrow" className="dropdown-item">Escrow</NavLink>
            <NavLink to="/l-and-c" className="dropdown-item">L & C</NavLink>
          </div>
        </div>

        <div className="divider2"></div>


        {/* Help and Settings */}
        <NavLink to="/help" className="menu-item" activeClassName="active">
          <FaQuestionCircle style={{marginRight:"10px"}} className="icon" />{'Help'}
        </NavLink>
        <NavLink to="/settings" className="menu-item" activeClassName="active">
          <FaCog style={{marginRight:"10px"}} className="icon" />{'Settings'}
        </NavLink>
      </div>
      <div className="burger-menu sidebar-burger-menu" onClick={toggleSidebar}>
        <FaBars />
      </div>
    </div>
  );
}

export default Sidebar;

import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './app.css'; 
import { FaTachometerAlt, FaExchangeAlt, FaShieldAlt, FaHistory, FaQuestionCircle, FaCog, FaBars, FaCaretDown, FaCaretRight } from 'react-icons/fa';

function Sidebar({ isMobileMenuActive, toggleSidebar }) {
  const [openDropdowns, setOpenDropdowns] = useState({});
  const sidebarRef = useRef(null); // Ref for the sidebar
  const burgerRef = useRef(null); // Ref for the burger menu icon

  const handleDropdownToggle = (index) => {
    setOpenDropdowns((prevOpenDropdowns) => ({
      ...prevOpenDropdowns,
      [index]: !prevOpenDropdowns[index],
    }));
  };

  const handleClickOutside = (event) => {
    // Check if the click was outside the sidebar and the burger icon
    if (
      sidebarRef.current && 
      !sidebarRef.current.contains(event.target) && 
      burgerRef.current && 
      !burgerRef.current.contains(event.target)
    ) {
      toggleSidebar();
    }
  };

  useEffect(() => {
    // Add event listener to handle clicks outside
    if (isMobileMenuActive) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuActive]);

  return (
    <div ref={sidebarRef} className={`sidebar ${isMobileMenuActive ? 'active' : ''}`}>
      <div className="logo-items">
        <img src="./Images/unbank.jpeg" alt="Unbank Logo" />
      </div>
      <div className="divider2"></div>
      <div className="menu">
        {/* Account Information Dropdown */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${openDropdowns[1] ? 'active' : ''}`}
            onClick={() => handleDropdownToggle(1)}
          >
            <FaTachometerAlt className="icon" />{'Account Information'}
            {openDropdowns[1] ? <FaCaretDown className="dropdown-icon" /> : <FaCaretRight className="dropdown-icon" />}
          </button>
          <div className={`dropdown-container ${openDropdowns[1] ? 'show' : ''}`}>
            <NavLink to="/account-summary" className="dropdown-item">Account Summary</NavLink>
            <NavLink to="/transaction-inquiry" className="dropdown-item">Transaction Inquiry</NavLink>
            <NavLink to="/account-statement" className="dropdown-item">Account Statement</NavLink>
            <NavLink to="/beneficiary" className="dropdown-item">Beneficiary</NavLink>
          </div>
        </div>

        {/* Fiat Dropdown */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${openDropdowns[2] ? 'active' : ''}`}
            onClick={() => handleDropdownToggle(2)}
          >
            <FaExchangeAlt className="icon" />{'Fiat'}
            {openDropdowns[2] ? <FaCaretDown className="dropdown-icon" /> : <FaCaretRight className="dropdown-icon" />}
          </button>
          <div className={`dropdown-container ${openDropdowns[2] ? 'show' : ''}`}>
            <NavLink to="/topup" className="dropdown-item">Topup</NavLink>
            <NavLink to="/transfer-page" className="dropdown-item">Transfer</NavLink>
            <NavLink to="/exchange" className="dropdown-item">Exchange</NavLink>
          </div>
        </div>

        {/* Digital Asset Dropdown */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${openDropdowns[3] ? 'active' : ''}`}
            onClick={() => handleDropdownToggle(3)}
          >
            <FaShieldAlt className="icon" />{'Digital Asset'}
            {openDropdowns[3] ? <FaCaretDown className="dropdown-icon" /> : <FaCaretRight className="dropdown-icon" />}
          </button>
          <div className={`dropdown-container ${openDropdowns[3] ? 'show' : ''}`}>
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
            className={`dropdown-btn ${openDropdowns[4] ? 'active' : ''}`}
            onClick={() => handleDropdownToggle(4)}
          >
            <FaHistory className="icon" />{'Product'}
            {openDropdowns[4] ? <FaCaretDown className="dropdown-icon" /> : <FaCaretRight className="dropdown-icon" />}
          </button>
          <div className={`dropdown-container ${openDropdowns[4] ? 'show' : ''}`}>
            <NavLink to="/stacking" className="dropdown-item">Staking</NavLink>
            <NavLink to="/guarantee" className="dropdown-item">Guarantee</NavLink>
            <NavLink to="/xcrow" className="dropdown-item">Escrow</NavLink>
            <NavLink to="/l-and-c" className="dropdown-item">L/C</NavLink>
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
      <div ref={burgerRef} className="burger-menu sidebar-burger-menu" onClick={toggleSidebar}>
        <FaBars />
      </div>
    </div>
  );
}

export default Sidebar;

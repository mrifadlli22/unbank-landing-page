import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./app.css";
import {
  FaTachometerAlt,
  FaExchangeAlt,
  FaShieldAlt,
  FaHistory,
  FaQuestionCircle,
  FaCog,
  FaBars,
  FaCaretDown,
  FaCaretRight,
} from "react-icons/fa";

function Sidebar({ isMobileMenuActive, toggleSidebar }) {
  const [openDropdowns, setOpenDropdowns] = useState(() => {
    // Initialize state from localStorage
    const savedState = localStorage.getItem('openDropdowns');
    return savedState ? JSON.parse(savedState) : {};
  });
  const sidebarRef = useRef(null); // Ref for the sidebar
  const burgerRef = useRef(null); // Ref for the burger menu icon

  const handleDropdownToggle = (index) => {
    const newOpenDropdowns = {
      ...openDropdowns,
      [index]: !openDropdowns[index],
    };
    setOpenDropdowns(newOpenDropdowns);
    // Save the state to localStorage
    localStorage.setItem('openDropdowns', JSON.stringify(newOpenDropdowns));
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
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuActive]);

  return (
    <div
      ref={sidebarRef}
      className={`sidebar ${isMobileMenuActive ? "active" : ""}`}
    >
      <div className="logo-items">
        <img src="./Images/unbank.jpeg" alt="Unbank Logo" />
      </div>
      <div className="divider2"></div>
      <div className="menu">
        {/* Account Information Dropdown */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${openDropdowns[1] ? "active" : ""}`}
            onClick={() => handleDropdownToggle(1)}
          >
            <FaTachometerAlt className="icon" />
            {"Account Information"}
            {openDropdowns[1] ? (
              <FaCaretDown className="dropdown-icon" />
            ) : (
              <FaCaretRight className="dropdown-icon" />
            )}
          </button>
          <div
            className={`dropdown-container ${openDropdowns[1] ? "show" : ""}`}
          >
            <NavLink to="/account-summary" className="dropdown-item" activeClassName="active">
              Account Summary
            </NavLink>
            <NavLink to="/transaction-inquiry" className="dropdown-item" activeClassName="active">
              Transaction Inquiry
            </NavLink>
            <NavLink to="/account-statement" className="dropdown-item" activeClassName="active">
              Account Statement
            </NavLink>
            <NavLink to="/beneficiary" className="dropdown-item" activeClassName="active">
              Beneficiary
            </NavLink>
          </div>
        </div>

        {/* Fiat Dropdown */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${openDropdowns[2] ? "active" : ""}`}
            onClick={() => handleDropdownToggle(2)}
          >
            <FaExchangeAlt className="icon" />
            {"Fiat"}
            {openDropdowns[2] ? (
              <FaCaretDown className="dropdown-icon" />
            ) : (
              <FaCaretRight className="dropdown-icon" />
            )}
          </button>
          <div
            className={`dropdown-container ${openDropdowns[2] ? "show" : ""}`}
          >
            <NavLink to="/topup" className="dropdown-item" activeClassName="active">
              Topup
            </NavLink>
            <NavLink to="/transfer-page" className="dropdown-item" activeClassName="active">
              Transfer
            </NavLink>
            <NavLink to="/exchange" className="dropdown-item" activeClassName="active">
              Exchange
            </NavLink>
          </div>
        </div>

        {/* Digital Asset Dropdown */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${openDropdowns[3] ? "active" : ""}`}
            onClick={() => handleDropdownToggle(3)}
          >
            <FaShieldAlt className="icon" />
            {"Digital Asset"}
            {openDropdowns[3] ? (
              <FaCaretDown className="dropdown-icon" />
            ) : (
              <FaCaretRight className="dropdown-icon" />
            )}
          </button>
          <div
            className={`dropdown-container ${openDropdowns[3] ? "show" : ""}`}
          >
            <NavLink to="/received" className="dropdown-item" activeClassName="active">
              Received
            </NavLink>
            <NavLink to="/send" className="dropdown-item" activeClassName="active">
              Send
            </NavLink>
            <NavLink to="/on-ramp" className="dropdown-item" activeClassName="active">
              On Ramp
            </NavLink>
            <NavLink to="/off-ramp" className="dropdown-item" activeClassName="active">
              Off Ramp
            </NavLink>
            <NavLink to="/swap" className="dropdown-item" activeClassName="active">
              Swap
            </NavLink>
          </div>
        </div>

        {/* Product Dropdown */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${openDropdowns[4] ? "active" : ""}`}
            onClick={() => handleDropdownToggle(4)}
          >
            <FaHistory className="icon" />
            {"Product"}
            {openDropdowns[4] ? (
              <FaCaretDown className="dropdown-icon" />
            ) : (
              <FaCaretRight className="dropdown-icon" />
            )}
          </button>
          <div
            className={`dropdown-container ${openDropdowns[4] ? "show" : ""}`}
          >
            <NavLink to="/stacking" className="dropdown-item" activeClassName="active">
              Staking
            </NavLink>
            <NavLink to="/guarantee" className="dropdown-item" activeClassName="active">
              Guarantee
            </NavLink>
            <NavLink to="/xcrow" className="dropdown-item" activeClassName="active">
              Escrow
            </NavLink>
            <NavLink to="/l-and-c" className="dropdown-item" activeClassName="active">
              L/C
            </NavLink>
          </div>
        </div>

        {/* OTC Dropdown */}
        <div className="dropdown">
          <button
            className={`dropdown-btn ${openDropdowns[5] ? "active" : ""}`}
            onClick={() => handleDropdownToggle(5)}
          >
            <FaHistory className="icon" />
            {"OTC"}
            {openDropdowns[5] ? (
              <FaCaretDown className="dropdown-icon" />
            ) : (
              <FaCaretRight className="dropdown-icon" />
            )}
          </button>
          <div
            className={`dropdown-container ${openDropdowns[5] ? "show" : ""}`}
          >
            <NavLink to="/market" className="dropdown-item" activeClassName="active">
              Market
            </NavLink>
            <NavLink to="/new-offer" className="dropdown-item" activeClassName="active">
              My Offer
            </NavLink>
            <NavLink to="/active-offer" className="dropdown-item" activeClassName="active">
              Active Offer
            </NavLink>
            <NavLink to="/history-offer" className="dropdown-item" activeClassName="active">
              History Offer
            </NavLink>
          </div>
        </div>

        <div className="divider2"></div>

        {/* Help and Settings */}
        <NavLink to="/help" className="menu-item" activeClassName="active">
          <FaQuestionCircle style={{ marginRight: "10px" }} className="icon" />
          {"Help"}
        </NavLink>
        <NavLink to="/settings" className="menu-item" activeClassName="active">
          <FaCog style={{ marginRight: "10px" }} className="icon" />
          {"Settings"}
        </NavLink>
      </div>
      <div
        ref={burgerRef}
        className="burger-menu sidebar-burger-menu"
        onClick={toggleSidebar}
      >
        <FaBars />
      </div>
    </div>
  );
}

export default Sidebar;

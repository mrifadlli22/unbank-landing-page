import React, { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './app.css';

function Header({ toggleSidebar, isMobileMenuActive }) {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleUserInfoClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleNavigation = (path) => {
    navigate(`/settings?tab=${path}`);
    setDropdownVisible(false); // Hide the dropdown after navigation
  };

  return (
    <div className="header">
      {!isMobileMenuActive && (
        <div style={{ marginRight: "10px" }} className="header-burger-menu" onClick={toggleSidebar}>
          <FaBars />
        </div>
      )}
      <div className="user-info-container">
        <div className="user-info" onClick={handleUserInfoClick}>
          <img src="/Images/username.png" alt="User" className="user-icon" />
          <div className="user-details">
            <span className="user-name">om ade</span>
            <span className="user-id">Personal ID: KV42RX</span>
          </div>
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b276d5172728387905a21ca31a1be2042d61c310a67ebf5b3c460c0c59fec66a?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" alt="Dropdown Icon" className="dropdown-icon" />
        </div>
        <div className={`dropdown-menu ${isDropdownVisible ? 'show' : ''}`}>
          <a href="#profile" onClick={() => handleNavigation('profile')}>Profile</a>
          <a href="#settings" onClick={() => handleNavigation('support')}>Support</a>
        </div>
      </div>
      <div className="actions">
        <span style={{ borderRadius: "30px", marginRight: "0px" }} className="verify-btn">
          <img
            src="./Images/security.png" alt="BTC Icon"
            style={{ width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle' }}
          />
          Verify Account
        </span>
        <span style={{ borderRadius: "30px", marginRight: "0px" }} className="verify-btn">
          <img
            src="./Images/usd.png" alt="BTC Icon"
            style={{ width: '20px', height: '20px', marginRight: '8px', verticalAlign: 'middle' }}
          />
          1 USD = Rp. 15.584,10
        </span>
        <button className="logout-btn">
          <div className="logout-container">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a02ad958ff1e19dbae6570b2b39724a613c2de30e46b4710a6f1d3e01b50b7ea?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" alt="Logout Icon" className="logout-icon" />
            <span className="logout-text">Log out</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default Header;

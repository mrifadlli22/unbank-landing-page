import React from 'react';
import { FaBars } from 'react-icons/fa';
import './app.css';

function Header({ toggleSidebar, isMobileMenuActive }) {
  return (
    <div className="header">
              {!isMobileMenuActive && (
        <div style={{marginRight:"10px"}} className="header-burger-menu" onClick={toggleSidebar}>
          <FaBars />
        </div>
      )}
      <div className="user-info">
        <img src="/Images/username.png" alt="User" className="user-icon" />
        <div className="user-details">
          <span className="user-name">om ade</span>
          <span className="user-id">Personal ID: KV42RX</span>
        </div>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b276d5172728387905a21ca31a1be2042d61c310a67ebf5b3c460c0c59fec66a?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" alt="Dropdown Icon" className="dropdown-icon" />
      </div>
      <div className="actions">
        <button className="verify-btn">Verify Account</button>
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/4240512edae385f460dad25d3f570641caf3c3c3c38ab74b3f015256904eb332?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" altText="Button icon" />
        <button className="logout-btn">
        <div class="logout-container">
            <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/a02ad958ff1e19dbae6570b2b39724a613c2de30e46b4710a6f1d3e01b50b7ea?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" alt="Logout Icon" class="logout-icon" />
            <span class="logout-text">Log out</span>
            </div>

         </button>
      </div>

    </div>
  );
}

export default Header;

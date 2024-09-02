import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import './app.css';
import { useLocation } from 'react-router-dom';

 function TransferDigital() {
  const location = useLocation();

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const { flagDig, currencyDig, amountDig, descDig, tab } = location.state || {}; // Get flag, currency, amount, and tab from navigation state
  const [activeTab, setActiveTab] = useState(tab || "receive"); // Set active tab based on query string or state
  const [selectedNetwork, setSelectedNetwork] = useState("Ethereum (ERC-20)"); // Default option
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const networkoptions = ["Ethereum (ERC-20)", "Tron (ERC-20)", "Bitcoin (BTC)"];

  const toggleSidebar = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  const handleDropdownClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedNetwork(option);
    setIsDropdownOpen(false);
  };

  // Extract the network type (e.g., "ERC-20") from selectedNetwork
  const networkType = selectedNetwork.split(" ")[1];

  return (
    <div className="dashboard">
      <Header toggleSidebar={toggleSidebar} isMobileMenuActive={isMobileMenuActive} />
      <Sidebar isMobileMenuActive={isMobileMenuActive} toggleSidebar={toggleSidebar} />
      <div className="main">
        <div className="content">
          <div className="contentdash">
            <div className="transfer-container">
              <div className="transfer-header">
                <h1>{descDig}</h1>
              </div>
              <div className="transfer-content">
                <div className="transfer-info">
                  <img src={flagDig} alt="Digital Flag" className="flag-image" />
                  <div className="balance-info">
                    <div className="balance">
                      <span>Balance: </span>
                      <span>{amountDig}</span>
                    </div>
                    <div className="equivalent">
                      <span>Equivalent: </span>
                      <span>0.00 EUR</span>
                    </div>
                    <div className="label">
                      <span>Label: </span>
                      <span>None</span>
                    </div>
                  </div>
                </div>
                <div className="settingsTransfer-container">
                  <div className="settingsTransfer-header">
                    <ul className="settingsTransfer-tabs">
                      <li className={activeTab === "receive" ? "active-tab" : ""} onClick={() => setActiveTab("receive")}>
                        Receive
                      </li>
                      <li className={activeTab === "send" ? "active-tab" : ""} onClick={() => setActiveTab("send")}>
                        Send
                      </li>
                      <li className={activeTab === "trade" ? "active-tab" : ""} onClick={() => setActiveTab("trade")}>
                        Trade
                      </li>
                    </ul>
                  </div>

                  {activeTab === "receive" && (
  <div className="receive-section">
    <div className="receive-content">
      <div className="left-section">
        <div className="network-selection">
          <label>Blockchain Network</label>
          <div className="custom-select" onClick={handleDropdownClick}>
            <div className={`select-selected ${isDropdownOpen ? "select-arrow-active" : ""}`}>
              {selectedNetwork}
            </div>
            {isDropdownOpen && (
              <div className="select-items select-hide">
                {networkoptions.map((option, index) => (
                  <div
                    key={index}
                    className={option === selectedNetwork ? "same-as-selected" : ""}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="wallet-address">
          <label>Wallet address</label>
          <div className="address-info">
            <input type="text" value="0xE5b0a816C7E47..." readOnly />
            <button onClick={() => navigator.clipboard.writeText("0xE5b0a816C7E47...")}>Copy</button>
          </div>
        </div>
        <div className="address-note">
          <ul>
            <li>This wallet address only accepts tokens transferred by ({networkType}) network. Tokens transferred through any other network will be lost.</li>
            <li>The minimum transfer amount is 10 USDT. Lower amounts will be declined.</li>
            <li>Address can be used repeatedly to deposit. (This is {descDig} / {networkType} address ) </li>
            <li>Deposit will be shown in your balance after 20 confirmatin(s) </li>
            <li>No Deposit fee</li>
            <li>Sending tokens othen than USDT to aboce address will result in your tokens being lost</li>
          </ul>
        </div>
      </div>

      <div className="vertical-divider"></div>

      <div className="right-section">
        <div className="qr-codes">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b49fd22c9c3e25246a9bc6687ae8b09d4ed999de7c9825f1b5b548b3fd1bde5" alt="QR Code" /> {/* Replace with actual QR code image */}
          <p>Your {currencyDig} ({networkType}) Address</p> {/* Dynamic QR code description */}
        </div>
      </div>
    </div>
  </div>
)}

{activeTab === "send" && (
  <div className="send-section">
    <div className="send-content">
      <div className="left-section">
        <div className="network-selection">
          <label>Blockchain Network</label>
          <div className="custom-select" onClick={handleDropdownClick}>
            <div className={`select-selected ${isDropdownOpen ? "select-arrow-active" : ""}`}>
              {selectedNetwork}
            </div>
            {isDropdownOpen && (
              <div className="select-items select-hide">
                {networkoptions.map((option, index) => (
                  <div
                    key={index}
                    className={option === selectedNetwork ? "same-as-selected" : ""}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="wallet-address">
          <label>Recipient Wallet Address</label>
          <div className="address-info">
            <input type="text" placeholder="Enter recipient's wallet address" />
          </div>
        </div>
        <div className="amount-send">
          <label>Amount to Send</label>
          <div className="amount-info">
            <input type="text" placeholder={`Enter amount in ${currencyDig}`} />
          </div>
        </div>
        <div className="address-note">
          <h2>USDT Info</h2>
          <ul>
            <li>Daily limit for withdrawal is 70000 USDT per day. (to raise the limit, click here)</li>
            <li>Minimum transaction is 0.1 USDT</li>
            <li>Fee of 0 USDT will be deducted from withdrawal amount</li>
            <li>USDT will be received in about 60 minutes.</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="send-actions">
      <button className="send-button">Send {currencyDig}</button>
    </div>
  </div>
)}


{activeTab === "trade" && (
  <div className="coming-soon-section">
    <div className="coming-soon-content">
      <h2>Trade Coming Soon</h2>
      <p>Stay tuned for updates! The trade feature will be available shortly.</p>
    </div>
  </div>
)}

                </div>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TransferDigital;

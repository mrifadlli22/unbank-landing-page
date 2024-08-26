import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import './app.css';
import { useLocation } from 'react-router-dom';

function Transfer() {
  const location = useLocation();

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [activeTab, setActiveTab] = useState("topup"); // Set active tab based on query string
  const { flag, currency, amount } = location.state || {}; // Get flag, currency, and amount from navigation state
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
                <h1>{currency}</h1>
              </div>
              <div className="transfer-content">
                <div className="transfer-info">
                  <img src={flag} alt="Currency Flag" className="flag-image" />
                  <div className="balance-info">
                    <div className="balance">
                      <span>Balance: </span>
                      <span>{amount}</span>
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
                      <li className={activeTab === "topup" ? "active-tab" : ""} onClick={() => setActiveTab("topup")}>
                        Top-Up
                      </li>
                      <li className={activeTab === "exchange" ? "active-tab" : ""} onClick={() => setActiveTab("exchange")}>
                        Exchange
                      </li>
                      <li className={activeTab === "transfer" ? "active-tab" : ""} onClick={() => setActiveTab("transfer")}>
                        Transfer
                      </li>
                    </ul>
                  </div>

                  {activeTab === "topup" && (
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
            <li>This wallet address only accepts tokens transferred by Ethereum (ERC-20) network. Tokens transferred through any other network will be lost.</li>
            <li>The minimum transfer amount is 10 USDT. Lower amounts will be declined.</li>
          </ul>
        </div>
      </div>

      <div className="vertical-divider"></div>

      <div className="right-section">
        <div className="qr-codes">
          <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b49fd22c9c3e25246a9bc6687ae8b09d4ed999de7c9825f1b5b548b3fd1bde5" alt="QR Code" /> {/* Replace with actual QR code image */}
          <p>Your {currency} ({networkType}) Address</p> {/* Dynamic QR code description */}
        </div>
      </div>
    </div>
  </div>
)}
                  {activeTab === "exchange" && (
                <div className="support-section">
                  <div className="security-alert">
                    <span>
                      <img style={{ marginLeft: "5px" }} src="./Images/i.png" />
                    </span>
                    <div>
                      <p>
                        We're experiencing high volumes of inquiries, resulting
                        in longer response times than we'd hoped for. We aim to
                        reply to you within 2 working days.
                      </p>
                    </div>
                  </div>
                  <div className="section">
                    <div
                      style={{ marginBottom: "25px" }}
                      className="section-header-container"
                    >
                      <div className="section-header">Active Transactions</div>
                      <div className="divider2"></div>
                      <button className="see-all-transactions-btn">
                        View Archived
                      </button>
                    </div>
                    <div className="support-card">
                      <img
                        style={{ width: "245px" }}
                        src="./Images/Image.png"
                        alt="Contact Support"
                        className="support-image"
                      />
                      <div className="support-content">
                        <h3 style={{ marginTop: "0px" }}>
                          Contact Our Support
                        </h3>
                        <p>
                          In case you encounter any issues or require assistance
                          with your account, please don't hesitate to contact
                          us.
                        </p>
                        <button className="support-button">
                          Contact Our Support
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
             {activeTab === "transfer" && (
  <div className="trade-section">
    <div className="trade-option">
      <div className="trade-details">
        <div className="trade-title">
          <span>To your {currency} bank account</span>
          <span>SEPA Transfer in {currency}</span>
        </div>
        <div className="trade-icon">
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
    </div>
    <div className="trade-option">
      <div className="trade-details">
        <div className="trade-title">
          <span>To another unbank user account</span>
          <span>Internal Transfer in {currency}</span>
        </div>
        <div className="trade-icon">
          <i className="fas fa-chevron-right"></i>
        </div>
      </div>
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

export default Transfer;

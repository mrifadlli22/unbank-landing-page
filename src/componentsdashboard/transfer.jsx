import React, { useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import './app.css';
import { useLocation, useNavigate } from 'react-router-dom';

function Transfer() {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate hook for navigation

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const { flag, currency, amount, tab } = location.state || {}; // Get flag, currency, amount, and tab from navigation state
  const [activeTab, setActiveTab] = useState(tab || "topup"); // Set active tab based on state

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

  // Function to handle navigation to Beneficiary tab
  const navigateToBeneficiary = (selectedTab) => {
    navigate('/beneficiary', { state: { tab: selectedTab } });
  };

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
                      <li className={activeTab === "transfer" ? "active-tab" : ""} onClick={() => setActiveTab("transfer")}>
                        Transfer
                      </li>
                      <li className={activeTab === "exchange" ? "active-tab" : ""} onClick={() => setActiveTab("exchange")}>
                        Exchange
                      </li>
                    </ul>
                  </div>

                  {activeTab === "topup" && (
                    <div className="topup-section">
                      <div className="topup-content">
                        <div className="payment-method-selection">
                          <label>Select Payment Method</label>
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
                        <div className="amount-topup">
                          <label>Amount to Top-Up</label>
                          <div className="amount-info">
                            <input type="text" placeholder={`Enter amount in ${currency}`} />
                          </div>
                        </div>
                        <div className="address-note">
                          <ul>
                            <li>Ensure the payment method is correct before proceeding.</li>
                            <li>Minimum top-up amount is 10 {currency}. Lower amounts will be declined.</li>
                          </ul>
                        </div>
                        <div className="topup-actions">
                          <button className="topup-button">Proceed with Top-Up</button>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "transfer" && (
                    <div className="transfer-section">
                      <div className="transfer-option" onClick={() => navigateToBeneficiary("banktab")}>
                        <div className="transfer-details">
                          <div className="transfer-title">
                            <span>Transfer to Your Bank Account</span>
                            <span>SEPA Transfer in {currency}</span>
                          </div>
                          <div className="transfer-icon">
                            <i className="fas fa-chevron-right"></i>
                          </div>
                        </div>
                      </div>
                      <div className="transfer-option" onClick={() => navigateToBeneficiary("unbanktab")}>
                        <div className="transfer-details">
                          <div className="transfer-title">
                            <span>Transfer to Another Unbank User</span>
                            <span>Internal Transfer in {currency}</span>
                          </div>
                          <div className="transfer-icon">
                            <i className="fas fa-chevron-right"></i>
                          </div>
                        </div>
                      </div>
                      <div className="transfer-option" onClick={() => navigateToBeneficiary("wallettab")}>
                        <div className="transfer-details">
                          <div className="transfer-title">
                            <span>Transfer to External Crypto Wallet</span>
                            <span>Send {currency} to another wallet</span>
                          </div>
                          <div className="transfer-icon">
                            <i className="fas fa-chevron-right"></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === "exchange" && (
                    <div className="coming-soon-section">
                      <div className="coming-soon-content">
                        <h2>Exchange Coming Soon</h2>
                        <p>Stay tuned for updates! The exchange feature will be available shortly.</p>
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

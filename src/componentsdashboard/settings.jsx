import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation and useNavigate
import Sidebar from "./sidebar";
import Header from "./header";
import "./app.css";

function Settings() {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Initialize useNavigate
  const queryParams = new URLSearchParams(location.search);
  const tab = queryParams.get("tab") || "profile"; // Get tab from query string or default to 'profile'
  const [transactionLimit, setTransactionLimit] = useState(15000); // Current transaction limit
  const [showUpgradeForm, setShowUpgradeForm] = useState(false); // State to control popup visibility
  const [requestedLimit, setRequestedLimit] = useState(transactionLimit); 


  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [activeTab, setActiveTab] = useState(tab); // Set active tab based on query string

  const toggleSidebar = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  const handleSubmitUpgrade = () => {
    // You can add your logic for handling the submit action here
    alert('Your request to upgrade limited transactions has been submitted.');
  };


  const handleUpgradeLimit = () => {
    setShowUpgradeForm(true); // Show the popup form
  };

  const handleUpgradeRequest = () => {
    setTransactionLimit(requestedLimit); // Update the transaction limit dynamically
    alert(`Your request to upgrade your limit to USD ${requestedLimit} has been submitted.`);
    setShowUpgradeForm(false); // Close the popup after submitting
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMobileMenuActive(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setActiveTab(tab); // Update activeTab when the query string changes
  }, [tab]);

  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/${newTab}`); // Update the URL path
  };

  return (
    <div className="dashboard">
      <Header
        toggleSidebar={toggleSidebar}
        isMobileMenuActive={isMobileMenuActive}
      />
      <Sidebar
        isMobileMenuActive={isMobileMenuActive}
        toggleSidebar={toggleSidebar}
      />
      <div className="main">
        <div className="content">
          <div className="contentdash">
            <div className="settings-container">
              <div className="settings-header">
                <ul className="settings-tabs">
                  <li
                    className={activeTab === "profile" ? "active-tab" : ""}
                    onClick={() => handleTabChange("profile")}
                  >
                    Profile
                  </li>
                  <li
                    className={activeTab === "support" ? "active-tab" : ""}
                    onClick={() => handleTabChange("support")}
                  >
                    Support
                  </li>
                  <li
                    className={activeTab === "security" ? "active-tab" : ""}
                    onClick={() => handleTabChange("security")}
                  >
                    Security
                  </li>
                </ul>
              </div>

              {activeTab === "profile" && (
                <div className="profile-section">
                  <h2 className="profile-title">Profile</h2>
                  <div className="profile-card">
                    <div className="profile-row">
                      <div>
                        <div className="profile-label">Name</div>
                        <div className="profile-value">deo doo</div>
                      </div>
                      <div>
                        <div className="profile-label">User ID</div>
                        <div className="profile-value">
                          NNM1YF
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/f0fa49d11b1b42a66719db23349e3127cf42c268bccba9854cf42fa56de3c4d8?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920"
                            alt="Copy ID"
                            className="copy-icon"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="profile-row">
                      <div>
                        <div className="profile-label">Email</div>
                        <div className="profile-value">
                          leideoviko@gmail.com
                        </div>
                      </div>
                      <div>
                        <div className="profile-label">Account status</div>
                        <div className="profile-value">
                          <img
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ff28497e74784051a96acc7aa8d8c04613769145a4ae2a16fa90aeac41b3da8?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920"
                            alt="Status Icon"
                            style={{
                              marginRight: "8px",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          <span>Not verified</span>
                        </div>
                      </div>
                    </div>

                    <div className="profile-row">
                      <div>
                        <div className="profile-label">Language</div>
                        <div className="profile-value">
                          <img
                            src="./Images/usd.png"
                            alt="Status Icon"
                            style={{
                              marginRight: "8px",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          <span>English</span>
                        </div>
                      </div>
                      <div>
                        <div className="profile-label">Main Currency</div>
                        <div className="profile-value">
                          <img
                            src="./Images/usd.png"
                            alt="Status Icon"
                            style={{
                              marginRight: "8px",
                              width: "20px",
                              height: "20px",
                            }}
                          />
                          <span>USD</span>
                        </div>
                      </div>
                    </div>
                    <div className="profile-row">
                      <div>
                        <div className="profile-label">Invited by</div>
                        <div className="profile-value">None</div>
                      </div>
                       {/* New feature: Upgrade limit transaction */}
                    {/* Upgrade Limit Transaction Section */}
                    <div className="upgrade-transaction">
                      <div>
                        <div className="profile-label">Your Limit Transaction</div>
                      </div>
                      <input
                        type="number"
                        value={transactionLimit}
                        readOnly
                        className="transaction-limit-input"
                      />
                      <button className="submitup-btn" onClick={handleUpgradeLimit}>
                        Upgrade
                      </button>
                    </div>
                  </div>

                  {/* Popup Form for Upgrading Limit */}
                  {showUpgradeForm && (
                    <div className="form-overlay">
                      <div className="form-container">
                        <h2>Upgrade Your Transaction Limit</h2>
                        <form>
                          <div className="form-group">
                            <label>Current Limit</label>
                            <div className="limit-info">USD {transactionLimit}</div>
                          </div>
                          <div className="form-group">
                            <label>Request Limit</label>
                            <input
                              type="number"
                              value={requestedLimit}
                              onChange={(e) => setRequestedLimit(e.target.value)}
                              className="transaction-request-input"
                            />
                          </div>
                          <button type="button" className="upgrade-btn" onClick={handleUpgradeRequest}>
                            Request Upgrade
                          </button>
                          <button type="button" className="cancel-btn" onClick={() => setShowUpgradeForm(false)}>
                            Cancel
                          </button>
                        </form>
                      </div>
                    </div>
                  )}


                  </div>
                  <div style={{ marginTop: "25px" }} className="section">
                    <div className="section-header-container">
                      <div className="section-header">
                        Important Information
                      </div>
                      <div className="divider2"></div>
                    </div>
                    <p style={{ marginTop: "15px" }}>
                      In case of changes to your name, passport or other
                      identity information changes, please contact Support.
                    </p>
                  </div>
                </div>
              )}
              {activeTab === "support" && (
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

              {activeTab === "security" && (
                <div className="security-section">
                  <div className="security-alert">
                    <span>
                      <img
                        style={{ marginLeft: "5px" }}
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/7ff28497e74784051a96acc7aa8d8c04613769145a4ae2a16fa90aeac41b3da8?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920"
                      />
                    </span>
                    <div>
                      <p style={{ fontWeight: "bold" }}>
                        Currently your account is not secured by two-factor
                        (2FA) authentication.
                      </p>
                      <p style={{ fontSize: "15px", marginTop: "5px" }}>
                        We strongly advise you to activate it. You can do this
                        on this page.
                      </p>
                    </div>
                  </div>
                  <h2 className="security-title">Security</h2>
                  <div class="first-section security">
                    <div style={{ padding: "16px" }} class="security-cards">
                      <div class="security-card">
                        <p>
                          Password{" "}
                          <span class="note">
                            (Please verify your phone number)
                          </span>
                        </p>
                        <p></p>
                        <button class="verify-btn">Verify</button>
                      </div>
                      <div class="security-card">
                        <p>
                          Phone number{" "}
                          <span class="note">
                            (Please verify your phone number)
                          </span>
                        </p>
                        <button class="verify-btn">Verify</button>
                      </div>
                      <div class="security-card">
                        <p>
                          Email address{" "}
                          <span class="note">(leideoviko@gmail.com)</span>
                        </p>
                        <button class="change-btn">Change</button>
                      </div>
                    </div>
                    <div style={{ padding: "16px" }} class="security-cards">
                      <div class="security-info">
                        <h3>2FA: Disabled</h3>
                        <div class="security-icon">
                          <img
                            style={{ width: "130px", height: "130px" }}
                            src="https://cdn.builder.io/api/v1/image/assets/TEMP/a17580f1256c55e1bc14792a448a27e0a41e5f06170349c6e7b7406257182948?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920"
                            alt="2FA Icon"
                          />
                        </div>
                        <p
                          style={{ marginTop: "0px" }}
                          lass="security-description"
                        >
                          2FA method can be enabled only after Your phone
                          verification.
                        </p>
                        <button class="verification-btn">
                          Phone Verification
                        </button>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: "25px" }} className="section">
                    <div className="section-header-container">
                      <div className="section-header">Signed In Devices</div>
                      <div className="divider2"></div>
                    </div>
                  </div>

                  <div className="device-table-container">
                    <table className="device-table">
                      <thead>
                        <tr>
                          <th>Signed in</th>
                          <th>Type</th>
                          <th>Device details</th>
                          <th>IP Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Aug 19, 2024, 10:57</td>
                          <td>Browser</td>
                          <td>Chrome 127.0 (Mac OS X) Mac</td>
                          <td>222.165.215.82</td>
                        </tr>
                        {/* More rows as needed */}
                      </tbody>
                    </table>
                  </div>

                  <div style={{ marginTop: "25px" }} className="section">
                    <div className="section-header-container">
                      <div className="section-header">Last Session</div>
                      <div className="divider2"></div>
                    </div>
                  </div>
                  <div className="device-table-container">
                    <table className="device-table">
                      <thead>
                        <tr>
                          <th>Signed in</th>
                          <th>Email</th>
                          <th>Device details</th>
                          <th>IP Address</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Aug 19, 2024, 10:57</td>
                          <td>Leideoviko@gmail.com</td>
                          <td>Chrome 127.0 (Mac OS X) Mac</td>
                          <td>222.165.215.82</td>
                        </tr>
                        <tr>
                          <td>Aug 19, 2024, 10:57</td>
                          <td>Leideoviko@gmail.com</td>
                          <td>Chrome 127.0 (Mac OS X) Mac</td>
                          <td>222.165.215.82</td>
                        </tr>
                        {/* More rows as needed */}
                      </tbody>
                    </table>
                  </div>

                  <div className="deactivate-section-container">
                    <div className="deactivate-section">
                      <p>
                        If you want to stop using swissmoney, you can deactivate
                        your account here.
                      </p>
                      <button className="deactivate-btn">
                        Deactivate Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;

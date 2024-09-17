import React, { useState, useRef } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import "./app.css";
import "../componentstablepage/tablepagesiqr2.css";
import {
  ArrowDropUp,
  ArrowDropDown,
  SwapHoriz as SwapHorizIcon,
} from "@mui/icons-material";
import { AccountBalanceWallet } from "@mui/icons-material"; // Placeholder for crypto icon
import { TextField, InputAdornment } from "@mui/material"; // Import Material UI components
import useMarketStore from "./useMarketStore"; // Import the Zustand store

function Market() {
  // Zustand store hooks
  const {
    activeTab,
    setActiveTab,
    showForm,
    setShowForm,
    selectedOffer,
    setSelectedOffer,
    tradeMyAmount,
    setTradeMyAmount,
    forAmount,
    setForAmount,
    platformFee,
    setPlatformFee,
    totalAmountDue,
    setTotalAmountDue,
    selectedAsset,
    setSelectedAsset,
    dropdownActive,
    setDropdownActive,
    addActiveOffer // Ensure this function exists to handle the addition of active offers
  } = useMarketStore();

  const dropdownRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false); // State to manage the popup visibility

  const [offersData, setOffersData] = useState([
    {
      id: 1,
      date: "2023-09-01",
      user: "jason",
      desk: "Desk A",
      userAvatar: "path_to_avatar/jason.png",
      have: "50 BTC",
      want: "USD",
      minTrade: "1 BTC",
      markup: 2,
      custodianIcon: "./Images/1Asset 6.png",
      custodian: "Tennet",
      action: "Trade",
      tradable: true, // Ensure tradable is true
    },
    {
      id: 2,
      date: "2023-09-02",
      user: "HDC",
      desk: "Desk B",
      userAvatar: "path_to_avatar/HDC.png",
      have: "70 BTC",
      want: "IDR",
      minTrade: "1 BTC",
      markup: 1.5,
      custodianIcon: "./Images/1Asset 6.png",
      custodian: "Tennet",
      action: "Trade",
      tradable: true, // Ensure tradable is true
    },
  ]);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  // Close dropdown when clicked outside
  const handleClickOutside = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setDropdownActive(false);
    }
  };

  const handleConfirmTrade = () => {
    if (selectedOffer) {
      const updatedOffers = offersData.map((offer) =>
        offer.id === selectedOffer.id
          ? { ...offer, action: "Not Tradable", tradable: false } // Update status
          : offer
      );
      setOffersData(updatedOffers);
  
      // Add to Zustand store
      addActiveOffer({
        ...selectedOffer,
        tradeAmount: tradeMyAmount,
        receiveAmount: forAmount,
        platformFee,
        totalAmountDue,
        status: "Not Tradable", // Ensure status is "Not Tradable"
        date: new Date().toLocaleString(),
      });
  
      setShowForm(false);
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 3000);
    }
  };
  

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle asset selection
  const handleAssetSelect = (asset) => {
    setSelectedAsset(asset);
    setDropdownActive(false);
  };

  // Function to handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Filter data based on active tab (USDT or USDC)
  const filteredData = offersData.map((offer) => ({
    ...offer,
    have:
      activeTab === "USDT"
        ? offer.have.replace("BTC", "USDT")
        : offer.have.replace("BTC", "USDC"), // Change "Have" based on tab
    want: offer.want.includes("USD") ? "USD" : "IDR", // Change "Want" to either USD or IDR
  }));

  const handleTradeClick = (offer) => {
    setSelectedOffer(offer); // Set the selected offer
    setShowForm(true); // Show the form
    setTradeMyAmount(0); // Reset trade amount
    setForAmount(0); // Reset for amount
    setPlatformFee(0); // Reset platform fee
    setTotalAmountDue(0); // Reset total amount due
  };

  const closeTradeForm = () => {
    setShowForm(false); // Hide the form
    setSelectedOffer(null); // Reset the selected offer
  };

  const handleTradeMyAmountChange = (value) => {
    const amount = parseFloat(value) || 0;
    setTradeMyAmount(amount);

    const markupAmount = amount * (selectedOffer.markup / 100); // Calculate markup
    const fee = (amount + markupAmount) * 0.005; // Calculate platform fee (0.5%)

    setPlatformFee(fee);
    setTotalAmountDue(amount + markupAmount + fee); // Calculate total amount due including markup and fee
  };

  const handleForAmountChange = (value) => {
    // Get the value for HAVE and ensure max input for "For" amount
    const haveAmount = parseFloat(selectedOffer.have.replace(/[^\d.]/g, "")); // Remove non-numeric chars
    const inputValue = Math.min(parseFloat(value) || 0, haveAmount); // Ensure the user cannot exceed "have" amount
    setForAmount(inputValue);
  };

  return (
    <div className="dashboard">
      <Header />
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="contentdash">
            <h2 className="page-title">All Offers</h2>

            {/* Tab section */}
            <div className="crypto-tabs">
              <button
                className={`crypto-tab ${activeTab === "USDT" ? "active" : ""}`}
                onClick={() => handleTabClick("USDT")}
              >
                <div className="crypto-content">
                  <div className="crypto-header">
                    <div className="crypto-logo-section">
                      <AccountBalanceWallet className="crypto-logo" />
                      <span className="crypto-name">USDT</span>
                    </div>
                    <ArrowDropUp className="crypto-change-icon positive" />
                  </div>
                  <div className="crypto-pricing">
                    <div className="crypto-value">$1,131,123</div>
                    <div className="crypto-change positive">(+0.01)</div>
                  </div>
                </div>
              </button>

              <button
                className={`crypto-tab ${activeTab === "USDC" ? "active" : ""}`}
                onClick={() => handleTabClick("USDC")}
              >
                <div className="crypto-content">
                  <div className="crypto-header">
                    <div className="crypto-logo-section">
                      <AccountBalanceWallet className="crypto-logo" />
                      <span className="crypto-name">USDC</span>
                    </div>
                    <ArrowDropDown className="crypto-change-icon negative" />
                  </div>
                  <div className="crypto-pricing">
                    <div className="crypto-value">$1,000,000</div>
                    <div className="crypto-change negative">(-0.01)</div>
                  </div>
                </div>
              </button>
            </div>

            {/* Table section */}
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: "center" }}>Date/User</th>
                    <th style={{ textAlign: "center" }}>Custodian</th>
                    <th style={{ textAlign: "center" }}>I Have</th>
                    <th style={{ textAlign: "center" }}>I Want</th>
                    <th style={{ textAlign: "center" }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <div className="user-info">
                          <img
                            src={row.userAvatar}
                            alt={row.user}
                            className="user-avatar"
                          />
                          <div>
                            <span className="user-name">{row.user}</span>
                            <span className="user-date">{row.date}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div
                          className="custodian-info"
                          style={{
                            display: "flex",
                            justifyContent: "center", // Centers the content vertically
                            alignItems: "center", // Centers the content horizontally
                          }}
                        >
                          <img
                            style={{ width: "25px" }}
                            src={row.custodianIcon}
                            alt={row.custodian}
                            className="custodian-icon"
                          />
                          <span>{row.custodian}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ width: "auto" }} className="asset-info">
                          <div className="icon-and-value">
                            <img
                              src={
                                activeTab === "USDT"
                                  ? "Images/T.png"
                                  : "Images/S.png"
                              }
                              alt={activeTab}
                              className="asset-icon"
                            />
                            <div className="value-and-min">
                              <span>{row.have}</span>
                              <span className="min-value">
                                min: {row.minTrade}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ paddingLeft: "0px" }}>
                        <div style={{ width: "auto" }} className="asset-info">
                          <div className="icon-and-value">
                            <img
                              src={
                                row.want.includes("USD")
                                  ? "Images/usd.png"
                                  : "Images/indoflag.png"
                              }
                              alt={row.want.includes("USD") ? "USD" : "IDR"}
                              className="asset-icon"
                            />
                            <span>
                              {row.want} +{row.markup}%
                            </span>
                          </div>
                        </div>
                      </td>
                      <td
                        style={{
                          textAlign: "center", // Center horizontally
                          verticalAlign: "middle", // Center vertically
                          height: "60px", // Set a height to help with vertical alignment
                        }}
                      >
                        <button
                          className={row.tradable ? "trade-btn" : "disabled-btn"}
                          disabled={!row.tradable}
                          onClick={() => handleTradeClick(row)}
                        >
                          {row.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {showPopup && (
              <div
                style={{
                  position: "fixed",
                  top: "20%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  backgroundColor: "rgba(0,0,0,0.8)",
                  color: "white",
                  padding: "20px",
                  zIndex: 1000,
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                Your data has been added to Active Offers!
              </div>
            )}

            {/* Show Trade Form Modal */}
            {showForm && selectedOffer && (
              <div
                style={{
                  position: "fixed", // Ensure the modal is fixed to the viewport
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.7)", // Slightly darker overlay
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999, // High z-index to ensure it is above other elements
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "800px", // Adjust width as needed
                    height: "auto",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    zIndex: 10000, // Ensure the modal content is also on top
                  }}
                >
                  <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
                    Trade
                  </h2>
                  <div className="divider2"></div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "stretch", // Ensures the divider stretches with content
                      justifyContent: "space-between",
                      marginBottom: "20px",
                      minHeight: "200px", // Set a minimum height to ensure content stretches the divider
                    }}
                  >
                    {/* Left Side with more details */}
                    <div
                      style={{
                        flex: "1",
                        marginRight: "10px",
                        backgroundColor: "#fff", // Correct format for background color
                        padding: "15px",
                        borderRadius: "10px",
                        color: "#333",
                        fontSize: "14px",
                      }}
                    >
                      <p>
                        <strong>Date/Time:</strong> {selectedOffer.date}
                      </p>
                      <p>
                        <strong>User:</strong> {selectedOffer.user}
                      </p>
                      <p>
                        <strong>Desk:</strong> {selectedOffer.desk}
                      </p>
                      <p>
                        <strong>Custodian:</strong> {selectedOffer.custodian}
                      </p>
                      <p>
                        <strong>Have:</strong> {selectedOffer.have}
                      </p>
                      <p>
                        <strong>Min Trade:</strong> {selectedOffer.minTrade}
                      </p>
                      <p>
                        <strong>Want:</strong> {selectedOffer.want} +
                        {selectedOffer.markup}%
                      </p>
                    </div>

                    {/* Vertical Divider */}
                    <div
                      style={{
                        width: "1px",
                        backgroundColor: "#ccc", // Gray line
                        height: "auto", // Set to auto so it stretches with content
                        margin: "0 10px",
                      }}
                    ></div>

                    {/* Right Side with input fields and controls */}
                    <div
                      style={{
                        flex: "2",
                        marginLeft: "10px",
                        padding: "15px",
                        fontSize: "14px",
                      }}
                    >
                      <div style={{ marginBottom: "10px" }}>
                        <label
                          style={{ display: "block", marginBottom: "5px" }}
                        ></label>
                        <div
                          className="dropdowntf-container"
                          ref={dropdownRef}
                          style={{
                            width: "100%",
                            position: "relative",
                            marginBottom: "10px",
                          }}
                        >
                          <button
                            className="dropdowntf-button"
                            onClick={toggleDropdown}
                            style={{
                              width: "100%",
                              padding: "10px",
                              textAlign: "left",
                              border: "1px solid #ccc",
                              backgroundColor: "#f0f0f0",
                              cursor: "pointer",
                              position: "relative",
                              zIndex: 1,
                            }}
                          >
                            {/* Display "Select Asset" if no asset is selected yet */}
                            {selectedAsset ? selectedAsset : "Select Asset"}
                            <span className="caret" style={{ float: "right" }}>
                              &#9660;
                            </span>
                          </button>
                          {dropdownActive && (
                            <div
                              className="dropdowntf-content open"
                              style={{
                                position: "absolute",
                                top: "100%",
                                width: "100%",
                                backgroundColor: "#fff",
                                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
                                zIndex: 10,
                              }}
                            >
                              <div
                                className="dropdown-item"
                                onClick={() => handleAssetSelect("USD")}
                                style={{
                                  padding: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                USD
                              </div>
                              <div
                                className="dropdown-item"
                                onClick={() => handleAssetSelect("IDR")}
                                style={{
                                  padding: "10px",
                                  cursor: "pointer",
                                }}
                              >
                                IDR
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div style={{ display: "flex", marginBottom: "20px" }}>
                        <div style={{ flex: "1", marginRight: "10px" }}>
                          <TextField
                            label="Trade My"
                            type="number"
                            value={tradeMyAmount}
                            onChange={(e) =>
                              handleTradeMyAmountChange(e.target.value)
                            }
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  {selectedAsset}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                        <div style={{ textAlign: "center", margin: "auto" }}>
                          <SwapHorizIcon
                            style={{
                              cursor: "pointer",
                              width: "24px",
                              height: "24px",
                            }}
                          />
                        </div>
                        <div style={{ flex: "1", marginLeft: "10px" }}>
                          <TextField
                            label="For"
                            type="number"
                            value={forAmount}
                            onChange={(e) =>
                              handleForAmountChange(e.target.value)
                            } // Max value logic here
                            fullWidth
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  {activeTab === "USDT" ? "USDT" : "USDC"}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: "10px" }}>
                        <p>
                          <strong>Markup:</strong> {selectedOffer.markup}%
                        </p>
                        <p>
                          <strong>Platform Fee:</strong>{" "}
                          {platformFee.toFixed(2)} {selectedAsset}
                        </p>
                        <p>
                          <strong>Total Amount Due:</strong>{" "}
                          {totalAmountDue.toFixed(2)} {selectedAsset}
                        </p>
                      </div>

                      <div style={{ marginBottom: "10px" }}>
                        <TextField label="2FA Code" type="text" fullWidth />
                      </div>

                      <div style={{ marginBottom: "10px" }}>
                        <input type="checkbox" id="agree" />
                        <label htmlFor="agree" style={{ marginLeft: "10px" }}>
                          I agree to the Terms and Conditions
                        </label>
                      </div>

                      {/* Buttons */}
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: "10px",
                          marginTop: "10px",
                        }}
                      >
                        <button
                          onClick={handleConfirmTrade} // Call handleConfirmTrade on confirmation
                          style={{
                            backgroundColor: "#333",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Confirm
                        </button>
                        <button
                          onClick={closeTradeForm}
                          style={{
                            backgroundColor: "#e74c3c",
                            color: "white",
                            padding: "10px 20px",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Market;

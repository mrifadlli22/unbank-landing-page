import React, { useState, useRef } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import "./app.css";
import "../componentstablepage/tablepagesiqr2.css";
import {
  ArrowDropUp,
  ArrowDropDown,
} from "@mui/icons-material";
import { AccountBalanceWallet } from "@mui/icons-material";
import {
  TextField,
} from "@mui/material";

function NewOffer() {
  const [selectedAssetHave, setSelectedAssetHave] = useState(""); // Initially empty for "Select Asset"
  const [selectedAssetWant, setSelectedAssetWant] = useState(""); // Initially empty for "Select Asset"
  const [dropdownActiveHave, setDropdownActiveHave] = useState(false);
  const [dropdownActiveWant, setDropdownActiveWant] = useState(false);

  const [activeTab, setActiveTab] = useState("USDT"); // State for active tab
  const [usdtOffersData, setUsdtOffersData] = useState([
    {
      id: 1,
      date: "2023-09-01",
      user: "jason",
      desk: "Desk A",
      userAvatar: "path_to_avatar/jason.png",
      have: "50 USDT",
      want: "USD +2%",
      minTrade: "1 USDT",
      custodianIcon: "./Images/1Asset 6.png",
      custodian: "Tennet",
      action: "Trade",
    },
  ]);

  const [usdcOffersData, setUsdcOffersData] = useState([
    {
      id: 2,
      date: "2023-09-02",
      user: "jason",
      desk: "Desk B",
      userAvatar: "path_to_avatar/jason.png",
      have: "88.999 USDC +1.5%",
      want: "IDR",
      minTrade: "0.5 USDC",
      custodianIcon: "./Images/1Asset 6.png",
      custodian: "Tennet",
      action: "Trade",
    },
  ]);

  const dropdownRefHave = useRef(null);
  const dropdownRefWant = useRef(null);

  // Toggle dropdown visibility
  const toggleDropdownHave = () => {
    setDropdownActiveHave(!dropdownActiveHave);
  };

  const toggleDropdownWant = () => {
    setDropdownActiveWant(!dropdownActiveWant);
  };

  const handleAssetSelectHave = (asset) => {
    setSelectedAssetHave(asset);
    setDropdownActiveHave(false);
  };

  const handleAssetSelectWant = (asset) => {
    setSelectedAssetWant(asset);
    setNewOffer((prevOffer) => ({
      ...prevOffer,
      wantAsset: asset, // Update newOffer with selected asset
    }));
    setDropdownActiveWant(false);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRefHave.current &&
      !dropdownRefHave.current.contains(event.target)
    ) {
      setDropdownActiveHave(false);
    }
    if (
      dropdownRefWant.current &&
      !dropdownRefWant.current.contains(event.target)
    ) {
      setDropdownActiveWant(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [showForm, setShowForm] = useState(false); // For showing the new offer form
  const [editMode, setEditMode] = useState(false); // Track if we are in edit mode
  const [editingRowId, setEditingRowId] = useState(null); // Track the row being edited
  const [newOffer, setNewOffer] = useState({
    haveAsset: "USDT", // I HAVE select
    haveAmount: 0,
    minAmount: 0,
    markup: 0,
    custody: "Tennet", // Fixed value
    wantAsset: "USD", // I WANT select
    wantMarkup: 0,
  });

  // Handle showing the form for a new offer
  const handleCreateNewOfferClick = () => {
    setEditMode(false); // Ensure we are not in edit mode
    setShowForm(true); // Show form when the button is clicked
  };

  // Handle closing the form
  const closeNewOfferForm = () => {
    setShowForm(false); // Close the form
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewOffer((prevOffer) => ({
      ...prevOffer,
      [name]: value,
    }));
  };

  // Calculate total to receive for I HAVE Section
  const calculateTotalHave = () => {
    const value = newOffer.haveAmount * (1 + newOffer.markup / 100);
    return value - value * 0.005; // Subtract platform fee (0.5%)
  };

  // Calculate total to receive for I WANT Section
  const calculateTotalWant = () => {
    const value = newOffer.wantValue * (1 + newOffer.wantMarkup / 100);
    return value - value * 0.005; // Subtract platform fee (0.5%)
  };

  // Handle adding a new offer or updating an existing one
  const handleSaveOffer = () => {
    const newId = (activeTab === "USDT" ? usdtOffersData : usdcOffersData).length + 1;

    const newOfferData = {
      id: editingRowId || newId,
      date: new Date().toISOString().split("T")[0], // Today's date
      user: "new_user", // Placeholder for now
      desk: "New Desk", // Placeholder for now
      userAvatar: "path_to_avatar/new_user.png", // Placeholder for now
      have: `${newOffer.haveAmount} ${newOffer.haveAsset}`,
      want: `${newOffer.wantAsset} +${newOffer.wantMarkup}%`,
      minTrade: `${newOffer.minAmount} ${newOffer.haveAsset}`,
      custodianIcon: "./Images/1Asset 6.png", // Placeholder icon
      custodian: "Tennet",
      action: "Trade",
    };

    if (editMode) {
      const updatedData = newOffer.haveAsset === "USDT"
        ? usdtOffersData.map((offer) =>
            offer.id === editingRowId ? newOfferData : offer
          )
        : usdcOffersData.map((offer) =>
            offer.id === editingRowId ? newOfferData : offer
          );
      if (newOffer.haveAsset === "USDT") {
        setUsdtOffersData(updatedData);
      } else {
        setUsdcOffersData(updatedData);
      }
    } else {
      if (newOffer.haveAsset === "USDT") {
        setUsdtOffersData([...usdtOffersData, newOfferData]);
      } else {
        setUsdcOffersData([...usdcOffersData, newOfferData]);
      }
    }

    closeNewOfferForm();
  };

  // Handle deleting an offer
  const handleDeleteOffer = (id, asset) => {
    const updatedData =
      asset === "USDT"
        ? usdtOffersData.filter((offer) => offer.id !== id)
        : usdcOffersData.filter((offer) => offer.id !== id);
    if (asset === "USDT") {
      setUsdtOffersData(updatedData);
    } else {
      setUsdcOffersData(updatedData);
    }
  };

  // Handle clicking the edit button
  const handleEditOffer = (offer) => {
    setNewOffer({
      haveAsset: offer.have.split(" ")[1],
      haveAmount: parseFloat(offer.have),
      minAmount: parseFloat(offer.minTrade),
      markup: parseFloat(offer.want.split("+")[1]),
      custody: offer.custody,
      wantAsset: offer.want.split(" ")[0],
      wantMarkup: parseFloat(offer.want.split("+")[1]),
    });

    setSelectedAssetHave(offer.have.split(" ")[1]); // Set selected asset for "I HAVE"
    setSelectedAssetWant(offer.want.split(" ")[0]); // Set selected asset for "I WANT"
    
    setEditingRowId(offer.id);
    setEditMode(true);
    setShowForm(true); // Show form for editing
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab); // Update the active tab (USDT/USDC)
  };

  // Filtered data based on the active tab (USDT or USDC)
  const filteredData = activeTab === "USDT" ? usdtOffersData : usdcOffersData;

  return (
    <div className="dashboard">
      <Header />
      <Sidebar />
      <div className="main">
        <div className="content">
          <div className="contentdash">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className="page-title">Create New Offers</h2>
 
              <button
                style={{
                  padding: "5px 15px",
                  backgroundColor: "#333",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                  fontSize: "14px",
                  lineHeight: "1.2",
                }}
                onClick={handleCreateNewOfferClick}
              >
                Add New Offer
              </button>
            </div>

            {/* Tab Buttons */}
            <div className="crypto-tabs">
              <button className={`crypto-tab ${activeTab === "USDT" ? "active" : ""}`} onClick={() => handleTabClick("USDT")}>
                <div className="crypto-content">
                  <div className="crypto-header">
                    <div className="crypto-logo-section">
                    <img style={{width:"20px"}} src="./Images/T.png" className="crypto-logo" />
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

              <button className={`crypto-tab ${activeTab === "USDC" ? "active" : ""}`} onClick={() => handleTabClick("USDC")}>
                <div className="crypto-content">
                  <div className="crypto-header">
                    <div className="crypto-logo-section">
                    <img style={{width:"20px"}} src="./Images/S.png" className="crypto-logo" />
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
                          <img src={row.userAvatar} alt={row.user} className="user-avatar" />
                          <div>
                            <span className="user-name">{row.user}</span>
                            <span className="user-date">{row.date}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="custodian-info" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                          <img style={{ width: "25px" }} src={row.custodianIcon} alt={row.custodian} className="custodian-icon" />
                          <span style={{ textAlign: "center" }}>{row.custodian}</span>
                        </div>
                      </td>
                      <td>
                        <div style={{ width: "auto" }} className="asset-info">
                          <div className="icon-and-value">
                            <img src={activeTab === "USDT" ? "Images/T.png" : "Images/S.png"} alt={activeTab} className="asset-icon" />
                            <div className="value-and-min">
                              <span>{row.have}</span>
                              <span className="min-value">min: {row.minTrade}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ width: "auto" }} className="asset-info">
                          <div className="icon-and-value">
                            <img src={row.want.includes("USD") ? "Images/usd.png" : "Images/indoflag.png"} alt={row.want.includes("USD") ? "USD" : "IDR"} className="asset-icon" />
                            <span>{row.want}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: "center", verticalAlign: "middle", height: "60px", padding: "0" }}>
                        <button style={{ backgroundColor: "#333", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", marginRight: "10px" }} onClick={() => handleEditOffer(row)}>
                          Edit
                        </button>
                        <button style={{ backgroundColor: "#e74c3c", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={() => handleDeleteOffer(row.id, newOffer.haveAsset)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* New Offer Form */}
            {showForm && (
              <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999 }}>
                <div style={{ backgroundColor: "white", padding: "20px", borderRadius: "10px", width: "800px", height: "auto", maxHeight: "90vh", overflowY: "auto", zIndex: 10000 }}>
                  <h2 style={{ marginBottom: "20px", textAlign: "center" }}>{editMode ? "Edit Offer" : "Add New Offer"}</h2>
                  <div className="divider2"></div>

                  {/* I HAVE Section */}
                  <h3>I HAVE</h3>
                  <div style={{ display: "flex", marginBottom: "20px" }}>
                    <div style={{ display: "block" }}>
                      <label style={{ display: "block" }}> Select Asset </label>
                      <div style={{ marginBottom: "10px" }}>
                        <div className="dropdowntf-container" ref={dropdownRefHave} style={{ width: "100%", position: "relative", height: "40px", borderRadius: "0px" }}>
                          <button
                            className="dropdowntf-button"
                            onClick={editMode ? null : toggleDropdownHave}
                            style={{
                              width: "100%",
                              padding: "10px",
                              textAlign: "left",
                              border: "1px solid #ccc",
                              backgroundColor: "#fff",
                              cursor: editMode ? "not-allowed" : "pointer",
                              position: "relative",
                              zIndex: 1,
                              borderRadius: "2px",
                            }}
                            disabled={editMode}
                          >
                            {selectedAssetHave ? selectedAssetHave : "Select Asset"}
                            <span className="caret" style={{ float: "right" }}>&#9660;</span>
                          </button>
                          {dropdownActiveHave && !editMode && (
                            <div className="dropdowntf-content open" style={{ position: "absolute", top: "100%", width: "100%", backgroundColor: "#fff", boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", zIndex: 10 }}>
                              <div className="dropdown-item" onClick={() => handleAssetSelectHave("USDT")} style={{ padding: "10px", cursor: "pointer" }}>USDT</div>
                              <div className="dropdown-item" onClick={() => handleAssetSelectHave("USDC")} style={{ padding: "10px", cursor: "pointer" }}>USDC</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ flex: "1", marginLeft: "10px" }}>
                      <label htmlFor="custody">Custody Account</label>
                      <input id="custody" type="text" value="Tennet" disabled style={{ width: "100%", padding: "10px" }} />
                    </div>
                  </div>

                  <div style={{ display: "flex", marginBottom: "20px" }}>
                    <div style={{ flex: "1", marginRight: "10px" }}>
                      <label htmlFor="haveAmount">Amount</label>
                      <input id="haveAmount" type="number" name="haveAmount" value={newOffer.haveAmount} onChange={handleInputChange} style={{ width: "100%", padding: "10px" }} />
                    </div>
                    <div style={{ flex: "1", marginRight: "10px" }}>
                      <label htmlFor="minAmount">Min Trade</label>
                      <input id="minAmount" type="number" name="minAmount" value={newOffer.minAmount} onChange={handleInputChange} style={{ width: "100%", padding: "10px" }} />
                    </div>
                    <div style={{ flex: "1", marginLeft: "10px" }}>
                      <label htmlFor="markup">Fee %</label>
                      <input id="markup" type="number" name="markup" value={newOffer.markup} onChange={handleInputChange} style={{ width: "100%", padding: "10px" }} />
                    </div>
                    <div style={{ flex: "1", marginLeft: "10px" }}>
                      <label htmlFor="value">Value</label>
                      <input id="value" type="number" value={calculateTotalHave().toFixed(2)} disabled style={{ width: "100%", padding: "10px" }} />
                    </div>
                  </div>

                  {/* I WANT Section */}
                  <h3>I WANT</h3>
                  <div style={{ display: "flex", marginBottom: "20px" }}>
                    <div style={{ display: "block" }}>
                      <label style={{ display: "block" }}> Select Asset </label>
                      <div style={{ marginBottom: "10px" }}>
                        <div className="dropdowntf-container" ref={dropdownRefWant} style={{ width: "100%", position: "relative", height: "40px", borderRadius: "0px" }}>
                          <button
                            className="dropdowntf-button"
                            onClick={toggleDropdownWant}
                            style={{
                              width: "100%",
                              padding: "10px",
                              textAlign: "left",
                              border: "1px solid #ccc",
                              backgroundColor: "#fff",
                              cursor: "pointer",
                              position: "relative",
                              zIndex: 1,
                              borderRadius: "2px",
                            }}
                          >
                            {selectedAssetWant ? selectedAssetWant : "Select Asset"}
                            <span className="caret" style={{ float: "right" }}>&#9660;</span>
                          </button>
                          {dropdownActiveWant && (
                            <div className="dropdowntf-content open" style={{ position: "absolute", top: "100%", width: "100%", backgroundColor: "#fff", boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)", zIndex: 10 }}>
                              <div className="dropdown-item" onClick={() => handleAssetSelectWant("USD")} style={{ padding: "10px", cursor: "pointer" }}>USD</div>
                              <div className="dropdown-item" onClick={() => handleAssetSelectWant("IDR")} style={{ padding: "10px", cursor: "pointer" }}>IDR</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div style={{ flex: "1", marginLeft: "10px" }}>
                      <label htmlFor="wantMarkup">Fee %</label>
                      <input id="wantMarkup" type="number" name="wantMarkup" value={newOffer.wantMarkup} onChange={handleInputChange} style={{ width: "100%", padding: "10px" }} />
                    </div>
                    <div style={{ flex: "1", marginLeft: "10px" }}>
                      <label htmlFor="estimatedValue">Estimated Value</label>
                      <input id="estimatedValue" type="number" value={calculateTotalWant().toFixed(2)} disabled style={{ width: "100%", padding: "10px" }} />
                    </div>
                  </div>

                  {/* 2 Factor Authentication */}
                  <h3>2 FACTOR AUTHENTICATION</h3>
                  <div style={{ display: "flex", marginBottom: "20px" }}>
                    <TextField
                      label="Enter 6 Digit Code"
                      type="text"
                      name="twoFactorCode"
                      value={newOffer.twoFactorCode}
                      onChange={handleInputChange}
                      fullWidth
                    />
                  </div>

                  {/* I Agree Checkbox */}
                  <div style={{ marginBottom: "20px" }}>
                    <input type="checkbox" id="agree" />
                    <label htmlFor="agree" style={{ marginLeft: "10px" }}>I agree to the Terms and Conditions</label>
                  </div>

                  {/* Proceed Button */}
                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                    <button style={{ backgroundColor: "#333", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={handleSaveOffer}>
                      {editMode ? "Save" : "Proceed"}
                    </button>
                    <button onClick={closeNewOfferForm} style={{ backgroundColor: "#e74c3c", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                      Cancel
                    </button>
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

export default NewOffer;

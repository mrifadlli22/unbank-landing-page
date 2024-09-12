import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./app.css";
import "../componentstablepage/tablepagesiqr.css";

function NewOffer() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [formData, setFormData] = useState({
    haveAmount: 0,
    haveMin: 0,
    haveAsset: "",
    haveMarkup: 0,
    wantAsset: "",
    wantMarkup: 0,
    twoFactorCode: "",
  });

  const [totalValue, setTotalValue] = useState(0);
  const [platformFee, setPlatformFee] = useState(0);
  const [totalToReceive, setTotalToReceive] = useState(0);

  const toggleSidebar = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAssetChange = (event) => {
    setFormData({ ...formData, haveAsset: event.target.value });
  };

  const handleWantAssetChange = (event) => {
    setFormData({ ...formData, wantAsset: event.target.value });
  };

  const calculateValues = () => {
    const amount = parseFloat(formData.haveAmount) || 0;
    const fee = amount * 0.005; // 0.5% platform fee
    const totalReceive = amount - fee;

    setTotalValue(amount);
    setPlatformFee(fee);
    setTotalToReceive(totalReceive);
  };

  useEffect(() => {
    calculateValues();
  }, [formData.haveAmount]);

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
            <h2>Create New Offer</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                width: "100%",
                maxWidth: "100%",
              }}
            >
              <h3>I HAVE</h3>
              {/* First Row: Custody Account and Asset */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div style={{ flex: 1, marginRight: "10px" }}>
                  <label>Custody Account</label>
                  <div
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: "10px",
                      borderRadius: "5px",
                      marginTop: "5px",
                      border: "1px solid #ccc", // Remove border
                    }}
                  >
                    <strong>Prime Trust</strong> <br /> $3,514,783.76
                  </div>
                </div>

                <div style={{ flex: 1, marginRight: "10px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                    }}
                  >
                    Asset
                  </label>
                  <FormControl fullWidth>
                    <InputLabel id="have-asset-select-label">Asset</InputLabel>
                    <Select
                      labelId="have-asset-select-label"
                      id="have-asset-select"
                      value={formData.haveAsset}
                      label="Asset"
                      onChange={handleInputChange}
                      name="haveAsset"
                      style={{
                        height: "60px", // Reduced height
                        padding: "10px", // Add padding to match other input fields
                        borderRadius: "5px",
                         boxShadow: "none", // Remove input shadow
                      }}
                    >
                      <MenuItem value="">
                        <em>Select Asset</em>
                      </MenuItem>
                      <MenuItem value="IDR">IDR</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="USDT">USDT</MenuItem>
                      <MenuItem value="USDC">USDC</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              {/* Second Row: Amount, Minimum, and Markup */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div style={{ flex: 1, marginRight: "10px" }}>
                  <label>Amount</label>
                  <input
                    type="number"
                    name="haveAmount"
                    value={formData.haveAmount}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "5px",
                      borderRadius: "5px",
                      height: "55px", // Reduced height
                      border: "1px solid #ccc", // Remove border
                      boxShadow: "none", // Remove input shadow
                    }}
                  />
                </div>
                <div style={{ flex: 1, marginRight: "10px" }}>
                  <label>Minimum</label>
                  <input
                    type="number"
                    name="haveMin"
                    value={formData.haveMin}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "5px",
                      borderRadius: "5px",
                      height: "55px", // Reduced height
                      border: "1px solid #ccc", // Remove border
                      boxShadow: "none", // Remove input shadow
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Markup %</label>
                  <input
                    type="number"
                    name="haveMarkup"
                    value={formData.haveMarkup}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      marginTop: "5px",
                      borderRadius: "5px",
                      height: "55px", // Reduced height
                      border: "1px solid #ccc", // Remove border
                      boxShadow: "none", // Remove input shadow
                    }}
                  />
                </div>
              </div>

              <div
                style={{
                  marginBottom: "10px",
                  textAlign: "center",
                  backgroundColor: "#bbb",
                  padding: "10px",
                  borderRadius: "5px",
                  color: "white",
                  fontSize: "0.9rem",
                }}
              >
                <p>
                  <strong>Total Value:</strong> ${totalValue.toFixed(2)} -{" "}
                  <strong>Platform Fee (0.5%):</strong> $
                  {platformFee.toFixed(2)} = <strong>Total To Receive:</strong>{" "}
                  ${totalToReceive.toFixed(2)}
                </p>
              </div>

              <div className="divider2"></div>

              <h3>I WANT</h3>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "20px",
                }}
              >
                <div style={{ flex: 1, marginRight: "10px" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "5px",
                      fontWeight: "bold",
                    }}
                  >
                    Asset
                  </label>
                  <FormControl fullWidth>
                    <InputLabel id="want-asset-select-label">Asset</InputLabel>
                    <Select
                      labelId="want-asset-select-label"
                      id="want-asset-select"
                      value={formData.wantAsset}
                      label="Asset"
                      onChange={handleWantAssetChange}
                      name="wantAsset"
                      style={{
                        height: "55px",
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc", // Remove border
                        boxShadow: "none", // Remove input shadow
                      }}
                    >
                      <MenuItem value="">
                        <em>Select Asset</em>
                      </MenuItem>
                      <MenuItem value="IDR">IDR</MenuItem>
                      <MenuItem value="USD">USD</MenuItem>
                      <MenuItem value="USDT">USDT</MenuItem>
                      <MenuItem value="USDC">USDC</MenuItem>
                    </Select>
                  </FormControl>
                </div>

                <div style={{ flex: 1, marginRight: "10px" }}>
                  <label>Markup %</label>
                  <input
                    type="number"
                    name="wantMarkup"
                    value={formData.wantMarkup}
                    onChange={handleInputChange}
                    style={{
                      width: "100%",
                      height: "55px",
                      padding: "10px",
                      marginTop: "5px",
                      borderRadius: "5px",
                      border: "1px solid #ccc", // Remove border
                      boxShadow: "none", // Remove input shadow
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>Estimated Value</label>
                  <div
                    style={{
                      backgroundColor: "#f5f5f5",
                      padding: "10px",
                      borderRadius: "5px",
                      marginTop: "5px",
                      height: "55px",
                      border: "1px solid #ccc", // Remove border
                      boxShadow: "none", // Remove input shadow
                    }}
                  >
                    $0.00
                  </div>
                </div>
              </div>

              <div className="divider2"></div>

              <h3>2 Factor Authentication</h3>
              <div style={{ marginBottom: "20px" }}>
                <label>Enter Code from Google Authenticator</label>
                <input
                  type="text"
                  name="twoFactorCode"
                  value={formData.twoFactorCode}
                  onChange={handleInputChange}
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    borderRadius: "5px",
                    border: "1px solid #ccc", // Remove border
                    boxShadow: "none", // Remove input shadow
                  }}
                />
              </div>

              <div style={{ marginBottom: "20px" }}>
                <input
                  type="checkbox"
                  id="agree"
                  name="agree"
                  style={{ marginRight: "10px" }}
                />
                <label htmlFor="agree">
                  I agree to the{" "}
                  <a href="/terms" style={{ color: "#3498db" }}>
                    Terms and Conditions
                  </a>
                </label>
              </div>

              <button
                style={{
                  width: "100%",
                  padding: "15px",
                  backgroundColor: "#333",
                  color: "white",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOffer;

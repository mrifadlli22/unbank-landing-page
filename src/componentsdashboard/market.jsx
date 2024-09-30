import React, { useState, useEffect, useRef } from "react";
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
    addActiveOffer, // Ensure this function exists to handle the addition of active offers
  } = useMarketStore();

 

  const resetForm = () => {
    setSelectedOffer(null);
    setTradeMyAmount(0);
    setForAmount(0);
    setPlatformFee(0);
    setTotalAmountDue(0);
    setSelectedAsset(null);
    setFormattedTradeAmount(""); // Reset formatted value
    setShowForm(false);
  };

  const dropdownRef = useRef(null);
  const [showPopup, setShowPopup] = useState(false); // State to manage the popup visibility
  const [formattedTradeAmount, setFormattedTradeAmount] = useState(""); // State untuk menyimpan nilai yang terformat

  // Pisahkan data menjadi dua state: usdtOffersData dan usdcOffersData
  const [usdtOffersData, setUsdtOffersData] = useState([
    {
      id: 1,
      date: "2023-09-01",
      user: "jason",
      desk: "Desk A",
      userAvatar: "path_to_avatar/jason.png",
      have: "50 USDT",
      want: "USD",
      minTrade: "1 USDT",
      markup: 2,
      custodianIcon: "./Images/1Asset 6.png",
      custodian: "Tennet",
      action: "Trade",
      tradable: true,
    },
    {
      id: 3,
      date: "2023-09-03",
      user: "alice",
      desk: "Desk C",
      userAvatar: "path_to_avatar/alice.png",
      have: "100 USDT",
      want: "IDR",
      minTrade: "5 USDT",
      markup: 1.8,
      custodianIcon: "./Images/1Asset 6.png",
      custodian: "Tennet",
      action: "Trade",
      tradable: true,
    },
    {
      id: 4,
      date: "2023-09-04",
      user: "bob",
      desk: "Desk D",
      userAvatar: "path_to_avatar/bob.png",
      have: "75 USDT",
      want: "USD",
      minTrade: "10 USDT",
      markup: 2.5,
      custodianIcon: "./Images/1Asset 6.png",
      custodian: "Tennet",
      action: "Trade",
      tradable: true,
    },
  ]);

  const [usdcOffersData, setUsdcOffersData] = useState([
    {
      id: 2,
      date: "2023-09-02",
      user: "jason",
      desk: "Desk B",
      userAvatar: "path_to_avatar/jason.png",
      have: "88.999 USDC",
      want: "IDR",
      minTrade: "0.5 USDC",
      custodianIcon: "./Images/1Asset 6.png",
      custodian: "Tennet",
      action: "Trade",
      markup: 1.5,
      tradable: true,
    },
    {
      id: 5,
      date: "2023-09-05",
      user: "carol",
      desk: "Desk E",
      userAvatar: "path_to_avatar/carol.png",
      have: "120 USDC",
      want: "IDR",
      minTrade: "2 USDC",
      markup: 1.2,
      custodianIcon: "./Images/1Asset 6.png",
      custodian: "Tennet",
      action: "Trade",
      tradable: true,
    },
    {
      id: 6,
      date: "2023-09-06",
      user: "dave",
      desk: "Desk F",
      userAvatar: "path_to_avatar/dave.png",
      have: "200 USDC",
      want: "USD",
      minTrade: "20 USDC",
      markup: 1.7,
      custodianIcon: "./Images/1Asset 6.png",
      custodian: "Tennet",
      action: "Trade",
      tradable: true,
    },
  ]);

  // Fungsi untuk memformat angka ke dalam format yang diinginkan tanpa desimal .00
  const formatNumber = (value) => {
    if (!value) return "";
    const integerPart = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); // Tambah koma untuk pemisah ribuan
    return integerPart; // Hanya mengembalikan angka dengan pemisah ribuan tanpa desimal
  };

  function calculateQuotedPrice(offer) {
    // Pastikan nilai 'have' dan 'markup' ada dan valid
    const basePrice = parseFloat(offer.have);
    const markup = parseFloat(offer.markup) / 100;

    // Periksa apakah basePrice dan markup adalah angka
    if (isNaN(basePrice) || isNaN(markup)) {
      return "Invalid data"; // Atau pesan kesalahan lain yang sesuai
    }

    const quotedPrice = basePrice * (1 + markup);
    return quotedPrice.toFixed(2); // Mengembalikan harga yang telah diformat
  }

  // Fungsi untuk membersihkan format (menghapus koma)
  const cleanNumber = (value) => {
    return value.replace(/,/g, "");
  };

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
      const updatedOffers =
        activeTab === "USDT" ? usdtOffersData : usdcOffersData;
      const updatedOffersData = updatedOffers.map((offer) =>
        offer.id === selectedOffer.id
          ? { ...offer, action: "Not Tradable", tradable: false } // Update status
          : offer
      );
  
      if (activeTab === "USDT") {
        setUsdtOffersData(updatedOffersData);
      } else {
        setUsdcOffersData(updatedOffersData);
      }
  
      // Add to Zustand store with explicit asset type
      addActiveOffer({
        ...selectedOffer,
        tradeAmount: tradeMyAmount, // Value input in the form
        receiveAmount: forAmount, // Value input in the form
        platformFee,
        totalAmountDue,
        status: "Ongoing",
        date: new Date().toLocaleString(),
        assetType: selectedAsset, // Store the asset type explicitly
        tabType: activeTab, // Store the active tab explicitly
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
    setSelectedAsset(asset); // Simpan asset terpilih ke Zustand store
    setDropdownActive(false); // Tutup dropdown setelah memilih aset
  };

  // Function to handle tab switching
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Filter data based on active tab (USDT or USDC)
  const filteredData = activeTab === "USDT" ? usdtOffersData : usdcOffersData;

  const handleTradeClick = (offer) => {
    setSelectedOffer(offer); // Set the selected offer
    setSelectedAsset(offer.want); // Set selectedAsset based on "WANT"
    setShowForm(true); // Show the form
    setTradeMyAmount(0); // Reset trade amount
    setForAmount(0); // Reset for amount
    setPlatformFee(0); // Reset platform fee
    setTotalAmountDue(0); // Reset total amount due
  };

  const closeTradeForm = () => {
    setShowForm(false); // Hide the form
    setSelectedOffer(null); // Reset the selected offer
    resetForm(); // Reset form setelah Confirm
  };

  // Saat pengguna mengetik di text field
  const handleTradeMyAmountChange = (value) => {
    const cleanValue = cleanNumber(value); // Hapus koma agar bisa diparse
    const amount = parseFloat(cleanValue) || 0;
    setTradeMyAmount(amount);

    const markupAmount = amount * (selectedOffer?.markup / 100 || 0); // Hitung markup
    const fee = (amount + markupAmount) * 0.005; // Hitung biaya platform (0.5%)

    setPlatformFee(fee);
    setTotalAmountDue(amount + markupAmount + fee); // Hitung total harga termasuk markup dan biaya

    // Format angka ketika pengguna mengetik
    setFormattedTradeAmount(formatNumber(cleanValue));
  };
  const handleForAmountChange = (value) => {
    // Normalize the input by replacing commas with periods
    const normalizedValue = value.replace(",", ".");

    // Attempt to parse the normalized value as a float
    const parsedValue = parseFloat(normalizedValue);

    // Get the value for HAVE and ensure max input for "For" amount
    const haveAmount = parseFloat(selectedOffer.have.replace(/[^\d.]/g, "")); // Remove non-numeric chars

    // If the input is a valid number and not just a period or empty, enforce constraints
    if (!isNaN(parsedValue) && !normalizedValue.endsWith(".")) {
      // Ensure the user cannot exceed the "have" amount
      const inputValue = Math.min(parsedValue, haveAmount);
      // Convert back to string with comma if needed
      setForAmount(inputValue.toString().replace(".", ","));
    } else {
      // If the input is not a valid number or is in the process of being typed, allow it
      setForAmount(value);
    }
  };

  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  const toggleSidebar = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
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
                      <img
                        style={{ width: "20px" }}
                        src="./Images/T.png"
                        className="crypto-logo"
                      />
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
                      <img
                        style={{ width: "20px" }}
                        src="./Images/S.png"
                        className="crypto-logo"
                      />
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
                            style={{ width: "28px" }}
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
                              {row.want}{" "}
                              {row.want.includes("%") ? "" : `+${row.markup}%`}
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
                          className={
                            row.tradable ? "trade-btn" : "disabled-btn"
                          }
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
                  position: "fixed",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.7)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: 9999,
                }}
              >
                <div
                  style={{
                    backgroundColor: "white",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "800px",
                    height: "auto",
                    maxHeight: "90vh",
                    overflowY: "auto",
                    zIndex: 10000,
                    position: "relative",
                  }}
                >
                  <button
                    onClick={closeTradeForm}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "transparent",
                      border: "none",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    ×
                  </button>
                  <h2 style={{ marginBottom: "20px", textAlign: "center" }}>
                    Trade
                  </h2>
                  <div className="divider2"></div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "stretch",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                      minHeight: "200px",
                    }}
                  >
                    {/* Left Side with more details */}
                    <div
                      style={{
                        flex: "1",
                        marginRight: "10px",
                        backgroundColor: "#f9f9f9",
                        padding: "15px",
                        borderRadius: "10px",
                        color: "#333",
                        fontSize: "14px",
                      }}
                    >
                      {[
                        { label: "Date/Time", value: selectedOffer.date },
                        { label: "User", value: selectedOffer.user },
                        { label: "Desk", value: selectedOffer.desk },
                        {
                          label: "Custodian",
                          value: (
                            <>
                              <img
                                src={selectedOffer.custodianIcon}
                                alt={selectedOffer.custodian}
                                style={{
                                  width: "20px",
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                              />
                              {selectedOffer.custodian}
                            </>
                          ),
                        },
                        {
                          label: "Have",
                          value: (
                            <>
                              <img
                                src={
                                  activeTab === "USDT"
                                    ? "Images/T.png"
                                    : "Images/S.png"
                                }
                                alt={activeTab}
                                style={{
                                  width: "12px",
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                              />
                              {selectedOffer.have}
                            </>
                          ),
                        },
                        {
                          label: "Min Trade",
                          value: (
                            <>
                              <img
                                src={
                                  activeTab === "USDT"
                                    ? "Images/T.png"
                                    : "Images/S.png"
                                }
                                alt={activeTab}
                                style={{
                                  width: "12px",
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                              />
                              {selectedOffer.minTrade}
                            </>
                          ),
                        },
                        {
                          label: "Want",
                          value: (
                            <>
                              <img
                                src={
                                  selectedOffer.want.includes("USD")
                                    ? "Images/usd.png"
                                    : "Images/indoflag.png"
                                }
                                alt={
                                  selectedOffer.want.includes("USD")
                                    ? "USD"
                                    : "IDR"
                                }
                                style={{
                                  width: "12px",
                                  marginLeft: "5px",
                                  marginRight: "5px",
                                }}
                              />
                              {selectedOffer.want}{" "}
                              {selectedOffer.want.includes("%")
                                ? ""
                                : `+${selectedOffer.markup}%`}
                            </>
                          ),
                        },
                      ].map(({ label, value }) => (
                        <div
                          key={label}
                          style={{
                            display: "flex",
                            marginBottom: "10px",
                            alignItems: "center",
                          }}
                        >
                          <div style={{ width: "120px" }}>
                            <strong>{label}</strong>
                          </div>
                          <div style={{ flex: "1" }}>{value}</div>
                        </div>
                      ))}
                      <div
                        style={{
                          borderTop: "1px solid #ccc",
                          paddingTop: "10px",
                          marginBottom: "10px",
                        }}
                      >
                        <div style={{ display: "flex" }}>
                          <div style={{ width: "120px" }}>
                            <strong>Quoted Price</strong>
                          </div>
                          <div style={{ flex: "1" }}>
                            {calculateQuotedPrice(selectedOffer)}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Side with input fields and controls */}
                    <div
                      style={{
                        flex: "2",
                        marginLeft: "10px",
                        padding: "15px",
                        fontSize: "14px",
                      }}
                    >
                      <div style={{ display: "flex", marginBottom: "20px" }}>
                        <div style={{ flex: "1", marginRight: "10px" }}>
                          <TextField
                            label="Trade My"
                            value={formattedTradeAmount}
                            onChange={(e) =>
                              handleTradeMyAmountChange(e.target.value)
                            }
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <img
                                    src={
                                      selectedAsset.includes("USD")
                                        ? "Images/usd.png"
                                        : "Images/indoflag.png"
                                    }
                                    alt={selectedAsset}
                                    style={{
                                      width: "20px",
                                      marginRight: "5px",
                                    }}
                                  />
                                </InputAdornment>
                              ),
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
                            type="text" // Change to text to allow float input
                            value={forAmount}
                            onChange={(e) =>
                              handleForAmountChange(e.target.value)
                            }
                            fullWidth
                            InputProps={{
                              startAdornment: (
                                <InputAdornment position="start">
                                  <img
                                    src={
                                      activeTab === "USDT"
                                        ? "Images/T.png"
                                        : "Images/S.png"
                                    }
                                    alt={activeTab}
                                    style={{
                                      width: "20px",
                                      marginRight: "5px",
                                    }}
                                  />
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment position="end">
                                  {activeTab === "USDT" ? "USDT" : "USDC"}
                                </InputAdornment>
                              ),
                            }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: "40px" }}>
                        {[
                          {
                            label: "Fee %",
                            value: `${Math.round(selectedOffer.markup)}%`,
                          },
                          {
                            label: "Platform Fee",
                            value: `${platformFee.toFixed(2)} ${selectedAsset}`,
                          },
                          {
                            label: "Total Amount Due",
                            value: `${totalAmountDue.toFixed(2)} ${selectedAsset}`,
                          },
                        ].map(({ label, value }) => (
                          <div
                            key={label}
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                              marginBottom: "10px",
                              alignItems: "center",
                            }}
                          >
                            <div style={{ flex: "1" }}>
                              <strong>{label}</strong>
                            </div>
                            <div style={{ flex: "1", textAlign: "right" }}>
                              {value}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div
                        style={{
                          borderTop: "1px solid #ccc",
                          paddingTop: "10px",
                          marginBottom: "20px",
                        }}
                      ></div>
                      <div style={{ marginBottom: "10px" }}>
                        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>
                          2 FACTOR AUTHENTICATION
                        </p>
                        <TextField label="2FA Code" type="text" fullWidth />
                      </div>

                      <div style={{ marginBottom: "10px" }}>
                        <input type="checkbox" id="agree" />
                        <label htmlFor="agree" style={{ marginLeft: "10px" }}>
                          I agree to the Terms and Conditions
                        </label>
                      </div>

                      {/* Confirm Button */}
                      <div
                        style={{
                          marginTop: "20px",
                        }}
                      >
                        <button
                          onClick={handleConfirmTrade}
                          style={{
                            width: "100%",
                            backgroundColor: "#333",
                            color: "#fff",
                            padding: "10px 20px",
                            border: "2px solid #333",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Confirm
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

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import "./app.css";
import "../componentstablepage/tablepagesiqr.css";
import useMarketStore from './useMarketStore';

function ActiveOffer() {

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
  const [searchTerm, setSearchTerm] = useState("");
// Fungsi untuk memformat angka dengan koma
const formatNumber = (value) => {
  if (!value) return "";
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

  const {
    activeOffers,
    removeActiveOffer,
    activeTab,
    selectedAsset,
  } = useMarketStore();

  // Filter activeOffers based on searchTerm
  const filteredOffers = activeOffers.filter((offer) => {
    return (
      offer.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
      offer.tradeAmount.toString().includes(searchTerm) ||
      offer.receiveAmount.toString().includes(searchTerm) ||
      (offer.status && offer.status.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  const clearFilters = () => {
    setSearchTerm("");
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
            <div className="currencytab-section">
              <h2 className="currencytab-title" style={{ marginTop: "25px" }}>
                Active Offers
              </h2>
              <div className="currencytab-card">
                <div className="table-header">
                  <div className="search-container">
                    <input
                      style={{ height: "32px" }}
                      type="text"
                      placeholder="Search by user, date, or amount..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="table-filter-container">
                    <button className="clear-button" onClick={clearFilters}>
                      Clear Filters
                    </button>
                  </div>
                </div>
                
                <div className="table-container">
                  <table>
                    <thead>
                      <tr>
                        <th>Date/Time</th>
                        <th>User</th>
                        <th>Trade Amount</th>
                        <th>Receive Amount</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
  {filteredOffers.length > 0 ? (
    filteredOffers.map((offer) => (
      <tr key={offer.id}>
        <td>{offer.date}</td>
        <td>{offer.user}</td>
        <td>
          {formatNumber(offer.tradeAmount)} {selectedAsset}
        </td>
        <td>{formatNumber(offer.receiveAmount)} {activeTab}</td>
        <td>Ongoing</td>
        <td>
          <button onClick={() => removeActiveOffer(offer.id)}>
            Cancel Offer
          </button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" style={{ textAlign: "center" }}>
        No offers found.
      </td>
    </tr>
  )}
</tbody>

                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActiveOffer;

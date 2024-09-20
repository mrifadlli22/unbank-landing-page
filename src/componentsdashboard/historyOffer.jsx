import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import "./app.css";
import "../componentstablepage/tablepagesiqr.css";

function HistoryOffer() {

  
 
  

  // Tab menu state
  const location = useLocation();
  const navigate = useNavigate();
  const { tab } = location.state || {};

  const [activeTab, setActiveTab] = useState(tab || "currencytab");

  // Table components for both completed and canceled offers
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    date: "",
    type: "",
    sentTo: "",
    receivedFrom: "",
    datePosted: "",
    have: "",
    want: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [dropdownActive, setDropdownActive] = useState({
    date: false,
    type: false,
    sentTo: false,
    receivedFrom: false,
    datePosted: false,
    have: false,
    want: false,
  });

  const [showForm, setShowForm] = useState(false); // State to handle form visibility
  const [selectedOffer, setSelectedOffer] = useState(null); // State to handle selected offer

  const dropdownRefs = {
    date: useRef(null),
    type: useRef(null),
    sentTo: useRef(null),
    receivedFrom: useRef(null),
    datePosted: useRef(null),
    have: useRef(null),
    want: useRef(null),
  };

  const toggleDropdown = (field) => {
    setDropdownActive({
      ...dropdownActive,
      [field]: !dropdownActive[field],
    });
  };

  const clearFilters = () => {
    setFilters({
      date: "",
      type: "",
      sentTo: "",
      receivedFrom: "",
      datePosted: "",
      have: "",
      want: "",
    });
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
  };

  const handleDateChange = (type, value) => {
    if (type === "start") {
      setStartDate(value);
    } else {
      setEndDate(value);
    }
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      Object.keys(dropdownRefs).forEach((field) => {
        if (
          dropdownRefs[field].current &&
          !dropdownRefs[field].current.contains(event.target)
        ) {
          setDropdownActive((prev) => ({ ...prev, [field]: false }));
        }
      });
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Dummy data for Completed Offers Table
  const completedOffersData = [
    {
      id: 1,
      date: "2023-08-01",
      type: "BUY",
      sentTo: { amount: "$90,894.20", counterparty: "bighuni" },
      receivedFrom: { amount: "8 BTC" },
    },
    {
      id: 2,
      date: "2023-08-02",
      type: "BUY",
      sentTo: { amount: "2.17844 BTC", counterparty: "Social1998" },
      receivedFrom: { amount: "$25,000.00" },
    },
    {
      id: 3,
      date: "2023-08-02",
      type: "BUY",
      sentTo: { amount: "6.5485 BTC", counterparty: "Social1998" },
      receivedFrom: { amount: "$75,000.00" },
    },
    {
      id: 4,
      date: "2023-08-03",
      type: "BUY",
      sentTo: { amount: "$126,189.00", counterparty: "Social1998" },
      receivedFrom: { amount: "11 BTC" },
    },
    {
      id: 5,
      date: "2023-08-04",
      type: "BUY",
      sentTo: { amount: "2 BTC", counterparty: "Social1998" },
      receivedFrom: { amount: "$227,402.00" },
    },
  ];

  // Dummy data for Canceled Offers Table
  const canceledOffersData = [
    {
      id: 1,
      datePosted: "27 Aug 2020 10:25 AM",
      have: "30 BTC",
      want: "USD",
      custodian: "Prime Trust",
      canceledTime: "a few seconds ago",
    },
    {
      id: 2,
      datePosted: "21 Aug 2020 9:26 AM",
      have: "25 BTC",
      want: "USD",
      custodian: "Prime Trust",
      canceledTime: "a day ago",
    },
    {
      id: 3,
      datePosted: "24 Aug 2020 4:07 PM",
      have: "100 ETH",
      want: "USD",
      custodian: "Prime Trust",
      canceledTime: "3 days ago",
    },
    {
      id: 4,
      datePosted: "20 Aug 2020 9:30 AM",
      have: "250 ETH",
      want: "USDT",
      custodian: "Prime Trust",
      canceledTime: "7 days ago",
    },
    {
      id: 5,
      datePosted: "7 Aug 2020 9:08 PM",
      have: "50 BTC",
      want: "ETH -1%",
      custodian: "Prime Trust",
      canceledTime: "7 days ago",
    },
  ];

  const getFilteredData = (data) => {
    return data.filter((item) => {
      const searchTermLower = searchTerm.toLowerCase();
      const searchTermCondition = Object.keys(item).some((key) =>
        item[key]?.toString().toLowerCase().includes(searchTermLower)
      );

      const itemDate = item.date ? new Date(item.date) : new Date();
      const startDateCondition = startDate
        ? new Date(startDate) <= itemDate
        : true;
      const endDateCondition = endDate ? new Date(endDate) >= itemDate : true;

      return (
        searchTermCondition &&
        startDateCondition &&
        endDateCondition &&
        (filters.date === "" || item.date?.includes(filters.date)) &&
        (filters.type === "" || item.type?.includes(filters.type)) &&
        (filters.sentTo === "" ||
          item.sentTo?.counterparty.includes(filters.sentTo)) &&
        (filters.receivedFrom === "" ||
          item.receivedFrom?.amount.includes(filters.receivedFrom))
      );
    });
  };

  const getFilteredCanceledData = (data) => {
    return data.filter((item) => {
      const searchTermLower = searchTerm.toLowerCase();
      const searchTermCondition = Object.keys(item).some((key) =>
        item[key]?.toString().toLowerCase().includes(searchTermLower)
      );

      const itemDate = item.datePosted ? new Date(item.datePosted) : new Date();
      const startDateCondition = startDate
        ? new Date(startDate) <= itemDate
        : true;
      const endDateCondition = endDate ? new Date(endDate) >= itemDate : true;

      return (
        searchTermCondition &&
        startDateCondition &&
        endDateCondition &&
        (filters.datePosted === "" ||
          item.datePosted.includes(filters.datePosted)) &&
        (filters.have === "" || item.have.includes(filters.have)) &&
        (filters.want === "" || item.want.includes(filters.want))
      );
    });
  };

  const getUniqueValues = (data, field, subfield = null) => {
    if (subfield) {
      return [...new Set(data.map((item) => item[field][subfield]))];
    }
    return [...new Set(data.map((item) => item[field]))];
  };

  const getPaginatedData = (data) => {
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    return data.slice(indexOfFirstEntry, indexOfLastEntry);
  };

 

  const openTradeForm = (offer) => {
    setSelectedOffer(offer); // Store the selected offer in state
    setShowForm(true); // Show the form
  };

  const closeTradeForm = () => {
    setShowForm(false); // Hide the form
    setSelectedOffer(null); // Reset the selected offer
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
            <div className="iqrTab-container">
              <div className="iqrTab-header">
                <ul className="iqrTab-tabs">
                  <li
                    className={activeTab === "currencytab" ? "active-tab" : ""}
                    onClick={() => setActiveTab("currencytab")}
                  >
                    Completed Offer
                  </li>
                  <li
                    className={activeTab === "digitaltab" ? "active-tab" : ""}
                    onClick={() => setActiveTab("digitaltab")}
                  >
                    Canceled Offer
                  </li>
                </ul>
              </div>
            </div>

            {/* Completed Offer Tab */}
            {activeTab === "currencytab" && (
              <div className="currencytab-section">
                <h2 className="currencytab-title">Completed Offers</h2>

                <div className="currencytab-card">
                  <div className="table-header">
                    <div className="search-container">
                      <input
                        style={{ height: "32px" }}
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="date-filter-container">
                      <label>Start Date:</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                          handleDateChange("start", e.target.value)
                        }
                      />
                      <label>End Date:</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => handleDateChange("end", e.target.value)}
                      />
                    </div>
                    <div className="table-filter-container">
                      <button className="clear-button" onClick={clearFilters}>
                        Clear Filters
                      </button>
                    </div>
                  </div>

                  <div className="table-container">
                    {getFilteredData(completedOffersData).length === 0 ? (
                      <div className="no-data-message">No Completed Offers</div>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <div className="th-container">
                                <span>Date</span>
                                <span
                                  className="filter-icon"
                                  onClick={() => toggleDropdown("date")}
                                >
                                  &#9660;
                                </span>
                              </div>
                              {dropdownActive.date && (
                                <div
                                  ref={dropdownRefs.date}
                                  className="dropdown-filter"
                                >
                                  {getUniqueValues(completedOffersData, "date").map(
                                    (value) => (
                                      <div
                                        key={value}
                                        className="dropdown-item"
                                        onClick={() => {
                                          setFilters({ ...filters, date: value });
                                          setDropdownActive({
                                            ...dropdownActive,
                                            date: false,
                                          });
                                        }}
                                      >
                                        {value}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </th>
                            <th>
                              <div className="th-container">
                                <span>Type</span>
                                <span
                                  className="filter-icon"
                                  onClick={() => toggleDropdown("type")}
                                >
                                  &#9660;
                                </span>
                              </div>
                              {dropdownActive.type && (
                                <div
                                  ref={dropdownRefs.type}
                                  className="dropdown-filter"
                                >
                                  {getUniqueValues(completedOffersData, "type").map(
                                    (value) => (
                                      <div
                                        key={value}
                                        className="dropdown-item"
                                        onClick={() => {
                                          setFilters({ ...filters, type: value });
                                          setDropdownActive({
                                            ...dropdownActive,
                                            type: false,
                                          });
                                        }}
                                      >
                                        {value}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </th>
                            <th>
                              <div className="th-container">
                                <span>Sent to Counterparty</span>
                                <span
                                  className="filter-icon"
                                  onClick={() => toggleDropdown("sentTo")}
                                >
                                  &#9660;
                                </span>
                              </div>
                              {dropdownActive.sentTo && (
                                <div
                                  ref={dropdownRefs.sentTo}
                                  className="dropdown-filter"
                                >
                                  {getUniqueValues(completedOffersData, "sentTo", "counterparty").map(
                                    (value) => (
                                      <div
                                        key={value}
                                        className="dropdown-item"
                                        onClick={() => {
                                          setFilters({
                                            ...filters,
                                            sentTo: value,
                                          });
                                          setDropdownActive({
                                            ...dropdownActive,
                                            sentTo: false,
                                          });
                                        }}
                                      >
                                        {value}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </th>
                            <th>
                              <div className="th-container">
                                <span>Received from Counterparty</span>
                                <span
                                  className="filter-icon"
                                  onClick={() => toggleDropdown("receivedFrom")}
                                >
                                  &#9660;
                                </span>
                              </div>
                              {dropdownActive.receivedFrom && (
                                <div
                                  ref={dropdownRefs.receivedFrom}
                                  className="dropdown-filter"
                                >
                                  {getUniqueValues(completedOffersData, "receivedFrom", "amount").map(
                                    (value) => (
                                      <div
                                        key={value}
                                        className="dropdown-item"
                                        onClick={() => {
                                          setFilters({
                                            ...filters,
                                            receivedFrom: value,
                                          });
                                          setDropdownActive({
                                            ...dropdownActive,
                                            receivedFrom: false,
                                          });
                                        }}
                                      >
                                        {value}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {getPaginatedData(getFilteredData(completedOffersData)).map(
                            (row) => (
                              <tr key={row.id}>
                                <td>{row.date}</td>
                                <td>{row.type}</td>
                                <td>
                                  <div>
                                    <span>{row.sentTo.amount}</span>
                                    <br />
                                    <span>{row.sentTo.counterparty}</span>
                                  </div>
                                </td>
                                <td>{row.receivedFrom.amount}</td>
                                <td>
                                  <button
                                    style={{
                                      backgroundColor: "#333",
                                      color: "white",
                                      border: "none",
                                      padding: "8px 16px",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => openTradeForm(row)} // Pass the selected offer to the form
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    )}
                  </div>

                  <div className="pagination">
                    <button
                      onClick={() => handlePageClick(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from(
                      {
                        length: Math.ceil(
                          getFilteredData(completedOffersData).length /
                            entriesPerPage
                        ),
                      },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={page === currentPage ? "active" : ""}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageClick(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(
                          getFilteredData(completedOffersData).length /
                            entriesPerPage
                        )
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Canceled Offer Tab */}
            {activeTab === "digitaltab" && (
              <div className="currencytab-section">
                <h2 className="currencytab-title">Canceled Offers</h2>

                <div className="currencytab-card">
                  <div className="table-header">
                    <div className="search-container">
                      <input
                        style={{ height: "32px" }}
                        type="text"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <div className="date-filter-container">
                      <label>Start Date:</label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) =>
                          handleDateChange("start", e.target.value)
                        }
                      />
                      <label>End Date:</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => handleDateChange("end", e.target.value)}
                      />
                    </div>
                    <div className="table-filter-container">
                      <button className="clear-button" onClick={clearFilters}>
                        Clear Filters
                      </button>
                    </div>
                  </div>

                  <div className="table-container">
                    {getFilteredCanceledData(canceledOffersData).length === 0 ? (
                      <div className="no-data-message">No Canceled Offers</div>
                    ) : (
                      <table>
                        <thead>
                          <tr>
                            <th>
                              <div className="th-container">
                                <span>Date Posted</span>
                                <span
                                  className="filter-icon"
                                  onClick={() => toggleDropdown("datePosted")}
                                >
                                  &#9660;
                                </span>
                              </div>
                              {dropdownActive.datePosted && (
                                <div
                                  ref={dropdownRefs.datePosted}
                                  className="dropdown-filter"
                                >
                                  {getUniqueValues(canceledOffersData, "datePosted").map(
                                    (value) => (
                                      <div
                                        key={value}
                                        className="dropdown-item"
                                        onClick={() => {
                                          setFilters({
                                            ...filters,
                                            datePosted: value,
                                          });
                                          setDropdownActive({
                                            ...dropdownActive,
                                            datePosted: false,
                                          });
                                        }}
                                      >
                                        {value}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </th>
                            <th>Custodian</th>
                            <th>
                              <div className="th-container">
                                <span>Have</span>
                                <span
                                  className="filter-icon"
                                  onClick={() => toggleDropdown("have")}
                                >
                                  &#9660;
                                </span>
                              </div>
                              {dropdownActive.have && (
                                <div
                                  ref={dropdownRefs.have}
                                  className="dropdown-filter"
                                >
                                  {getUniqueValues(canceledOffersData, "have").map(
                                    (value) => (
                                      <div
                                        key={value}
                                        className="dropdown-item"
                                        onClick={() => {
                                          setFilters({ ...filters, have: value });
                                          setDropdownActive({
                                            ...dropdownActive,
                                            have: false,
                                          });
                                        }}
                                      >
                                        {value}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </th>
                            <th>
                              <div className="th-container">
                                <span>Want</span>
                                <span
                                  className="filter-icon"
                                  onClick={() => toggleDropdown("want")}
                                >
                                  &#9660;
                                </span>
                              </div>
                              {dropdownActive.want && (
                                <div
                                  ref={dropdownRefs.want}
                                  className="dropdown-filter"
                                >
                                  {getUniqueValues(canceledOffersData, "want").map(
                                    (value) => (
                                      <div
                                        key={value}
                                        className="dropdown-item"
                                        onClick={() => {
                                          setFilters({ ...filters, want: value });
                                          setDropdownActive({
                                            ...dropdownActive,
                                            want: false,
                                          });
                                        }}
                                      >
                                        {value}
                                      </div>
                                    )
                                  )}
                                </div>
                              )}
                            </th>
                            <th>Canceled</th>
                            <th>Action</th>
                          </tr>
                        </thead>

                        <tbody>
                          {getPaginatedData(
                            getFilteredCanceledData(canceledOffersData)
                          ).map((row) => (
                            <tr key={row.id}>
                              <td>{row.datePosted}</td>
                              <td>{row.custodian}</td>
                              <td>{row.have}</td>
                              <td>{row.want}</td>
                              <td>{row.canceledTime}</td>
                              <td>
                                <button
                                  style={{
                                    backgroundColor: "#333",
                                    color: "white",
                                    border: "none",
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                  }}
                                  onClick={() => openTradeForm(row)} // Pass the selected offer to the form
                                >
                                  View
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>

                  <div className="pagination">
                    <button
                      onClick={() => handlePageClick(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </button>
                    {Array.from(
                      {
                        length: Math.ceil(
                          getFilteredCanceledData(canceledOffersData).length /
                            entriesPerPage
                        ),
                      },
                      (_, i) => i + 1
                    ).map((page) => (
                      <button
                        key={page}
                        onClick={() => handlePageClick(page)}
                        className={page === currentPage ? "active" : ""}
                      >
                        {page}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageClick(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil(
                          getFilteredCanceledData(canceledOffersData).length /
                            entriesPerPage
                        )
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* View form modal */}
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
                  }}
                >
                  <h2 style={{ marginBottom: "20px" }}>
                    {activeTab === "currencytab"
                      ? "Completed Offer Details"
                      : "Canceled Offer Details"}
                  </h2>
                  <div className="divider2"></div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "20px",
                    }}
                  >
                    {activeTab === "currencytab" && (
                      <div style={{ flex: "1", marginRight: "10px" }}>
                        <p>
                          <strong>Date/Time:</strong> {selectedOffer.date}
                        </p>
                        <p>
                          <strong>Type:</strong> {selectedOffer.type}
                        </p>
                        <p>
                          <strong>Sent to Counterparty:</strong>{" "}
                          {selectedOffer.sentTo.counterparty}
                        </p>
                        <p>
                          <strong>Sent Amount:</strong>{" "}
                          {selectedOffer.sentTo.amount}
                        </p>
                        <p>
                          <strong>Received From:</strong>{" "}
                          {selectedOffer.receivedFrom.amount}
                        </p>
                      </div>
                    )}

                    {activeTab === "digitaltab" && (
                      <div style={{ flex: "1", marginRight: "10px" }}>
                        <p>
                          <strong>Date Posted:</strong>{" "}
                          {selectedOffer.datePosted}
                        </p>
                        <p>
                          <strong>Have:</strong> {selectedOffer.have}
                        </p>
                        <p>
                          <strong>Want:</strong> {selectedOffer.want}
                        </p>
                        <p>
                          <strong>Custodian:</strong> {selectedOffer.custodian}
                        </p>
                        <p>
                          <strong>Canceled:</strong>{" "}
                          {selectedOffer.canceledTime}
                        </p>
                      </div>
                    )}
                  </div>
                  <button
                    style={{
                      backgroundColor: "#e74c3c",
                      color: "white",
                      padding: "10px 20px",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      width: "100%",
                    }}
                    onClick={closeTradeForm}
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HistoryOffer;


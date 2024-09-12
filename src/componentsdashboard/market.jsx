import React, { useState, useRef, useEffect } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import "./app.css";
import "../componentstablepage/tablepagesiqr.css";

function Market() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    date: "",
    user: "",
    have: "",
    want: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [dropdownActive, setDropdownActive] = useState({
    date: false,
    user: false,
    have: false,
    want: false,
  });
  const [showForm, setShowForm] = useState(false); // State to handle form visibility
  const [selectedOffer, setSelectedOffer] = useState(null); // State to handle selected offer

  const [tradeMyAmount, setTradeMyAmount] = useState("");
  const [forAmount, setForAmount] = useState("");
  const [platformFee, setPlatformFee] = useState(""); // Add state for platform fee
  const [totalAmountDue, setTotalAmountDue] = useState(""); // Add state for total amount due

  const dropdownRefs = {
    date: useRef(null),
    user: useRef(null),
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
      user: "",
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

  // Dummy data for "All Offers" table
  const offersData = [
    {
      id: 1,
      date: "2023-09-01",
      user: "jason",
      have: "50 BTC",
      want: "USD +2%",
      action: "Trade",
    },
    {
      id: 2,
      date: "2023-09-02",
      user: "HDC",
      have: "88.999 BTC +1.5%",
      want: "USD",
      action: "Trade",
    },
    {
      id: 3,
      date: "2023-09-03",
      user: "Social1998",
      have: "50,000.00 USD",
      want: "BTC",
      action: "Trade",
    },
    {
      id: 4,
      date: "2023-09-04",
      user: "Social1998",
      have: "89 BTC",
      want: "USD",
      action: "Not Tradable",
    },
    {
      id: 5,
      date: "2023-09-05",
      user: "jason",
      have: "16,477 USD +0.5%",
      want: "BTC",
      action: "Trade",
    },
    // Add more offers as needed...
  ];

  const InputNumberBox = ({ value, onChange, label }) => (
    <div style={{ marginBottom: "10px" }}>
      <label>{label}</label>
      <input
        type="number"
        value={value}
        onChange={onChange}
        style={{ width: "100%", padding: "10px" }}
      />
    </div>
  );

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
        (filters.date === "" ||
          (item.date && item.date.includes(filters.date))) &&
        (filters.user === "" ||
          (item.user && item.user.includes(filters.user))) &&
        (filters.have === "" ||
          (item.have && item.have.includes(filters.have))) &&
        (filters.want === "" || (item.want && item.want.includes(filters.want)))
      );
    });
  };

  const getUniqueValues = (data, field) => {
    return [...new Set(data.map((item) => item[field]))];
  };

  const getPaginatedData = (data) => {
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    return data.slice(indexOfFirstEntry, indexOfLastEntry);
  };

  const toggleSidebar = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
  };

  const openTradeForm = (offer) => {
    setSelectedOffer(offer); // Store the selected offer in state
    setShowForm(true); // Show the form
  };

  const closeTradeForm = () => {
    setShowForm(false); // Hide the form
    setSelectedOffer(null); // Reset the selected offer
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
              <h2 style={{ marginTop: "25px" }} className="currencytab-title">
                All Offers
              </h2>

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
                  {getFilteredData(offersData).length === 0 ? (
                    <div className="no-data-message">Data Not Found</div>
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
                                {getUniqueValues(offersData, "date").map(
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
                              <span>User</span>
                              <span
                                className="filter-icon"
                                onClick={() => toggleDropdown("user")}
                              >
                                &#9660;
                              </span>
                            </div>
                            {dropdownActive.user && (
                              <div
                                ref={dropdownRefs.user}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(offersData, "user").map(
                                  (value) => (
                                    <div
                                      key={value}
                                      className="dropdown-item"
                                      onClick={() => {
                                        setFilters({ ...filters, user: value });
                                        setDropdownActive({
                                          ...dropdownActive,
                                          user: false,
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
                                {getUniqueValues(offersData, "have").map(
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
                                {getUniqueValues(offersData, "want").map(
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
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {getPaginatedData(getFilteredData(offersData)).map(
                          (row) => (
                            <tr key={row.id}>
                              <td>{row.date}</td>
                              <td>{row.user}</td>
                              <td>Prime Trust</td>
                              <td>{row.have}</td>
                              <td>{row.want}</td>
                              <td>
                                <button
                                  style={{
                                    backgroundColor:
                                      row.action === "Not Tradable"
                                        ? "#bdc3c7"
                                        : "#333",
                                    color: "white",
                                    border: "none",
                                    padding: "8px 16px",
                                    borderRadius: "4px",
                                    cursor:
                                      row.action === "Not Tradable"
                                        ? "not-allowed"
                                        : "pointer",
                                  }}
                                  onClick={() => openTradeForm(row)} // Pass the selected offer to the form
                                  disabled={row.action === "Not Tradable"}
                                >
                                  {row.action}
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
                  <div className="entries-container">
                    <label htmlFor="numEntries">Show</label>
                    <div
                      className="dropdowntf-container"
                      ref={dropdownRefs.date}
                    >
                      <button
                        className="dropdowntf-button"
                        onClick={() => toggleDropdown("entries")}
                      >
                        {entriesPerPage} <span className="caret">&#9660;</span>
                      </button>
                      {dropdownActive.entries && (
                        <div className="dropdowntf-content open">
                          {[5, 10, 25, 50, 100].map((number) => (
                            <div
                              key={number}
                              className="dropdown-item"
                              onClick={() => {
                                setEntriesPerPage(number);
                                setCurrentPage(1);
                                setDropdownActive({
                                  ...dropdownActive,
                                  entries: false,
                                });
                              }}
                            >
                              {number}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handlePageClick(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  {Array.from(
                    {
                      length: Math.ceil(
                        getFilteredData(offersData).length / entriesPerPage
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
                        getFilteredData(offersData).length / entriesPerPage
                      )
                    }
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Modal */}
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
            <h2 style={{ marginBottom: "20px" }}>Trade</h2>
            <div className="divider2"></div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "20px",
              }}
            >
              <div style={{ flex: "1", marginRight: "10px" }}>
                <p>
                  <strong>Date/Time:</strong> {selectedOffer.date}
                </p>
                <p>
                  <strong>User:</strong> {selectedOffer.user}
                </p>
                <p>
                  <strong>Custodian:</strong> Prime Trust
                </p>
                <p>
                  <strong>Have:</strong> {selectedOffer.have}
                </p>
                <p>
                  <strong>Want:</strong> {selectedOffer.want}
                </p>
              </div>

              <div className="vertical-divider"></div>

              <div style={{ flex: "2", marginLeft: "10px" }}>
                <div style={{ marginBottom: "10px" }}>
                  <label>Select Asset</label>
                  <select
                    style={{ width: "100%", padding: "10px", marginTop: "5px" }}
                  >
                    <option value="USDC">USDC</option>
                    <option value="BTCT">USDT</option>
                    <option value="IDR">IDR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ flex: "1", marginRight: "10px" }}>
                    <InputNumberBox
                      value={tradeMyAmount}
                      onChange={(e) => setTradeMyAmount(e.target.value)}
                      label="Trade My"
                    />
                  </div>
                  <div style={{ textAlign: "center", margin: "auto" }}>
                    <img
                      src="swap-icon.png" // Replace with your swap icon path
                      alt="Swap"
                      style={{
                        cursor: "pointer",
                        width: "24px",
                        height: "24px",
                      }}
                    />
                  </div>
                  <div style={{ flex: "1", marginLeft: "10px" }}>
                    <InputNumberBox
                      value={forAmount}
                      onChange={(e) => setForAmount(e.target.value)}
                      label="For"
                    />
                  </div>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <p>
                    <strong>Platform Fee:</strong> {platformFee}
                  </p>
                  <p>
                    <strong>Total Amount Due:</strong> {totalAmountDue}
                  </p>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>Amount</label>
                  <input
                    type="number"
                    style={{ width: "100%", padding: "10px" }}
                    value={tradeMyAmount} // Update as needed
                    onChange={(e) => setTradeMyAmount(e.target.value)}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <label>2FA Code</label>
                  <input
                    type="text"
                    style={{ width: "100%", padding: "10px" }}
                  />
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <input type="checkbox" id="agree" />
                  <label htmlFor="agree" style={{ marginLeft: "10px" }}>
                    I agree to the Terms and Conditions
                  </label>
                </div>
              </div>
            </div>
            <button
              style={{
                backgroundColor: "#2ecc71",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Confirm
            </button>
            <button
              onClick={closeTradeForm}
              style={{
                marginTop: "10px",
                backgroundColor: "#e74c3c",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Market;

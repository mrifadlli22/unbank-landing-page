import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import "./app.css";
import "../componentstablepage/tablepagesiqr.css";

function TransactionIqr() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);

  // tab menu
  const location = useLocation();
  const navigate = useNavigate();
  const { tab } = location.state || {};

  const [activeTab, setActiveTab] = useState(tab || "currencytab");

  // table components
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    date: "",
    currency: "",
    sender: "",
    receiver: "",
    amount: "",
    method: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [dropdownActive, setDropdownActive] = useState({
    date: false,
    currency: false,
    sender: false,
    receiver: false,
    amount: false,
    method: false,
  });

  const dropdownRefs = {
    date: useRef(null),
    currency: useRef(null),
    sender: useRef(null),
    receiver: useRef(null),
    amount: useRef(null),
    method: useRef(null),
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
      currency: "",
      sender: "",
      receiver: "",
      amount: "",
      method: "",
    });
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
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

 // Dummy data for Currency Table (Fiat)
const currencyData = [
  {
    id: 1,
    date: "2023-08-01",
    currency: "USD",
    sender: "123456789",
    receiver: "987654321",
    amount: 1000,
    method: "Transfer",
  },
  {
    id: 2,
    date: "2023-08-02",
    currency: "EUR",
    sender: "234567890",
    receiver: "876543210",
    amount: 1500,
    method: "Top Up",
  },
  {
    id: 3,
    date: "2023-08-02",
    currency: "USD",
    sender: "234562890",
    receiver: "876543210",
    amount: 1500,
    method: "Exchange",
  },
  {
    id: 4,
    date: "2023-08-03",
    currency: "GBP",
    sender: "345678901",
    receiver: "765432109",
    amount: 2000,
    method: "Transfer",
  },
  {
    id: 5,
    date: "2023-08-04",
    currency: "JPY",
    sender: "456789012",
    receiver: "654321098",
    amount: 2500,
    method: "Top Up",
  },
  {
    id: 6,
    date: "2023-08-05",
    currency: "USD",
    sender: "567890123",
    receiver: "543210987",
    amount: 3000,
    method: "Transfer",
  },
  {
    id: 7,
    date: "2023-08-06",
    currency: "EUR",
    sender: "678901234",
    receiver: "432109876",
    amount: 3500,
    method: "Exchange",
  },
  {
    id: 8,
    date: "2023-08-07",
    currency: "GBP",
    sender: "789012345",
    receiver: "321098765",
    amount: 4000,
    method: "Top Up",
  },
  {
    id: 9,
    date: "2023-08-08",
    currency: "JPY",
    sender: "890123456",
    receiver: "210987654",
    amount: 4500,
    method: "Transfer",
  },
  {
    id: 10,
    date: "2023-08-09",
    currency: "USD",
    sender: "901234567",
    receiver: "109876543",
    amount: 5000,
    method: "Exchange",
  },
  {
    id: 11,
    date: "2023-08-10",
    currency: "EUR",
    sender: "012345678",
    receiver: "098765432",
    amount: 5500,
    method: "Top Up",
  },
  {
    id: 12,
    date: "2023-08-11",
    currency: "GBP",
    sender: "123456789",
    receiver: "987654321",
    amount: 6000,
    method: "Transfer",
  },
  {
    id: 13,
    date: "2023-08-12",
    currency: "JPY",
    sender: "234567890",
    receiver: "876543210",
    amount: 6500,
    method: "Exchange",
  }
];

// Dummy data for Digital Asset Table (Crypto)
const cryptoData = [
  {
    id: 1,
    date: "2023-08-01",
    digital: "Tron",
    sender: "0x123...",
    receiver: "0x456...",
    amount: 2,
    method: "Receive",
  },
  {
    id: 2,
    date: "2023-08-02",
    digital: "Bitcoin",
    sender: "0x789...",
    receiver: "0xabc...",
    amount: 1.5,
    method: "Send",
  },
  {
    id: 3,
    date: "2023-08-02",
    digital: "Tether",
    sender: "0x789...",
    receiver: "0xabc...",
    amount: 1.5,
    method: "Trade",
  },
  {
    id: 4,
    date: "2023-08-03",
    digital: "Ethereum",
    sender: "0xdef...",
    receiver: "0xghi...",
    amount: 3,
    method: "Receive",
  },
  {
    id: 5,
    date: "2023-08-04",
    digital: "Ripple",
    sender: "0xjkl...",
    receiver: "0xmnop...",
    amount: 4,
    method: "Send",
  },
  {
    id: 6,
    date: "2023-08-05",
    digital: "Litecoin",
    sender: "0xqrst...",
    receiver: "0xuvwx...",
    amount: 5,
    method: "Trade",
  },
  {
    id: 7,
    date: "2023-08-06",
    digital: "Stellar",
    sender: "0xyza...",
    receiver: "0xbcde...",
    amount: 6,
    method: "Receive",
  },
  {
    id: 8,
    date: "2023-08-07",
    digital: "Cardano",
    sender: "0xfghi...",
    receiver: "0xjklm...",
    amount: 7,
    method: "Send",
  },
  {
    id: 9,
    date: "2023-08-08",
    digital: "Polkadot",
    sender: "0xnopq...",
    receiver: "0xqrst...",
    amount: 8,
    method: "Trade",
  },
  {
    id: 10,
    date: "2023-08-09",
    digital: "Chainlink",
    sender: "0xuvwx...",
    receiver: "0yzab...",
    amount: 9,
    method: "Receive",
  },
  {
    id: 11,
    date: "2023-08-10",
    digital: "Tron",
    sender: "0xcdef...",
    receiver: "0xghij...",
    amount: 10,
    method: "Send",
  },
  {
    id: 12,
    date: "2023-08-11",
    digital: "Bitcoin",
    sender: "0xklmn...",
    receiver: "0opqr...",
    amount: 11,
    method: "Trade",
  },
  {
    id: 13,
    date: "2023-08-12",
    digital: "Tether",
    sender: "0xstuv...",
    receiver: "0wxyz...",
    amount: 12,
    method: "Receive",
  }
];


const getFilteredData = (data) => {
  return data.filter((item) => {
    const searchTermLower = searchTerm.toLowerCase();
    const searchTermCondition = Object.keys(item).some((key) =>
      item[key]?.toString().toLowerCase().includes(searchTermLower)
    );

    const itemDate = item.date ? new Date(item.date) : new Date();
    const startDateCondition = startDate ? new Date(startDate) <= itemDate : true;
    const endDateCondition = endDate ? new Date(endDate) >= itemDate : true;

    return (
      searchTermCondition &&
      startDateCondition &&
      endDateCondition &&
      (filters.date === "" || (item.date && item.date.includes(filters.date))) &&
      (filters.currency === "" || (item.currency && item.currency.includes(filters.currency))) &&
      (filters.sender === "" || (item.sender && item.sender.includes(filters.sender))) &&
      (filters.receiver === "" || (item.receiver && item.receiver.includes(filters.receiver))) &&
      (filters.amount === "" || (item.amount && item.amount.toString().includes(filters.amount))) &&
      (filters.method === "" || (item.method && item.method.includes(filters.method)))
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
                    Currency History
                  </li>
                  <li
                    className={activeTab === "digitaltab" ? "active-tab" : ""}
                    onClick={() => setActiveTab("digitaltab")}
                  >
                    Digital Asset History
                  </li>
                </ul>
              </div>
            </div>

            {activeTab === "currencytab" && (
              <div className="currencytab-section">
                                  <h2 className="currencytab-title">Currency Table</h2>

                <div className="currencytab-card">
                  <div className="table-header">
                    <div className="search-container">
                      <div className="search-icon">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/961e82c3b3d1a150d24f26c2243242ef3254c9dcc117db0f399d3a04e838e90d?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                      </div>
                      <input
                                            style={{height: "32px"}}

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
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                      <label>End Date:</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <div className="table-filter-container">
                      <button className="clear-button" onClick={clearFilters}>
                        Clear Filters
                      </button>
                    </div>
                  </div>
                  <div className="table-container">

                  {getFilteredData(currencyData).length === 0 ? (
                    <div className="no-data-message">Data Not Found</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>
                          <div className="th-container">
                           <span>  Date </span>

                            </div>
                            {dropdownActive.date && (
                              <div
                                ref={dropdownRefs.date}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(currencyData, "date").map(
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

                            <span>Currency </span>
                            <span
                              className="filter-icon"
                              onClick={() => toggleDropdown("currency")}
                            >
                              {" "}
                              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b42103bd714ca7fb34fec537e3bb9f88e22c0baa0aaefa0ba4ccaff5554d1dd7?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                            </span>
                            </div>
                            {dropdownActive.currency && (
                              <div
                                ref={dropdownRefs.currency}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(currencyData, "currency").map(
                                  (value) => (
                                    <div
                                      key={value}
                                      className="dropdown-item"
                                      onClick={() => {
                                        setFilters({
                                          ...filters,
                                          currency: value,
                                        });
                                        setDropdownActive({
                                          ...dropdownActive,
                                          currency: false,
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
                            <span>  Sender Number </span>
                            <span
                              className="filter-icon"
                              onClick={() => toggleDropdown("sender")}
                            >
                              {" "}
                              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b42103bd714ca7fb34fec537e3bb9f88e22c0baa0aaefa0ba4ccaff5554d1dd7?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                            </span>
                            </div>
                            {dropdownActive.sender && (
                              <div
                                ref={dropdownRefs.sender}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(currencyData, "sender").map(
                                  (value) => (
                                    <div
                                      key={value}
                                      className="dropdown-item"
                                      onClick={() => {
                                        setFilters({
                                          ...filters,
                                          sender: value,
                                        });
                                        setDropdownActive({
                                          ...dropdownActive,
                                          sender: false,
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
                            <span> Receiver Number </span>
                            <span
                              className="filter-icon"
                              onClick={() => toggleDropdown("receiver")}
                            >
                              {" "}
                              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b42103bd714ca7fb34fec537e3bb9f88e22c0baa0aaefa0ba4ccaff5554d1dd7?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                            </span>
                            </div>
                            {dropdownActive.receiver && (
                              <div
                                ref={dropdownRefs.receiver}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(currencyData, "receiver").map(
                                  (value) => (
                                    <div
                                      key={value}
                                      className="dropdown-item"
                                      onClick={() => {
                                        setFilters({
                                          ...filters,
                                          receiver: value,
                                        });
                                        setDropdownActive({
                                          ...dropdownActive,
                                          receiver: false,
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

                            <span>Total Amount</span>
                            <span
                              className="filter-icon"
                              onClick={() => toggleDropdown("amount")}
                            >
                              {" "}
                              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b42103bd714ca7fb34fec537e3bb9f88e22c0baa0aaefa0ba4ccaff5554d1dd7?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                            </span>
                            </div>
                            {dropdownActive.amount && (
                              <div
                                ref={dropdownRefs.amount}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(currencyData, "amount").map(
                                  (value) => (
                                    <div
                                      key={value}
                                      className="dropdown-item"
                                      onClick={() => {
                                        setFilters({
                                          ...filters,
                                          amount: value.toString(),
                                        });
                                        setDropdownActive({
                                          ...dropdownActive,
                                          amount: false,
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

                            <span>Method</span>
                            <span
                              className="filter-icon"
                              onClick={() => toggleDropdown("method")}
                            >
                              {" "}
                              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b42103bd714ca7fb34fec537e3bb9f88e22c0baa0aaefa0ba4ccaff5554d1dd7?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                            </span>
                            </div>
                            {dropdownActive.method && (
                              <div
                                ref={dropdownRefs.method}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(currencyData, "method").map(
                                  (value) => (
                                    <div
                                      key={value}
                                      className="dropdown-item"
                                      onClick={() => {
                                        setFilters({
                                          ...filters,
                                          method: value,
                                        });
                                        setDropdownActive({
                                          ...dropdownActive,
                                          method: false,
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
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(getFilteredData(currencyData)).map(
                          (row) => (
                            <tr key={row.id}>
                              <td>{row.date}</td>
                              <td>{row.currency}</td>
                              <td>{row.sender}</td>
                              <td>{row.receiver}</td>
                              <td>{row.amount}</td>
                              <td>{row.method}</td>
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
                        className="dropdowniqr-container"
                        ref={dropdownRefs.date}
                      >
                        <button
                          className="dropdowniqr-button"
                          onClick={() => toggleDropdown("entries")}
                        >
                          {entriesPerPage}{" "}
                          <span className="caret">&#9660;</span>
                        </button>
                        {dropdownActive.entries && (
                          <div className="dropdowniqr-content open">
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
                          getFilteredData(currencyData).length / entriesPerPage
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
                          getFilteredData(currencyData).length / entriesPerPage
                        )
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "digitaltab" && (
              <div className="currencytab-section">
                                  <h2 className="currencytab-title">Digital Assets Table</h2>

                <div className="currencytab-card">
     

                  <div className="table-header">
                  <div className="search-container">
                    <div className="search-icon">
                      <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/961e82c3b3d1a150d24f26c2243242ef3254c9dcc117db0f399d3a04e838e90d?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                    </div>
                    <input
                      style={{height: "32px"}}
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
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                      <label>End Date:</label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                    </div>
                    <div className="table-filter-container">
                      <button className="clear-button" onClick={clearFilters}>
                        Clear Filters
                      </button>
                    </div>
                  </div>
                  <div className="table-container">
                  {getFilteredData(cryptoData).length === 0 ? (
                    <div className="no-data-message">Data Not Found</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>
                            <div className="th-container"> 
                            <span>Date</span>
                        
                            </div>
                            {dropdownActive.date && (
                              <div
                                ref={dropdownRefs.date}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(cryptoData, "date").map(
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

                            <span>Digital Asset</span>
                            <span
                              className="filter-icon"
                              onClick={() => toggleDropdown("currency")}
                            >
                              {" "}
                              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b42103bd714ca7fb34fec537e3bb9f88e22c0baa0aaefa0ba4ccaff5554d1dd7?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                            </span>
                            </div>
                            {dropdownActive.currency && (
                              <div
                                ref={dropdownRefs.currency}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(cryptoData, "digital").map(
                                  (value) => (
                                    <div
                                      key={value}
                                      className="dropdown-item"
                                      onClick={() => {
                                        setFilters({
                                          ...filters,
                                          currency: value,
                                        });
                                        setDropdownActive({
                                          ...dropdownActive,
                                          currency: false,
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
                            <span>Wallet Address Sender</span>
                            <span
                              className="filter-icon"
                              onClick={() => toggleDropdown("sender")}
                            >
                              {" "}
                              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b42103bd714ca7fb34fec537e3bb9f88e22c0baa0aaefa0ba4ccaff5554d1dd7?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                            </span>
                            </div>
                            {dropdownActive.sender && (
                              <div
                                ref={dropdownRefs.sender}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(cryptoData, "sender").map(
                                  (value) => (
                                    <div
                                      key={value}
                                      className="dropdown-item"
                                      onClick={() => {
                                        setFilters({
                                          ...filters,
                                          sender: value,
                                        });
                                        setDropdownActive({
                                          ...dropdownActive,
                                          sender: false,
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
                           <span> Wallet Address Receiver </span>
                            <span 
                              className="filter-icon"
                              onClick={() => toggleDropdown("receiver")}
                            >
                              {" "}
                              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b42103bd714ca7fb34fec537e3bb9f88e22c0baa0aaefa0ba4ccaff5554d1dd7?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                            </span>
                            </div>
                            {dropdownActive.receiver && (
                              <div
                                ref={dropdownRefs.receiver}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(cryptoData, "receiver").map(
                                  (value) => (
                                    <div
                                      key={value}
                                      className="dropdown-item"
                                      onClick={() => {
                                        setFilters({
                                          ...filters,
                                          receiver: value,
                                        });
                                        setDropdownActive({
                                          ...dropdownActive,
                                          receiver: false,
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
                            <span> Total Amount </span>
                            <span
                              className="filter-icon"
                              onClick={() => toggleDropdown("amount")}
                            >
                              {" "}
                              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b42103bd714ca7fb34fec537e3bb9f88e22c0baa0aaefa0ba4ccaff5554d1dd7?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                            </span>
                            </div>
                            {dropdownActive.amount && (
                              <div
                                ref={dropdownRefs.amount}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(cryptoData, "amount").map(
                                  (value) => (
                                    <div
                                      key={value}
                                      className="dropdown-item"
                                      onClick={() => {
                                        setFilters({
                                          ...filters,
                                          amount: value.toString(),
                                        });
                                        setDropdownActive({
                                          ...dropdownActive,
                                          amount: false,
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
                            <span> Method </span>
                            <span
                              className="filter-icon"
                              onClick={() => toggleDropdown("method")}
                            >
                              {" "}
                              <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b42103bd714ca7fb34fec537e3bb9f88e22c0baa0aaefa0ba4ccaff5554d1dd7?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                            </span>
                            </div>
                            {dropdownActive.method && (
                              <div
                                ref={dropdownRefs.method}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(cryptoData, "method").map(
                                  (value) => (
                                    <div
                                      key={value}
                                      className="dropdown-item"
                                      onClick={() => {
                                        setFilters({
                                          ...filters,
                                          method: value,
                                        });
                                        setDropdownActive({
                                          ...dropdownActive,
                                          method: false,
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
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(getFilteredData(cryptoData)).map(
                          (row) => (
                            <tr key={row.id}>
                              <td>{row.date}</td>
                              <td>{row.digital}</td>
                              <td>{row.sender}</td>
                              <td>{row.receiver}</td>
                              <td>{row.amount}</td>
                              <td>{row.method}</td>
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
                        className="dropdowniqr-container"
                        ref={dropdownRefs.date}
                      >
                        <button
                          className="dropdowniqr-button"
                          onClick={() => toggleDropdown("entries")}
                        >
                          {entriesPerPage}{" "}
                          <span className="caret">&#9660;</span>
                        </button>
                        {dropdownActive.entries && (
                          <div className="dropdowniqr-content open">
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
                          getFilteredData(cryptoData).length / entriesPerPage
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
                          getFilteredData(cryptoData).length / entriesPerPage
                        )
                      }
                    >
                      Next
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

export default TransactionIqr;

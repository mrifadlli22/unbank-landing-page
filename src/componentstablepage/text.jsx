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
    method: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [dropdownActive, setDropdownActive] = useState(false);

  const dropdownRef = useRef(null);

  const toggleDropdown = () => setDropdownActive(!dropdownActive);

  const clearFilters = () => {
    setFilters({
      date: "",
      currency: "",
      sender: "",
      receiver: "",
      amount: "",
      method: ""
    });
    setSearchTerm("");
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownActive(false);
      }
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
    // ... (add more dummy data here)
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
    // ... (add more dummy data here)
  ];

  const getFilteredData = (data) => {
    return data.filter((item) => {
      return (
        (filters.date === "" || item.date.includes(filters.date)) &&
        (filters.currency === "" || item.currency.includes(filters.currency)) &&
        (filters.sender === "" || item.sender.includes(filters.sender)) &&
        (filters.receiver === "" || item.receiver.includes(filters.receiver)) &&
        (filters.amount === "" || item.amount.toString().includes(filters.amount)) &&
        (filters.method === "" || item.method.includes(filters.method))
      );
    });
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
                <div className="currencytab-card">
                  <h2 className="currencytab-title">Currency Table</h2>

                  <div className="table-header">
                    <div className="search-container">
                      <input
                        type="text"
                        placeholder="Search..."
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

                  {getFilteredData(currencyData).length === 0 ? (
                    <div className="no-data-message">Data Not Found</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>
                            Date
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters.date}
                              onChange={(e) =>
                                setFilters({ ...filters, date: e.target.value })
                              }
                            />
                          </th>
                          <th>
                            Currency
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters.currency}
                              onChange={(e) =>
                                setFilters({ ...filters, currency: e.target.value })
                              }
                            />
                          </th>
                          <th>
                            Sender Number
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters.sender}
                              onChange={(e) =>
                                setFilters({ ...filters, sender: e.target.value })
                              }
                            />
                          </th>
                          <th>
                            Receiver Number
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters.receiver}
                              onChange={(e) =>
                                setFilters({ ...filters, receiver: e.target.value })
                              }
                            />
                          </th>
                          <th>
                            Total Amount
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters.amount}
                              onChange={(e) =>
                                setFilters({ ...filters, amount: e.target.value })
                              }
                            />
                          </th>
                          <th>
                            Method
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters.method}
                              onChange={(e) =>
                                setFilters({ ...filters, method: e.target.value })
                              }
                            />
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

                  <div className="pagination">
                    <div className="entries-container">
                      <label htmlFor="numEntries">Show</label>
                      <div className="dropdowniqr-container" ref={dropdownRef}>
                        <button
                          className="dropdowniqr-button"
                          onClick={toggleDropdown}
                        >
                          {entriesPerPage} <span className="caret">&#9660;</span>
                        </button>
                        {dropdownActive && (
                          <div className="dropdowniqr-content open">
                            {[5, 10, 25, 50, 100].map((number) => (
                              <div
                                key={number}
                                className="dropdown-item"
                                onClick={() => {
                                  setEntriesPerPage(number);
                                  setCurrentPage(1);
                                  setDropdownActive(false); // Tutup dropdown setelah memilih
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
                <div className="currencytab-card">
                  <h2 className="currencytab-title">Digital Assets Table</h2>

                  <div className="table-header">
                    <div className="search-container">
                      <input
                        type="text"
                        placeholder="Search..."
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

                  {getFilteredData(cryptoData).length === 0 ? (
                    <div className="no-data-message">Data Not Found</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          <th>
                            Date
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters.date}
                              onChange={(e) =>
                                setFilters({ ...filters, date: e.target.value })
                              }
                            />
                          </th>
                          <th>
                            Digital Asset
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters.currency}
                              onChange={(e) =>
                                setFilters({ ...filters, currency: e.target.value })
                              }
                            />
                          </th>
                          <th>
                            Wallet Address Sender
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters.sender}
                              onChange={(e) =>
                                setFilters({ ...filters, sender: e.target.value })
                              }
                            />
                          </th>
                          <th>
                            Wallet Address Receiver
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters.receiver}
                              onChange={(e) =>
                                setFilters({ ...filters, receiver: e.target.value })
                              }
                            />
                          </th>
                          <th>
                            Total Amount
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters.amount}
                              onChange={(e) =>
                                setFilters({ ...filters, amount: e.target.value })
                              }
                            />
                          </th>
                          <th>
                            Method
                            <input
                              type="text"
                              placeholder="Filter"
                              value={filters.method}
                              onChange={(e) =>
                                setFilters({ ...filters, method: e.target.value })
                              }
                            />
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

                  <div className="pagination">
                    <div className="entries-container">
                      <label htmlFor="numEntries">Show</label>
                      <div className="dropdowniqr-container" ref={dropdownRef}>
                        <button
                          className="dropdowniqr-button"
                          onClick={toggleDropdown}
                        >
                          {entriesPerPage} <span className="caret">&#9660;</span>
                        </button>
                        {dropdownActive && (
                          <div className="dropdowniqr-content open">
                            {[5, 10, 25, 50, 100].map((number) => (
                              <div
                                key={number}
                                className="dropdown-item"
                                onClick={() => {
                                  setEntriesPerPage(number);
                                  setCurrentPage(1);
                                  setDropdownActive(false); // Tutup dropdown setelah memilih
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

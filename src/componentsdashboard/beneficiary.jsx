import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import "./app.css";
import "../componentstablepage/tablepagestransfer.css";

function Beneficiary() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [showForm, setShowForm] = useState(false); // State to handle form visibility
  const [newData, setNewData] = useState({}); // State to handle new data input

  // tab menu
  const location = useLocation();
  const navigate = useNavigate();
  const { tab } = location.state || {};

  const [activeTab, setActiveTab] = useState(tab || "banktab");

  // table components
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    paymentCountry: "",
    receivingCurrency: "",
    bankName: "",
    branch: "",
    accountNumber: "",
    name: "",
    usernameUnbank: "",
    emailUnbank: "",
    username: "",
    walletAddress: "",
    network: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [dropdownActive, setDropdownActive] = useState({
    paymentCountry: false,
    receivingCurrency: false,
    bankName: false,
    branch: false,
    accountNumber: false,
    name: false,
    usernameUnbank: false,
    emailUnbank: false,
    username: false,
    walletAddress: false,
    network: false
  });

  const dropdownRefs = {
    paymentCountry: useRef(null),
    receivingCurrency: useRef(null),
    bankName: useRef(null),
    branch: useRef(null),
    accountNumber: useRef(null),
    name: useRef(null),
    usernameUnbank: useRef(null),
    emailUnbank: useRef(null),
    username: useRef(null),
    walletAddress: useRef(null),
    network: useRef(null)
  };

  const toggleDropdown = (field) => {
    setDropdownActive({
      ...dropdownActive,
      [field]: !dropdownActive[field],
    });
  };

  const clearFilters = () => {
    setFilters({
      paymentCountry: "",
      receivingCurrency: "",
      bankName: "",
      branch: "",
      accountNumber: "",
      name: "",
      usernameUnbank: "",
      emailUnbank: "",
      username: "",
      walletAddress: "",
      network: ""
    });
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

  // Dummy data for Bank Account Table
  const [bankData, setBankData] = useState([
    {
      id: 1,
      paymentCountry: "Indonesia",
      receivingCurrency: "IDR",
      bankName: "Bank Central Asia (BCA)",
      branch: "Jakarta",
      accountNumber: "1234567890",
      name: "John Doe"
    },
    {
      id: 2,
      paymentCountry: "Indonesia",
      receivingCurrency: "IDR",
      bankName: "Bank Mandiri",
      branch: "Surabaya",
      accountNumber: "0987654321",
      name: "Jane Smith"
    }
  ]);

  // Dummy data for Unbank Account Table
  const [unbankData, setUnbankData] = useState([
    {
      id: 1,
      usernameUnbank: "unbank_user1",
      emailUnbank: "user1@unbank.com"
    },
    {
      id: 2,
      usernameUnbank: "unbank_user2",
      emailUnbank: "user2@unbank.com"
    }
  ]);

  // Dummy data for External Crypto Wallet Table
  const [cryptoWalletData, setCryptoWalletData] = useState([
    {
      id: 1,
      username: "crypto_user1",
      walletAddress: "0x123...abc",
      network: "Ethereum"
    },
    {
      id: 2,
      username: "crypto_user2",
      walletAddress: "1A1zP1...xyz",
      network: "Bitcoin"
    }
  ]);

  const getFilteredData = (data) => {
    return data.filter((item) => {
      const searchTermLower = searchTerm.toLowerCase();
      const searchTermCondition = Object.keys(item).some((key) =>
        item[key]?.toString().toLowerCase().includes(searchTermLower)
      );

      return (
        searchTermCondition &&
        (filters.paymentCountry === "" || (item.paymentCountry && item.paymentCountry.includes(filters.paymentCountry))) &&
        (filters.receivingCurrency === "" || (item.receivingCurrency && item.receivingCurrency.includes(filters.receivingCurrency))) &&
        (filters.bankName === "" || (item.bankName && item.bankName.includes(filters.bankName))) &&
        (filters.branch === "" || (item.branch && item.branch.includes(filters.branch))) &&
        (filters.accountNumber === "" || (item.accountNumber && item.accountNumber.includes(filters.accountNumber))) &&
        (filters.name === "" || (item.name && item.name.includes(filters.name))) &&
        (filters.usernameUnbank === "" || (item.usernameUnbank && item.usernameUnbank.includes(filters.usernameUnbank))) &&
        (filters.emailUnbank === "" || (item.emailUnbank && item.emailUnbank.includes(filters.emailUnbank))) &&
        (filters.username === "" || (item.username && item.username.includes(filters.username))) &&
        (filters.walletAddress === "" || (item.walletAddress && item.walletAddress.includes(filters.walletAddress))) &&
        (filters.network === "" || (item.network && item.network.includes(filters.network)))
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

  const handleAddData = () => {
    const newId = new Date().getTime();
    const dataToAdd = { id: newId, ...newData };
    if (activeTab === "banktab") {
      setBankData([...bankData, dataToAdd]);
    } else if (activeTab === "unbanktab") {
      setUnbankData([...unbankData, dataToAdd]);
    } else if (activeTab === "wallettab") {
      setCryptoWalletData([...cryptoWalletData, dataToAdd]);
    }
    setShowForm(false);
    setNewData({});
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
            <div className="tfTab-container">
              <div className="tfTab-header">
                <ul className="tfTab-tabs">
                  <li
                    className={activeTab === "banktab" ? "active-tab" : ""}
                    onClick={() => setActiveTab("banktab")}
                  >
                    Transfer to your bank account
                  </li>
                  <li
                    className={activeTab === "unbanktab" ? "active-tab" : ""}
                    onClick={() => setActiveTab("unbanktab")}
                  >
                    Transfer to another Unbank Account
                  </li>
                  <li
                    className={activeTab === "wallettab" ? "active-tab" : ""}
                    onClick={() => setActiveTab("wallettab")}
                  >
                    Transfer to External Crypto Wallet
                  </li>
                </ul>
              </div>
            </div>

            {showForm && (
              <div className="form-overlay">
                <div className="form-container">
                  <h2>Add New Data</h2>
                  <form>
                    {activeTab === "banktab" && (
                      <>
                        <input type="text" placeholder="Payment Country" value={newData.paymentCountry || ''} onChange={(e) => setNewData({ ...newData, paymentCountry: e.target.value })} />
                        <input type="text" placeholder="Receiving Currency" value={newData.receivingCurrency || ''} onChange={(e) => setNewData({ ...newData, receivingCurrency: e.target.value })} />
                        <input type="text" placeholder="Bank Name" value={newData.bankName || ''} onChange={(e) => setNewData({ ...newData, bankName: e.target.value })} />
                        <input type="text" placeholder="Branch" value={newData.branch || ''} onChange={(e) => setNewData({ ...newData, branch: e.target.value })} />
                        <input type="text" placeholder="Account Number" value={newData.accountNumber || ''} onChange={(e) => setNewData({ ...newData, accountNumber: e.target.value })} />
                        <input type="text" placeholder="Name" value={newData.name || ''} onChange={(e) => setNewData({ ...newData, name: e.target.value })} />
                      </>
                    )}
                    {activeTab === "unbanktab" && (
                      <>
                        <input type="text" placeholder="Username Unbank" value={newData.usernameUnbank || ''} onChange={(e) => setNewData({ ...newData, usernameUnbank: e.target.value })} />
                        <input type="email" placeholder="Email Unbank" value={newData.emailUnbank || ''} onChange={(e) => setNewData({ ...newData, emailUnbank: e.target.value })} />
                      </>
                    )}
                    {activeTab === "wallettab" && (
                      <>
                        <input type="text" placeholder="Username" value={newData.username || ''} onChange={(e) => setNewData({ ...newData, username: e.target.value })} />
                        <input type="text" placeholder="Wallet Address" value={newData.walletAddress || ''} onChange={(e) => setNewData({ ...newData, walletAddress: e.target.value })} />
                        <input type="text" placeholder="Network" value={newData.network || ''} onChange={(e) => setNewData({ ...newData, network: e.target.value })} />
                      </>
                    )}
                    <button type="button" onClick={handleAddData}>Add Data</button>
                    <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                  </form>
                </div>
              </div>
            )}

            {activeTab === "banktab" && (
              <div className="banktab-section">
                <div className="banktab-card">
                  <h2 className="banktab-title">Bank Account Table</h2>

                  <div className="table-header">
                    <div className="search-container">
                      <div className="search-icon">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/961e82c3b3d1a150d24f26c2243242ef3254c9dcc117db0f399d3a04e838e90d?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                      </div>
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
                      <button className="add-button" onClick={() => setShowForm(true)}>
                        Add New Data
                      </button>
                    </div>
                  </div>

                  {getFilteredData(bankData).length === 0 ? (
                    <div className="no-data-message">Data Not Found</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          {['paymentCountry', 'receivingCurrency', 'bankName', 'branch', 'accountNumber', 'name'].map((column) => (
                            <th key={column}>
                              <div className="th-container">
                                <span>{column.replace(/([A-Z])/g, ' $1')}</span>
                                <span
                                  className="filter-icon"
                                  onClick={() => toggleDropdown(column)}
                                >
                                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b42103bd714ca7fb34fec537e3bb9f88e22c0baa0aaefa0ba4ccaff5554d1dd7?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                                </span>
                              </div>
                              {dropdownActive[column] && (
                                <div
                                  ref={dropdownRefs[column]}
                                  className="dropdown-filter"
                                >
                                  {getUniqueValues(bankData, column).map(
                                    (value) => (
                                      <div
                                        key={value}
                                        className="dropdown-item"
                                        onClick={() => {
                                          setFilters({ ...filters, [column]: value });
                                          setDropdownActive({
                                            ...dropdownActive,
                                            [column]: false,
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
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(getFilteredData(bankData)).map(
                          (row) => (
                            <tr key={row.id}>
                              <td>{row.paymentCountry}</td>
                              <td>{row.receivingCurrency}</td>
                              <td>{row.bankName}</td>
                              <td>{row.branch}</td>
                              <td>{row.accountNumber}</td>
                              <td>{row.name}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  )}

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
                          {entriesPerPage}{" "}
                          <span className="caret">&#9660;</span>
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
                          getFilteredData(bankData).length / entriesPerPage
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
                          getFilteredData(bankData).length / entriesPerPage
                        )
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "unbanktab" && (
              <div className="banktab-section">
                <div className="banktab-card">
                  <h2 className="banktab-title">Unbank Account Table</h2>

                  <div className="table-header">
                    <div className="search-container">
                      <div className="search-icon">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/961e82c3b3d1a150d24f26c2243242ef3254c9dcc117db0f399d3a04e838e90d?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                      </div>
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
                      <button className="add-button" onClick={() => setShowForm(true)}>
                        Add New Data
                      </button>
                    </div>
                  </div>

                  {getFilteredData(unbankData).length === 0 ? (
                    <div className="no-data-message">Data Not Found</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          {['usernameUnbank', 'emailUnbank'].map((column) => (
                            <th key={column}>
                              <div className="th-container">
                                <span>{column.replace(/([A-Z])/g, ' $1')}</span>
                                <span
                                  className="filter-icon"
                                  onClick={() => toggleDropdown(column)}
                                >
                                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b42103bd714ca7fb34fec537e3bb9f88e22c0baa0aaefa0ba4ccaff5554d1dd7?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                                </span>
                              </div>
                              {dropdownActive[column] && (
                                <div
                                  ref={dropdownRefs[column]}
                                  className="dropdown-filter"
                                >
                                  {getUniqueValues(unbankData, column).map(
                                    (value) => (
                                      <div
                                        key={value}
                                        className="dropdown-item"
                                        onClick={() => {
                                          setFilters({ ...filters, [column]: value });
                                          setDropdownActive({
                                            ...dropdownActive,
                                            [column]: false,
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
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(getFilteredData(unbankData)).map(
                          (row) => (
                            <tr key={row.id}>
                              <td>{row.usernameUnbank}</td>
                              <td>{row.emailUnbank}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  )}

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
                          {entriesPerPage}{" "}
                          <span className="caret">&#9660;</span>
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
                          getFilteredData(unbankData).length / entriesPerPage
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
                          getFilteredData(unbankData).length / entriesPerPage
                        )
                      }
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "wallettab" && (
              <div className="banktab-section">
                <div className="banktab-card">
                  <h2 className="banktab-title">External Crypto Wallet Table</h2>

                  <div className="table-header">
                    <div className="search-container">
                      <div className="search-icon">
                        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/961e82c3b3d1a150d24f26c2243242ef3254c9dcc117db0f399d3a04e838e90d?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                      </div>
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
                      <button className="add-button" onClick={() => setShowForm(true)}>
                        Add New Data
                      </button>
                    </div>
                  </div>

                  {getFilteredData(cryptoWalletData).length === 0 ? (
                    <div className="no-data-message">Data Not Found</div>
                  ) : (
                    <table>
                      <thead>
                        <tr>
                          {['username', 'walletAddress', 'network'].map((column) => (
                            <th key={column}>
                              <div className="th-container">
                                <span>{column.replace(/([A-Z])/g, ' $1')}</span>
                                <span
                                  className="filter-icon"
                                  onClick={() => toggleDropdown(column)}
                                >
                                  <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/b42103bd714ca7fb34fec537e3bb9f88e22c0baa0aaefa0ba4ccaff5554d1dd7?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" />
                                </span>
                              </div>
                              {dropdownActive[column] && (
                                <div
                                  ref={dropdownRefs[column]}
                                  className="dropdown-filter"
                                >
                                  {getUniqueValues(cryptoWalletData, column).map(
                                    (value) => (
                                      <div
                                        key={value}
                                        className="dropdown-item"
                                        onClick={() => {
                                          setFilters({ ...filters, [column]: value });
                                          setDropdownActive({
                                            ...dropdownActive,
                                            [column]: false,
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
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {getPaginatedData(getFilteredData(cryptoWalletData)).map(
                          (row) => (
                            <tr key={row.id}>
                              <td>{row.username}</td>
                              <td>{row.walletAddress}</td>
                              <td>{row.network}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  )}

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
                          {entriesPerPage}{" "}
                          <span className="caret">&#9660;</span>
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
                          getFilteredData(cryptoWalletData).length / entriesPerPage
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
                          getFilteredData(cryptoWalletData).length / entriesPerPage
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

export default Beneficiary;

import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import "./app.css";
import "../componentstablepage/tablepagesiqr.css";

function ActiveOffer() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    date: "",
    user: "",
    have: "",
    want: "",
    status: "",
  });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [activeOffers, setActiveOffers] = useState([]);
  const [dropdownActive, setDropdownActive] = useState({
    date: false,
    user: false,
    have: false,
    want: false,
    status: false,
  });

  const dropdownRefs = {
    date: useRef(null),
    user: useRef(null),
    have: useRef(null),
    want: useRef(null),
    status: useRef(null),
  };

  // Example confirmed offers data
  useEffect(() => {
    const confirmedOffers = [
      {
        id: 1,
        date: "2023-09-01",
        user: "jason",
        have: "50 BTC",
        want: "USD +2%",
        custodian: "Prime Trust",
        status: "Ongoing",
      },
      {
        id: 2,
        date: "2023-09-02",
        user: "HDC",
        have: "88.999 BTC",
        want: "USD",
        custodian: "Prime Trust",
        status: "Ongoing",
      },
    ];

    setActiveOffers(confirmedOffers);
  }, []);

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
        (filters.want === "" || (item.want && item.want.includes(filters.want))) &&
        (filters.status === "" ||
          (item.status && item.status.includes(filters.status)))
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

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
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
      status: "",
    });
    setStartDate("");
    setEndDate("");
    setSearchTerm("");
  };

  const toggleSidebar = () => {
    setIsMobileMenuActive(!isMobileMenuActive);
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
                Active Offers
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
                  {getFilteredData(activeOffers).length === 0 ? (
                    <div className="no-data-message">No Active Offers</div>
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
                                {getUniqueValues(activeOffers, "date").map(
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
                                {getUniqueValues(activeOffers, "user").map(
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
                                {getUniqueValues(activeOffers, "have").map(
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
                                {getUniqueValues(activeOffers, "want").map(
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
                          <th>
                            <div className="th-container">
                              <span>Status</span>
                              <span
                                className="filter-icon"
                                onClick={() => toggleDropdown("status")}
                              >
                                &#9660;
                              </span>
                            </div>
                            {dropdownActive.status && (
                              <div
                                ref={dropdownRefs.status}
                                className="dropdown-filter"
                              >
                                {getUniqueValues(activeOffers, "status").map(
                                  (value) => (
                                    <div
                                      key={value}
                                      className="dropdown-item"
                                      onClick={() => {
                                        setFilters({
                                          ...filters,
                                          status: value,
                                        });
                                        setDropdownActive({
                                          ...dropdownActive,
                                          status: false,
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
                        {getPaginatedData(getFilteredData(activeOffers)).map(
                          (offer) => (
                            <tr key={offer.id}>
                              <td>{offer.date}</td>
                              <td>{offer.user}</td>
                              <td>{offer.custodian}</td>
                              <td>{offer.have}</td>
                              <td>{offer.want}</td>
                              <td>{offer.status}</td>
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
                        getFilteredData(activeOffers).length / entriesPerPage
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
                      Math.ceil(getFilteredData(activeOffers).length / entriesPerPage)
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
    </div>
  );
}

export default ActiveOffer;

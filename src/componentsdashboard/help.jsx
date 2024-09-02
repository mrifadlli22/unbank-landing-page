import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import './app.css';
import FAQBusiness from '../componentsbusiness/BusinessPage/FAQ';
import FAQPersonal from '../componentspersonal/FAQ/FAQ';

function Help() {
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
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="dashboard">
      <Header toggleSidebar={toggleSidebar} isMobileMenuActive={isMobileMenuActive} />
      <Sidebar isMobileMenuActive={isMobileMenuActive} toggleSidebar={toggleSidebar} />
      <div className="main">
        <div className="content">
          <div className='contentdash'>
            <div className="support-section">
              <div className="security-alert">
                <span>
                  <img style={{ marginLeft: "5px" }} src="./Images/i.png" />
                </span>
                <div>
                  <p>
                    We're experiencing high volumes of inquiries, resulting
                    in longer response times than we'd hoped for. We aim to
                    reply to you within 2 working days.
                  </p>
                </div>
              </div>
              <div className="section">
                <div
                  style={{ marginBottom: "25px" }}
                  className="section-header-container"
                >
                  <div className="section-header">Active Transactions</div>
                  <div className="divider2"></div>
                  <button className="see-all-transactions-btn">
                    View Archived
                  </button>
                </div>
                <div className="support-card">
                  <img
                    style={{ width: "245px" }}
                    src="./Images/Image.png"
                    alt="Contact Support"
                    className="support-image"
                  />
                  <div className="support-content">
                    <h3 style={{ marginTop: "0px" }}>
                      Contact Our Support
                    </h3>
                    <p>
                      In case you encounter any issues or require assistance
                      with your account, please don't hesitate to contact
                      us.
                    </p>
                    <button className="support-button">
                      Contact Our Support
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="section">
              <div className="section-header-container">
                <div className="section-header">Personal FAQ</div>
                <div className="divider2"></div>
              </div>
              {/* Insert PersonalFAQ component here */}
              <div style={{marginTop:"20px"}}>
              <FAQPersonal />
              </div>
            </div>

            <div className="section">
              <div className="section-header-container">
                <div className="section-header">Business FAQ</div>
                <div className="divider2"></div>
              </div>
              {/* Insert BusinessFAQ component here */}
              <div style={{marginTop:"20px"}}>
              <FAQBusiness />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
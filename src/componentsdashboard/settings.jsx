import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useLocation and useNavigate
import Sidebar from './sidebar';
import Header from './header';
import './app.css';

function Settings() {
    const location = useLocation(); // Get the current location
    const navigate = useNavigate(); // Initialize useNavigate
    const queryParams = new URLSearchParams(location.search);
    const tab = queryParams.get('tab') || 'profile'; // Get tab from query string or default to 'profile'

    const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
    const [activeTab, setActiveTab] = useState(tab); // Set active tab based on query string

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

    useEffect(() => {
        setActiveTab(tab); // Update activeTab when the query string changes
    }, [tab]);

    const handleTabChange = (newTab) => {
        setActiveTab(newTab);
        navigate(`/${newTab}`); // Update the URL path
    };

    return (
        <div className="dashboard">
            <Header toggleSidebar={toggleSidebar} isMobileMenuActive={isMobileMenuActive} />
            <Sidebar isMobileMenuActive={isMobileMenuActive} toggleSidebar={toggleSidebar} />
            <div className="main">
                <div className="content">
                <div className="contentsettings">

                    <div className="settings-container">
                        <div className="settings-header">
                            <ul className="settings-tabs">
                                <li className={activeTab === 'profile' ? 'active-tab' : ''} onClick={() => handleTabChange('profile')}>Profile</li>
                                <li className={activeTab === 'support' ? 'active-tab' : ''} onClick={() => handleTabChange('support')}>Support</li>
                                <li className={activeTab === 'security' ? 'active-tab' : ''} onClick={() => handleTabChange('security')}>Security</li>
                            </ul>
                        </div>

                        {activeTab === 'profile' && (
    <div className="profile-section">
    <h2 className="profile-title">Profile</h2>
    <div className="profile-card">
        <div className="profile-row">
            <div>
                <div className="profile-label">Name</div>
                <div className="profile-value">deo doo</div>
            </div>
            <div>
                <div className="profile-label">User ID</div>
                <div className="profile-value user-id">
                    NNM1YF 
                    <img src="/images/copy-icon.png" alt="Copy ID" className="copy-icon" />
                </div>
            </div>
        </div>
        <div className="profile-row">
            <div>
                <div className="profile-label">Email</div>
                <div className="profile-value">leideoviko@gmail.com</div>
            </div>
            <div>
                <div className="profile-label">Account status</div>
                <div className="profile-value">
                    <span className="status-icon not-verified"></span>Not verified
                </div>
            </div>
        </div>

        <div className="profile-row">
            <div>
                <div className="profile-label">Language</div>
                <div className="profile-value">English</div>
            </div>
            <div>
                <div className="profile-label">Main currency</div>
                <div className="profile-value">EUR</div>
            </div>
        </div>
        <div className="profile-row">
            <div>
                <div className="profile-label">Invited by</div>
                <div className="profile-value">None</div>
            </div>
        </div>
    </div>
</div>
)}


                        {activeTab === 'support' && (
                            <div className="support-section">
                                <div className="support-notice">
                                    <span className="info-icon">i</span>
                                    <p>We're experiencing high volumes of inquiries, resulting in longer response times than we'd hoped for. We aim to reply to you within 2 working days.</p>
                                </div>
                                <h2 className="support-title">Active Conversations</h2>
                                <button className="view-archived-btn">View archived</button>
                                <div className="support-card">
                                    <img src="./images/contact-support.png" alt="Contact Support" className="support-image" />
                                    <div className="support-content">
                                        <h3>Contact Our Support</h3>
                                        <p>In case you encounter any issues or require assistance with your account, please don't hesitate to contact us.</p>
                                        <button className="support-button">Contact Our Support</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="security-section">
                                <div className="security-alert">
                                    <span className="warning-icon">!</span>
                                    <p>Currently your account is not secured by two-factor (2FA) authentication. We strongly advise you to activate it. You can do this on this page.</p>
                                </div>
                                <h2 className="security-title">Security</h2>
                                <div className="security-cards">
                                    <div className="security-card">
                                        <p>Password (Please verify your phone number)</p>
                                        <button className="verify2-btn">Verify</button>
                                    </div>
                                    <div className="security-card">
                                        <p>Phone number (Please verify your phone number)</p>
                                        <button className="verify2-btn">Verify</button>
                                    </div>
                                    <div className="security-card">
                                        <p>Email address (leideoviko@gmail.com)</p>
                                        <button className="change-btn">Change</button>
                                    </div>
                                    <div className="security-card">
                                        <h3>2FA: Disabled</h3>
                                        <p>ZFA method can be enabled only after Your phone verification.</p>
                                        <button className="phone-verification-btn">Phone Verification</button>
                                    </div>
                                </div>

                                <div className="device-section">
                                    <h3>Signed in Devices</h3>
                                    <table className="device-table">
                                        <thead>
                                            <tr>
                                                <th>Signed in</th>
                                                <th>Type</th>
                                                <th>Device details</th>
                                                <th>IP Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Aug 19, 2024, 10:57</td>
                                                <td>Browser</td>
                                                <td>Chrome 127.0 (Mac OS X) Mac</td>
                                                <td>222.165.215.82</td>
                                            </tr>
                                            {/* More rows as needed */}
                                        </tbody>
                                    </table>
                                </div>

                                <div className="deactivate-section">
                                    <p>If you want to stop using swissmoney, you can deactivate your account here.</p>
                                    <button className="deactivate-btn">Deactivate Account</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;

import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import './app.css';
import { useNavigate } from'react-router-dom';

function CurrencyCard({ amount, currency, flag, avatars }) {
  const navigate = useNavigate();

  const handleAvatarClick = (index) => {
    let tab;
    if (index === 1) {
      tab = 'transfer'; // Redirect to 'topup' for Avatar 1
    } 
    navigate('/transfer', { state: { amount, flag, currency, tab } });
  };

  return (
    <div className="currency-card">
      <div className="currency-details">
        <div className="currency-amount">{amount}</div>
        <div className="currency-label">{currency}</div>
      </div>
      <img src={flag} alt={currency} className="currency-flag" />
      <div className="currency-actions">
        {/* Action icons here */}
      </div>
      <div className="currency-avatars">
        {avatars && avatars.map((avatar, index) => (
          <img
            key={index}
            src={avatar.src}
            alt={avatar.alt}
            className={`avatar avatar-${index + 1}`} // Assign class avatar-1, avatar-2, avatar-3 based on index
            onClick={() => handleAvatarClick(index + 1)} // Pass tab index to handleAvatarClick
          />
        ))}
      </div>
    </div>
  );
}

function TransferPage() {
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
            <div className="contentdash">
            <h2 style={{marginBottom:"0px"}}>Transfer Currencies</h2>
            <div className="section">
        <div className="section-header-container">
         </div>
        <p>You haven't added any currencies yet. Once you add them, they will be displayed here for your convenience.</p>

        <div  className="containers">
          <div style={{marginTop:"0px"}} className="currency-cards">
            <CurrencyCard 
              amount="Rp.0,00" 
              currency="IDR" 
              flag="./Images/indoflag.png" 
              avatars={[
                { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d914da3aec1dab3600769687b602e1d4c74056d5a2cd1b33b073f4e6805f9b0c?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 3" },

              ]}
            />
             <CurrencyCard 
              amount="USD.0,00" 
              currency="USD" 
              flag="./Images/usd.png" 
              avatars={[
                { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d914da3aec1dab3600769687b602e1d4c74056d5a2cd1b33b073f4e6805f9b0c?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 3" },
              ]}
            />
            <div   className="add-card" onClick={() => alert('Add new card')}>
            <div style={{ marginTop: "90px", textAlign: "center" }}>
            <p style={{ marginBottom: "0px" }}>Add Currency</p>
            <p style={{ marginTop: "0px" }}>More Currency Will be Added Soon...</p>
          </div>

            </div>
            
          </div>
        </div>
      </div>


            </div>
    </div>
    </div>
    </div>
  );
}
    

export default TransferPage
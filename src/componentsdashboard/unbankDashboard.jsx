import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import './app.css';

function Ticker({ message }) {
  return (
    <div className="ticker">
      <marquee behavior="scroll" direction="left">{message}</marquee>
    </div>
  );
}

function CurrencyRateBox({ title, rate, change, changeType, onBoxClick }) {
  return (
    <div className="currency-rate-box" onClick={onBoxClick}>
      <div className="currency-rate-title">{title}</div>
      <div className="currency-rate-main">
        <span className="currency-rate-percentage">{rate}</span>
      </div>
      <div className="currency-rate-change">
        from last week → <span className={`currency-change-value ${changeType}`}>{change}</span>
      </div>
    </div>
  );
}

function OverviewBox() {
  return (
    <div className="overview-box">
      <div className="overview-icon">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/005ae3db4876b4ec59a2cdc6e9fb42efb39f1aea8bf81ffa16aa2dc92203d02e?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" alt="Verification Icon" />
      </div>
      <div className="overview-text">
        <div className="overview-title">Account verification not complete</div>
        <div className="overview-subtext">Please verify your account to unlock all features.</div>
      </div>
      <button className="overview-button">Verify →</button>
    </div>
  );
}

function CurrencyCard({ amount, currency, flag, avatars }) {
    return (
      <div className="currency-card">
        <div className="currency-details">
          <div className="currency-amount">{amount}</div>
          <div className="currency-label">{currency}</div> {/* Keterangan mata uang */}
        </div>
        <img src={flag} alt={currency} className="currency-flag" /> {/* Gambar bendera */}
        <div className="currency-actions">
          {/* Action icons here */}
        </div>
        {/* Container for avatars */}
        <div className="currency-avatars">
          {avatars && avatars.map((avatar, index) => (
            <img key={index} src={avatar.src} alt={avatar.alt} className="avatar" />
          ))}
        </div>
      </div>
    );
  }

  function Digital({ amountDig, currencyDig, flagDig, descDig}) {
    return (
      <div className="Digital-card">
        <div className="Digital-details">
          <div className="Digital-amount">{amountDig}</div>
          <div className="Digital-label">{currencyDig}</div>
          <div className="Digital-description">
        {descDig}
    </div> {/* Keterangan mata uang */}
        </div>
        <img src={flagDig} alt={currencyDig} className="Digital-flag" /> {/* Gambar bendera */}

      </div>
    );
  }
 
  
  
  
  

function UnbankDashboard() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState("Default message before any box is clicked.");

  function handleBoxClick(info) {
    setSelectedInfo(info);
  }

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
          <div className="currency-rate-container">
            <CurrencyRateBox 
              title="USDT to IDR Rate" 
              rate="85%" 
              change="+7.85%" 
              changeType="positive"
              onBoxClick={() => handleBoxClick("Information related to USDT to IDR Rate")} 
            />
            <CurrencyRateBox 
              title="IDR to USDT Rate" 
              rate="30%" 
              change="-7.85%" 
              changeType="negative"
              onBoxClick={() => handleBoxClick("Information related to IDR to USDT Rate")} 
            />
            <CurrencyRateBox 
              title="BTC to IDR Rate" 
              rate="20%" 
              change="+5.00%" 
              changeType="positive"
              onBoxClick={() => handleBoxClick("Information related to BTC to IDR Rate")} 
            />
            <CurrencyRateBox 
              title="BTC to USD Rate" 
              rate="10%" 
              change="-2.30%" 
              changeType="negative"
              onBoxClick={() => handleBoxClick("Information related to BTC to USD Rate")} 
            />
          </div>

          <Ticker message={selectedInfo} />

          <h2>Overview</h2>
          <OverviewBox />

          <div className="section">
            <div className="section-header-container">
              <div className="section-header">Currencies</div>
              <div className="divider"></div>
            </div>
            <p>You haven't added any currencies yet. Once you add them, they will be displayed here for your convenience.</p>

            <div  className="containers">
              <div style={{marginTop:"0px"}} className="currency-cards">
                <CurrencyCard 
                  amount="€0.00" 
                  currency="IDR" 
                  flag="./Images/indoflag.png" 
                  avatars={[
                    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 1" },
                    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9006f4ffc40aa5929124465b5d2770f98124c3a291173ae6a518a0036b5aec45?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 2" },
                    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d914da3aec1dab3600769687b602e1d4c74056d5a2cd1b33b073f4e6805f9b0c?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 3" }
                  ]}
                />
                <CurrencyCard 
                  amount="€0.00" 
                  currency="USD" 
                  flag="./Images/usd.png" 
                  avatars={[
                    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 1" },
                    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9006f4ffc40aa5929124465b5d2770f98124c3a291173ae6a518a0036b5aec45?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 2" },
                    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d914da3aec1dab3600769687b602e1d4c74056d5a2cd1b33b073f4e6805f9b0c?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 3" }
                  ]}
                />
                <div className="add-card" onClick={() => alert('Add new card')}>
                  <div style={{ marginTop: "50px" }}>Add currency</div>
                </div>
              </div>
            </div>
          </div>
          <div className="section">
  <div className="section-header-container">
    <div className="section-header">Digital Assets</div>
    <div className="divider"></div>
  </div>
  <p>You haven't added any currencies yet. Once you add them, they will be displayed here for your convenience.</p>
  <div className="containers">
    <div className="Digital-cards">
      <Digital amountDig="0.00000000 USDC" currencyDig="€0.00" flagDig="./Images/T.png" descDig="Tether" />
      <Digital amountDig="0.00000000 USDT" currencyDig="€0.00" flagDig="./Images/S.png" descDig="USD Coin" />
      <Digital amountDig="0.00000000 ETH" currencyDig="€0.00" flagDig="./Images/E.png" descDig="Enthereum" />
      <Digital amountDig="0.00000000 BTC" currencyDig="€0.00" flagDig="./Images/B.png" descDig="Bitcoin"/>
      <Digital amountDig="0.00000000 TRX" currencyDig="€0.00" flagDig="./Images/V.png" descDig="Tron" />
      <div className="add-card" onClick={() => alert('Add new card')}>
        <div style={{ marginTop: "50px" }}>Add currency</div>
      </div>
    </div>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}

export default UnbankDashboard;

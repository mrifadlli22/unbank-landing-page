import React, { useState, useEffect } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import './app.css';
import { useNavigate } from 'react-router-dom';



function Ticker() {
  return (
    <div className="ticker">
      <marquee behavior="scroll" direction="left">
        You can see general information right here!
      </marquee>
    </div>
  );
}
 
function OverviewBox() {

  const navigate = useNavigate(); // Inisialisasi navigate

  const handleVerifyClick = () => {
      navigate('/verification'); // Arahkan ke /verification saat tombol diklik
  };

  return (
    <div className="overview-box">
      <div className="overview-icon">
        <img src="https://cdn.builder.io/api/v1/image/assets/TEMP/005ae3db4876b4ec59a2cdc6e9fb42efb39f1aea8bf81ffa16aa2dc92203d02e?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920" alt="Verification Icon" />
      </div>
      <div className="overview-text">
        <div className="overview-title">Account verification not complete</div>
        <div className="overview-subtext">Please verify your account to unlock all features.</div>
      </div>
      <button className="overview-button" onClick={handleVerifyClick}>
            Verify →
        </button>
    </div>
  );
}

function CurrencyCard({ amount, currency, flag, avatars }) {
  const navigate = useNavigate();

  const handleAvatarClick = (flag) => {
    navigate('/transfer', { state: { flag } });
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
            className={`avatar ${index === 2 ? 'avatar-3' : ''}`} // Apply unique class for the third avatar
            onClick={() => index === 2 && handleAvatarClick(flag)} // Handle click for Avatar 3
          />
        ))}
      </div>
    </div>
  );
}



  function Digital({ amountDig, currencyDig, flagDig, descDig, avatars}) {
    return (
      <div className="Digital-card">
        <div className="Digital-details">
        <div className="Digital-description">
        {descDig}
    </div>
          <div className="Digital-amount">{amountDig}</div>
          <div className="Digital-label">{currencyDig}</div>
          <div className="digital-avatars">
          {avatars && avatars.map((avatar, index) => (
            <img key={index} src={avatar.src} alt={avatar.alt} className="avatar" />
          ))}
        </div>
        {/* Keterangan mata uang */}
        </div>
        <img src={flagDig} alt={currencyDig} className="Digital-flag" /> {/* Gambar bendera */}

      </div>
    );
  }
 
  function Bank({ Username, NoRek, bankCard, cardDig}) {
    return (
      <div className="Digital-card">
        <div className="Digital-details">
          <div className="bank-amount">{Username}</div>
          <div className="bank-label">{NoRek}</div>
          <div className="bank-description">
        {cardDig}
    </div> {/* Keterangan mata uang */}
        </div>
        <img src={bankCard} alt={NoRek} className="card-flag" /> {/* Gambar bendera */}

      </div>
    );
  }
  
  
  
  

function UnbankDashboard() {
  const [isMobileMenuActive, setIsMobileMenuActive] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState("You can see general information right here");

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

    const navigate = useNavigate(); // Inisialisasi navigate

    const handleVerifyClick = () => {
        navigate('/verification'); // Arahkan ke /verification saat tombol diklik
    };

  
  return (
    <div className="dashboard">
      <Header toggleSidebar={toggleSidebar} isMobileMenuActive={isMobileMenuActive} />
      <Sidebar isMobileMenuActive={isMobileMenuActive} toggleSidebar={toggleSidebar} />
      <div className="main">
          <div className="content">
          <Ticker /> {/* Tambahkan ticker di sini */}
          <div className='contentdash'>
          <h2>Overview</h2>
          <OverviewBox />

          <div className="section">
            <div className="section-header-container">
              <div className="section-header">Currencies</div>
              <div className="divider2"></div>
            </div>
            <p>You haven't added any currencies yet. Once you add them, they will be displayed here for your convenience.</p>

            <div  className="containers">
              <div style={{marginTop:"0px"}} className="currency-cards">
                <CurrencyCard 
                  amount="Rp.0,00" 
                  currency="IDR" 
                  flag="./Images/indoflag.png" 
                  avatars={[
                    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 1" },
                    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9006f4ffc40aa5929124465b5d2770f98124c3a291173ae6a518a0036b5aec45?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 2" },
                    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d914da3aec1dab3600769687b602e1d4c74056d5a2cd1b33b073f4e6805f9b0c?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 3" }
                  ]}
                />
                 <CurrencyCard 
                  amount="USD.0,00" 
                  currency="USD" 
                  flag="./Images/usd.png" 
                  avatars={[
                    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 1" },
                    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9006f4ffc40aa5929124465b5d2770f98124c3a291173ae6a518a0036b5aec45?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 2" },
                    { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d914da3aec1dab3600769687b602e1d4c74056d5a2cd1b33b073f4e6805f9b0c?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 3" }
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
          <div className="section">
  <div className="section-header-container">
    <div className="section-header">Digital Assets</div>
    <div className="divider2"></div>
  </div>
  <p>You haven't added any currencies yet. Once you add them, they will be displayed here for your convenience.</p>
  <div className="containers">
    <div className="Digital-cards">
      <Digital 
      amountDig="0.00000000 USDC" 
      currencyDig="$0.00" 
      flagDig="./Images/T.png" 
      descDig="Tether"
      avatars={[
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 1" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9006f4ffc40aa5929124465b5d2770f98124c3a291173ae6a518a0036b5aec45?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d914da3aec1dab3600769687b602e1d4c74056d5a2cd1b33b073f4e6805f9b0c?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 3" }
      ]} />
      <Digital 
      amountDig="0.00000000 USDT" 
      currencyDig="$0.00" 
      flagDig="./Images/S.png" 
      descDig="USD Coin"
      avatars={[
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 1" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9006f4ffc40aa5929124465b5d2770f98124c3a291173ae6a518a0036b5aec45?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d914da3aec1dab3600769687b602e1d4c74056d5a2cd1b33b073f4e6805f9b0c?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 3" }
      ]} />
      <Digital 
      amountDig="0.00000000 TRX" 
      currencyDig="$0.00" 
      flagDig="./Images/V.png" 
      descDig="Tron"
      avatars={[
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 1" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9006f4ffc40aa5929124465b5d2770f98124c3a291173ae6a518a0036b5aec45?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d914da3aec1dab3600769687b602e1d4c74056d5a2cd1b33b073f4e6805f9b0c?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 3" }
      ]} />
      <Digital 
      amountDig="0.00000000 BTC" 
      currencyDig="$0.00" 
      flagDig="./Images/B.png" 
      descDig="Bitcoin"
      avatars={[
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 1" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9006f4ffc40aa5929124465b5d2770f98124c3a291173ae6a518a0036b5aec45?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d914da3aec1dab3600769687b602e1d4c74056d5a2cd1b33b073f4e6805f9b0c?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 3" }
      ]}/>
      <Digital 
      amountDig="0.00000000 ETH" 
      currencyDig="$0.00" 
      flagDig="./Images/E.png" 
      descDig="Enthereum"
      avatars={[
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 1" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9006f4ffc40aa5929124465b5d2770f98124c3a291173ae6a518a0036b5aec45?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 2" },
        { src: "https://cdn.builder.io/api/v1/image/assets/TEMP/d914da3aec1dab3600769687b602e1d4c74056d5a2cd1b33b073f4e6805f9b0c?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920", alt: "Avatar 3" }
      ]} />
      <div className="add-card" onClick={() => alert('Add new card')}>
        <div style={{ marginTop: "50px" }}>Add Digital Assets</div>
      </div>
    </div>
  </div>
</div>
<div className="section">
  <div className="section-header-container">
    <div className="section-header">Bank Accounts</div>
    <div className="divider2"></div>
  </div>
  <p>You haven't added any currencies yet. Once you add them, they will be displayed here for your convenience.</p>
  <div className="containers">
    <div className="Digital-cards">
      <Bank Username="Leideovico" NoRek="0000 0000 0000 0000 000" bankCard="./Images/mandiri.png" cardDig="Bank Mandiri" />
      <Bank Username="Leideovico" NoRek="0000 0000 0000 0000 000" bankCard="./Images/bca.png" cardDig="Bank BCA" />
      <div className="add-card" onClick={() => alert('Add new card')}>
        <div style={{ marginTop: "50px" }}>Add Bank Card</div>
      </div>
    </div>
  </div>
</div>
<div className="section">
  <div className="section-header-container">
    <div className="section-header">Recent Transactions</div>
    <div className="divider2"></div>
    <button className="see-all-transactions-btn">See All Transactions</button>
  </div>

  <div className="containers2">
    <div className="no-transactions">
      <div className="no-transactions-icon">
        <i className="icon-info"></i>
      </div>
      <div className="no-transactions-text">
        <h3>No transactions yet</h3>
        <p>You haven't made any transactions yet, but don't worry! Once you start making transactions, they will be displayed here.</p>
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

export default UnbankDashboard;

import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";
import Header from "./header";
import "./app.css";
import { useNavigate } from "react-router-dom";

function Digital({ amountDig, currencyDig, flagDig, descDig, avatars }) {
  const navigate = useNavigate();

  const handleAvatarClickCrypto = (index) => {
    let tab;
    if (index === 1) {
      tab = "receive"; // Redirect to 'receive' for Avatar 1
    }
    navigate("/transfer-crypto", {
      state: { amountDig, flagDig, currencyDig, descDig, tab },
    });
  };

  return (
    <div className="Digital-card">
      <div className="Digital-details">
        <div className="Digital-description">{descDig}</div>
        <div className="Digital-amount">{amountDig}</div>
        <div className="Digital-label">{currencyDig}</div>
        <div className="digital-avatars">
          {avatars &&
            avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar.src}
                alt={avatar.alt}
                className={`avatar avatar-${index + 1}`} // Assign class avatar-1, avatar-2, avatar-3 based on index
                onClick={() => handleAvatarClickCrypto(index + 1)} // Pass tab index to handleAvatarClickCrypto
              />
            ))}
        </div>
      </div>
      <img src={flagDig} alt={currencyDig} className="Digital-flag" />{" "}
      {/* Gambar bendera */}
    </div>
  );
}

function Receive() {
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
            <h2>Receive Digital Assets</h2>
            <div className="section">
              <div className="section-header-container">
               </div>
              <p>
                You haven't added any currencies yet. Once you add them, they
                will be displayed here for your convenience.
              </p>
              <div className="containers">
                <div className="Digital-cards">
                  <Digital
                    amountDig="0.00000000 USDT"
                    currencyDig="$0.00"
                    flagDig="./Images/T.png"
                    descDig="Tether"
                    avatars={[
                      {
                        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920",
                        alt: "Avatar 1",
                      },
                    ]}
                  />
                  <Digital
                    amountDig="0.00000000 USDC"
                    currencyDig="$0.00"
                    flagDig="./Images/S.png"
                    descDig="USD Coin"
                    avatars={[
                      {
                        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920",
                        alt: "Avatar 1",
                      },
                    ]}
                  />
                  <Digital
                    amountDig="0.00000000 TRX"
                    currencyDig="$0.00"
                    flagDig="./Images/V.png"
                    descDig="Tron"
                    avatars={[
                      {
                        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920",
                        alt: "Avatar 1",
                      },
                    ]}
                  />
                  <Digital
                    amountDig="0.00000000 BTC"
                    currencyDig="$0.00"
                    flagDig="./Images/B.png"
                    descDig="Bitcoin"
                    avatars={[
                      {
                        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920",
                        alt: "Avatar 1",
                      },
                    ]}
                  />
                  <Digital
                    amountDig="0.00000000 ETH"
                    currencyDig="$0.00"
                    flagDig="./Images/E.png"
                    descDig="Enthereum"
                    avatars={[
                      {
                        src: "https://cdn.builder.io/api/v1/image/assets/TEMP/9acaf09f47c7f5999602ea0112056b80cfc0cb39b6567051c0b20f5eda626c2f?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920",
                        alt: "Avatar 1",
                      },
                    ]}
                  />
                  <div
                    className="add-card"
                    onClick={() => alert("Add new card")}
                  >
                    <div style={{ marginTop: "50px" }}>Add Digital Assets</div>
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

export default Receive;

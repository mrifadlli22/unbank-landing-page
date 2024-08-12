import React from "react";
import styles from "./BusinessPage.module.css";
import { useNavigate } from "react-router-dom";

function FeatureItem({ iconSrc, text }) {
  return (
    <div className={styles.featureItem}>
      <img src={iconSrc} alt="" className={styles.featureItemIcon} />
      <p className={styles.featureItemText}>{text}</p>
    </div>
  );
}

function FinancialPlatform() {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/register');
  };

  const features = [
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e1e5b1a36af6ace40f6b9f9ec62b0f98e31c162d2b8ebef9177e37b6b3d193ec?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920",
      text: "Seamless and easy daily operations",
    },
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/da6218d6e80090a4b77c131b321e19c00532dda7a330eb65b4a7bee54edf29c0?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920",
      text: "Diverse distribution of individual assets",
    },
    {
      iconSrc:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/6015d4979c0a13d976c52715e422b443ed42d6e8b76a08116a025b5a675d0f20?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920",
      text: "Global on-the-go access to all of your assets",
    },
  ];

  return (
    <section id="services" className={styles.financialPlatformSection}>
      <div className={styles.financialPlatformContent}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/6042680635eec1e50ce082b339bca906f36f29a8553b7d9d58fc9a9c10c5cf30?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920"
          alt="Financial Platform Illustration"
          className={styles.financialPlatformImage}
        />
        <div className={styles.financialPlatformInfo}>
          <h2 className={styles.sectionTitle}>
            21st Century Swiss Financial Platform
          </h2>
          <p className={styles.sectionDescription}>
            World renown tradition meets the best modern financial technology
            has to offer. Whether dealing in Euros, Dollars or Bitcoin, whether
            you're in Zurich, New York or Dubai, we promise you the full-suite
            Swiss quality experience.
          </p>
          {features.map((feature, index) => (
            <FeatureItem key={index} {...feature} />
          ))}
          <button onClick={handleSignUpClick} className={styles.ctaButton}>Open Account</button>
        </div>
      </div>
    </section>
  );
}

export default FinancialPlatform;

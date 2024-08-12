/**
 * This code was generated by Builder.io.
 */
import React from "react";
import styles from "./BusinessPage.module.css";

function Hero() {
  return (
    <section className={styles.heroSection}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroTitle}>
          Scale Your Business to <br />
          a Global Reach -  Bvnk <br />
         
        </h1>
        <p className={styles.heroDescription}>
          Enabling businesses to save time and money, seize new <br />
          opportunities, and scale operations to a Tennet quality standard.
        </p>
        <button className={styles.ctaButton}>Open Account</button>
      </div>
      <div className={styles.heroImageContainer}>
        <img
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/1a6fca3f7e9dd21ec1e2e358f7207e6d60d2b383d346e7d12cccff4c9fd8408b?placeholderIfAbsent=true&apiKey=e3ddd6dd58b748b09fc1391939743920"
          alt="Business scaling illustration"
          className={styles.heroImage}
        />
      </div>
    </section>
  );
}

export default Hero;

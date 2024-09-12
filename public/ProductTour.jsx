/**
 * This code was generated by Builder.io.
 */
import React from "react";
import styles from "./OTCDeskWebsite.module.css";

function TourStep({ number, description, image }) {
  return (
    <div className={styles.tourStep}>
      <div className={styles.tourStepContent}>
        <h3 className={styles.tourStepNumber}>{number}</h3>
        <p className={styles.tourStepDescription}>{description}</p>
      </div>
      <img
        src={image}
        alt={`Product tour step ${number}`}
        className={styles.tourStepImage}
      />
    </div>
  );
}

function ProductTour() {
  const steps = [
    {
      number: "01",
      description:
        "Our software plugs seamlessly into your onboarding process, allowing full control of who can use your platform. Every trader goes through a KYC process, designed to eliminate fraud. Your customers can link their custody wallets to the platform as proof to other traders that the posted assets are in their full control.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/310159fe45a86d3217c481b229b992f3d3f49cd162c6862018394aa4c579f33f?placeholderIfAbsent=true&apiKey=d04c07a3696b4df490c9872df5c4d2ba",
    },
    {
      number: "02",
      description:
        "OTCTrade.com locks in asset prices for 30 seconds while the deal is completing negotiations. This gives traders time to reconsider, re-price, validate or cancel.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/7a8342538610f68263e974b32dcca2574a3fccdc75f0bc47146e12aad0140328?placeholderIfAbsent=true&apiKey=d04c07a3696b4df490c9872df5c4d2ba",
    },
    {
      number: "03",
      description:
        "Traders get full control. Users verify and validate deal details before executing each trade. Security is enhanced with 2-Factor Authentication (2FA) to ensure safety. Once the trader confirms execution, the trade is settled instantly. Blazingly fast.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/f7dbde3cca67c994885eaa4c160602043c462a08f66b11c333a296120d24d6e5?placeholderIfAbsent=true&apiKey=d04c07a3696b4df490c9872df5c4d2ba",
    },
    {
      number: "04",
      description:
        "Get up to date information on deal transactions at the click of a button. Locate the transaction ID, time stamp, transaction amount, fees, counterparty information, and more. Now you can easily audit your deals from one screen.",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/d250ba11946acbeab3d6e75b01bce7ae57e278f4fc266123ed6909dabe668ea4?placeholderIfAbsent=true&apiKey=d04c07a3696b4df490c9872df5c4d2ba",
    },
  ];

  return (
    <section className={styles.productTour}>
      <h2 className={styles.sectionTitle}>
        Quick <strong>Product Tour</strong>
      </h2>
      {steps.map((step, index) => (
        <TourStep key={index} {...step} />
      ))}
      <hr className={styles.tourDivider} />
    </section>
  );
}

export default ProductTour;

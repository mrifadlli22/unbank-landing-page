/**
Updated code */
import React from "react";
import styles from "./BusinessPage.module.css";
import Header from "./Header";
import Hero from "./Hero";
import Features from "./Features";
import FinancialPlatform from "./FinancialPlatform";
import GlobalFinancialGateway from "./GlobalFinancialGateway";
import ECommerceSolutions from "./ECommerceSolutions";
import AssetManagement from "./AssetManagement";
import FAQ from "./FAQ";
import ContactForm from "./ContactForm";
import Footer from "./Footer";
import FAQBusiness from "./FAQ";

function BusinessPage() {
  return (
    <div className={styles.businessPage}>
      <main className={styles.mainContent}>
        <Header />
        <Hero />
        <Features />
        <FinancialPlatform />
        <GlobalFinancialGateway />
        <ECommerceSolutions />
        <AssetManagement />
        <FAQBusiness />
        <ContactForm />
        <Footer />
      </main>
    </div>
  );
}

export default BusinessPage;

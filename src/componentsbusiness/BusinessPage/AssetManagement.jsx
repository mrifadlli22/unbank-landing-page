import React from "react";
import styles from "./GetStarted.module.css";
import Button from "./Button/Button";

function AssetManagementStep({ number, title, description }) {
  return (
    <div className={styles.assetManagementStep}>
      <div className={styles.stepNumber}>{number}</div>
      <h3 className={styles.stepTitle}>{title}</h3>
      <p className={styles.stepDescription}>{description}</p>
    </div>
  );
}

function AssetManagement() {
  const steps = [
    {
      number: "1",
      text: "Registration and KYB",
      description: "Easily submit the required documents for evaluation."
    },
    {
      number: "2",
      text: "Account Confirmation",
      description: "Receive confirmation for your business account within a few hours."
    },
    {
      number: "3",
      text: "Launch Operations",
      description: "Begin operations with all of swissmoney capabilities available to you."
    },
  ];

  return (
    <section id="get-started" className={styles.getStarted}>
      <h2 className={styles.title}>How to Get Started?</h2>
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={styles.stepNumber}>{step.number}</div>
            <p className={styles.stepText}>{step.text}</p>
            {step.description && (
              <p className={styles.stepDescription}>{step.description}</p>
            )}
          </div>
        ))}
      </div>
      <Button variant="primary" className={styles.ctaButton}>
        Open Account
      </Button>
    </section>
  );
}

export default AssetManagement;

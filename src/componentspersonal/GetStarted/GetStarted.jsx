import React from "react";
import styles from "./GetStarted.module.css";
import Button from "../Button/Button";
import { useNavigate } from 'react-router-dom';

const GetStarted = () => {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/register');
  };
  const steps = [
    { number: "1", text: "Open a swissmoney private or business account" },
    {
      number: "2",
      text: "Provide the required documents to verify your identity",
    },
    { number: "3", text: "Order your first IBAN account and payment card" },
    {
      number: "4",
      text: "Manage your fiat and crypto finances all in one place",
    },
  ];

  return (
    <section className={styles.getStarted} id="get-started-section">
      <h2 className={styles.title}>How to Get Started?</h2>
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <div key={index} className={styles.step}>
            <div className={styles.stepNumber}>{step.number}</div>
            <p className={styles.stepText}>{step.text}</p>
          </div>
        ))}
      </div>
      <Button variant="primary" onClick={handleSignUpClick} className={styles.ctaButton}>
        Open Account
      </Button>
    </section>
  );
};

export default GetStarted;

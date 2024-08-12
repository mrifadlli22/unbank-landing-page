// ProductSection.jsx
import React from "react";
import styles from "./ProductSection.module.css";
import Button from "../Button/Button";
import { useNavigate } from 'react-router-dom';

const ProductSection = ({

  
  title,
  description,
  features,
  buttonText,
  imageSrc,
  imageAlt,
  reverse,
  id, // Tambahkan properti id
}) => {

  const navigate = useNavigate();

  const handleSignUpClick = () => {
    navigate('/register');
  };
  
  return (
    <section
      id={id} // Tambahkan id disini
      className={`${styles.productSection} ${reverse ? styles.reverse : ""}`}
    >
      <div className={styles.content}>
        <div className={styles.textContent}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
          <ul className={styles.featureList}>
            {features.map((feature, index) => (
              <li key={index} className={styles.featureItem}>
                <img src={feature.icon} alt="" className={styles.featureIcon} />
                <span>{feature.text}</span>
              </li>
            ))}
          </ul>
          <Button variant="primary" onClick={handleSignUpClick} className={styles.ctaButton}>
            {buttonText}
          </Button>
        </div>
        <div className={styles.imageWrapper}>
          <img src={imageSrc} alt={imageAlt} className={styles.productImage} />
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

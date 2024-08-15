import React from "react";
import styles from "./Footer.module.css";
import Logo from "../Logo/Logo";

const Footer = () => {
  const socialLinks = [
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/60c38c7b1583723296c093693e1f925cb216908f97bc7ebbbc8c6d1c807c91fc", alt: "Facebook", href: "#" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/175e2c99e0b2c9d29cbb515084d0d213168a4f45eb05c5521e5a62360b0a39b1", alt: "Twitter", href: "#" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/3fba2c6c87afcaf5785f2ee9aade59fc24a04762842a550a9a0c236ccf40ebd9", alt: "Instagram", href: "#" },
    { icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/41abf4db88b23e5489b1bbc8eed3f5740de8a1890266eda4bfced4507ec95511", alt: "LinkedIn", href: "#" }
  ];

  const footerLinks = [
    "General Terms of Use",
    "Privacy Policy",
    "Supervision",
    "Impressum",
    "Cookie Statement",
    "AML CTF Policy",
    "Digital Terms",
    "Financial Terms",
    "Blog",
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.topSection}>
          <Logo />
          <div className={styles.socialLinks}>
            {socialLinks.map((link, index) => (
              <a key={index} href={link.href} className={styles.socialLink}>
                <img src={link.icon} alt={link.alt} />
              </a>
            ))}
          </div>
        </div>
        <div className={styles.mainSection}>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Address</h3>
            <p className={styles.addressInfo}>Decentralized Finance Limited</p>
            <p className={styles.addressInfo}>Millenium Centennial Center Floor 4th</p>
            <p className={styles.addressInfo}>Jl. Jend. Sudirman, Kav.25. DKI Jakarta</p>
             <h3 className={styles.columnTitle}>Contact</h3>
            <p className={styles.contactInfo}>info@tennet.id</p>
            <p className={styles.contactInfo}>Support working hours:</p>
            <p className={styles.contactInfo}>Mon - Fri 8:00 - 18:00 (GMT+2)</p>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Links</h3>
            <div className={styles.linkColumns}>
              <ul className={styles.linkList}>
                {footerLinks.slice(0, 5).map((link, index) => (
                  <li key={index}>
                    <a href="#" className={styles.footerLink}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
              <ul className={styles.linkList}>
                {footerLinks.slice(5).map((link, index) => (
                  <li key={index}>
                    <a href="#" className={styles.footerLink}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Download app</h3>
            <div className={styles.qrCode}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/0b49fd22c9c3e25246a9bc6687ae8b09d4ed999de7c9825f1b5b548b3fd1bde5"
                alt="QR Code"
                className={styles.qrImage}
              />
              <div className={styles.qrText}>
                <p>Scan to download</p>
                <p>the bvnk app</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.bottomSection}>
          <h3 className={styles.disclaimerTitle}>Disclaimer</h3>
          <p className={styles.disclaimerText}>
            Unbank is a brand of Decentralized Finance Limited. Decentralized Finance Limited is affiliated with d'Organisme de Surveillance pour Intermédiaires Financiers & Trustees ("SO-FIT") (affiliation No.: 1179). SO-FIT is a self-regulatory organization approved by the Indonesia Federal Financial Markets Supervisory Authority (FINMA) for the supervision of financial intermediaries referred to in article 2 al. 3 of the Indonesia federal law on the fight against money laundering and the financing of terrorism (MLA).
          </p>
          <p className={styles.disclaimerText}>
            Decentralized Finance Limited is registered with the registered address at Millenium Centennial Center Floor 4th, Jl. Jend. Sudirman Kav.25. DKI Jakarta.
          </p>
          <p className={styles.copyright}>
            Copyright © 2024 Decentralized Finance Limited. All Right Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

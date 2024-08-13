  import React from "react";
  import styles from "./NavLinks.module.css";

  const NavLinks = () => {
    const scrollToWithOffset = (event, href, offset) => {
      event.preventDefault();
      const targetElement = document.querySelector(href);
      if (targetElement) {
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: targetPosition - offset,
          behavior: 'smooth',
        });
      }
    };

    const links = [
      { text: "Services", href: "#services" },
      { text: "Get started", href: "#get-started" },
      { text: "FAQ", href: "#faq" },
    ];

    return (
      <ul className={styles.navList}>
        {links.map((link, index) => (
          <li key={index} className={styles.navItem}>
            <a
              href={link.href}
              className={styles.navLink}
              onClick={(e) => scrollToWithOffset(e, link.href, 100)}
            >
              {link.text}
            </a>
          </li>
        ))}
      </ul>
    );
  };

  export default NavLinks;

import React, { useState, useEffect } from 'react';
import styles from "./Header.module.css";
import Logo from "../Logo/Logo";
import NavLinks from '../NavLinks/NavLinks';
import Button from '../Button/Button';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeToggle, setActiveToggle] = useState('personal');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (location.pathname === '/personalpage') {
      setActiveToggle('personal');
    } else if (location.pathname === '/businesspage') {
      setActiveToggle('business');
    }
  }, [location.pathname]);

  const handleToggle = (type) => {
    setActiveToggle(type);
    if (type === 'personal') {
      navigate('/personalpage', { replace: true });
      window.location.reload();
    } else if (type === 'business') {
      navigate('/businesspage', { replace: true });
      window.location.reload();
    }
  };

  const handleLogoClick = () => {
    navigate('/personalpage', { replace: true });
    window.location.reload();
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/register');
  };

  const handleScroll = () => {
    const header = document.querySelector(`.${styles.header}`);
    if (window.scrollY > 50) {
      header.classList.add(styles.blurry);
    } else {
      header.classList.remove(styles.blurry);
    }
  };

  const handleResize = () => {
    if (window.innerWidth > 991 && isMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.leftGroup}>
          <Logo onClick={handleLogoClick} />  {/* Pass handleLogoClick as onClick prop */}
          <div className={`${styles.toggleGroup} ${styles.toggleGroupDesktop}`}>
            <button
              className={`${styles.toggleButton} ${activeToggle === 'personal' ? styles.active : ''}`}
              onClick={() => handleToggle('personal')}
            >
              Personal
            </button>
            <button
              className={`${styles.toggleButton} ${activeToggle === 'business' ? styles.active : ''}`}
              onClick={() => handleToggle('business')}
            >
              Business
            </button>
          </div>
        </div>
        <div className={styles.rightGroup}>
          <nav className={styles.navigation}>
            <NavLinks />
          </nav>
          <div className={styles.buttonGroup}>
            <Button variant="primary" onClick={handleLoginClick}>Login</Button>
            <Button variant="secondary" onClick={handleSignUpClick}>Sign Up →</Button>
          </div>
        </div>
        <button className={styles.burgerMenu} onClick={toggleMenu}>
          <span className={styles.burgerIcon}></span>
        </button>
      </div>
      <div className={`${styles.dropdownMenu} ${isMenuOpen ? styles.open : ''}`}>
        <div className={styles.toggleGroupMobile}>
          <button
            className={`${styles.toggleButton} ${activeToggle === 'personal' ? styles.active : ''}`}
            onClick={() => handleToggle('personal')}
          >
            Personal
          </button>
          <button
            className={`${styles.toggleButton} ${activeToggle === 'business' ? styles.active : ''}`}
            onClick={() => handleToggle('business')}
          >
            Business
          </button>
        </div>
        <NavLinks />
        <div className={styles.menuButtonGroup}>
          <Button variant="primary" onClick={handleLoginClick}>Login</Button>
          <Button variant="secondary" onClick={handleSignUpClick}>Sign Up</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;

import React, { useState } from "react";
import styles from "./ContactForm.module.css";
import Button from "./Button/Button";

const PhoneInput = () => {
  const [formData, setFormData] = useState({ phone: '' });

  const handleChange = (e) => {
    const value = e.target.value;

    // Hanya izinkan angka dan +62 di awal
    const phoneNumber = value.replace(/[^0-9+]/g, ''); // Hapus karakter non-angka dan non-+
    const isValid = phoneNumber.startsWith('+62') && phoneNumber.length > 3;

    if (isValid || phoneNumber === '') {
      setFormData({ phone: phoneNumber });
    }
  };
}

const ContactForm = () => {
  const [formData, setFormData] = useState({
    subject: "personal",
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
  };

  return (
    <section className={styles.contactForm}>
      <h2 className={styles.title}>Contact Us</h2>
      <p className={styles.subtitle}>
        All your questions about Bvnk answered.
      </p>
      <form onSubmit={handleSubmit} className={styles.form}>
      <label htmlFor="fullName" className={styles.label}>
             Subject
          </label>
        <div className={styles.radioGroup}>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="subject"
              value="personal"
              checked={formData.subject === "personal"}
              onChange={handleChange}
            />
            Personal
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="subject"
              value="business"
              checked={formData.subject === "business"}
              onChange={handleChange}
            />
            Business
          </label>
          <label className={styles.radioLabel}>
            <input
              type="radio"
              name="subject"
              value="other"
              checked={formData.subject === "other"}
              onChange={handleChange}
            />
            Other
          </label>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="fullName" className={styles.label}>
            Full name
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="phone" className={styles.label}>
            Phone
          </label>
          <div className={styles.phoneInput}>
      <img
        src="Images/indo.png"
        alt="Phone icon"
        className={styles.phoneIcon}
      />
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className={styles.input}
        placeholder="+62XXXXXXXXXX"
      />
    </div>
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="message" className={styles.label}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textarea}
          ></textarea>
        </div>
        <Button type="submit" variant="primary" className={styles.submitButton}>
          Let's Talk
        </Button>
      </form>
    </section>
  );
};

export default ContactForm;

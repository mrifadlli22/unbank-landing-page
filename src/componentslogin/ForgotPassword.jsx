import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
    // Implementasi pengiriman email verifikasi bisa ditambahkan di sini
  };

  return (
    <div className="forgot-password-container">
      <div className="forgot-password-wrapper">
        <img src="./Images/Asset 12.png" alt="Logo" className="logo" />
        <div className="subtitle">Forgot Password</div>
        {!isSubmitted ? (
          <form onSubmit={handleSubmit}>
            <div className="form-field">
              <label htmlFor="email">Enter your email address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btns">
              Send Verification Email
            </button>
          </form>
        ) : (
          <div className="verification-message">
            A verification email has been sent to {email}. Please check your inbox and follow the instructions to reset your password.
          </div>
        )}
        <a href="/login" className="login-link">Back to Login</a>
      </div>
    </div>
  );
};

export default ForgotPassword;

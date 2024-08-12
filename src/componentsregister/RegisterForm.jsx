import React from 'react';
import './RegisterForm.css';
import useStore from './store'; // Adjust path as necessary

const RegisterForm = () => {
  const {
    firstName, lastName, email, password, confirmPassword, accountType,
    setFirstName, setLastName, setEmail, setPassword, setConfirmPassword, setAccountType
  } = useStore();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'first-name':
        setFirstName(value);
        break;
      case 'last-name':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'confirm-password':
        setConfirmPassword(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Registering with:", firstName, lastName, email, password, confirmPassword, accountType);
    // Handle registration logic here
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <img style={{maxWidth:"35%"}} src="./Images/Asset 12.png" alt="Logo" className="logo" />
        <div className="subtitle">Sign Up</div>
        <form onSubmit={handleSubmit}>
          <div className="form-field form-field-flex">
            <div className="form-field-half">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" name="first-name" value={firstName} onChange={handleInputChange} />
            </div>
            <div className="form-field-half">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" name="last-name" value={lastName} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={email} onChange={handleInputChange} />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={password} onChange={handleInputChange} />
          </div>
          <div className="form-field">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={handleInputChange} />
          </div>
          <div className="account-type">
            <label style={{fontWeight:"bold"}}>Choose Account Type:</label>
            <div style={{marginTop:"5px"}} className="account-options">
  {['personal', 'business'].map(type => (
    <label key={type} className={`account-option ${accountType === type ? 'selected' : ''}`}>
      <input
        type="radio"
        value={type}
        checked={accountType === type}
        onChange={() => setAccountType(type)}
        className="account-radio"
      />
      <div className={`option-icon ${type}-icon`}></div>
      <div className="option-info">
        <div className="option-title">{type === 'personal' ? 'Personal Account' : 'Business Account'}</div>
        <div className="option-description">{type === 'personal' ? 'All your personal finances in one place.' : 'Adaptable to your company\'s needs.'}</div>
      </div>
    </label>
  ))}
</div>

          </div>
          <div className="form-field">
            <label className="checkbox-container">
              <input type="checkbox" id="confirm-age" />
              I confirm that I am 18 years of age or older, and I agree to the General Terms of Use and Privacy Policy
            </label>
          </div>
          <button type="submit" className={`btn ${accountType === 'personal' ? 'btn-personal' : 'btn-business'}`}>
            {accountType === 'personal' ? 'Open Personal Account' : 'Open Business Account'}
          </button>
          <a href="/login" className="login-link">Already Have An Account? Login Here</a>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;

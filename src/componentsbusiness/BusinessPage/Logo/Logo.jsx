import React from "react";
import styles from "./Logo.module.css";

const Logo = ({ onClick }) => {
  return (
    <div style={{ marginLeft: "0px", cursor:"pointer" }} className="logo" onClick={onClick}>
      <img
        src="Images/Asset 12.png"
        alt="Logo Login"
        style={{ marginTop: "18px", marginRight: "25px", width: '140px', height: 'auto' }}
      />
    </div>
  );
};

export default Logo;

// Spinner.js
import React from "react";
import HashLoader from "react-spinners/HashLoader";
import "./Spinner.css"

const Spinner = () => {
  return (
    <div className="spinner-container">
      <HashLoader color="#ffffff" size={100} />
    </div>
  );
};

export default Spinner;

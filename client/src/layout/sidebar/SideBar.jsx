import React, { useState, useEffect } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Button from "react-bootstrap/Button";
import GetBrandNames from "../../pages/brands/GetBrandNames";

const SideBar = (props) => {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/brands");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brandes", error);
    }
  };

  return (
    <>
      <div className="side-content">
        <div className="side-nav-content">
          {" "}
          <h4>Find your brand</h4>
        </div>
        <div className="side-brand-list">
          <ul>
            {brands.map((brand, index) => (
              <li key={index}>
                <Link to={`/brands/${brand._id}`}>{brand.brandName}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="side-nav-content">
          <h4>Latest Mobile</h4>
        </div>
      </div>
    </>
  );
};

export default SideBar;

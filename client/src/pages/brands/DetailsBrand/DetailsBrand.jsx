import React, { useEffect, useState } from "react";
import "./DetailsBrand.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailsBrand = (props) => {
  const [brand, setBrand] = useState("");
  const { brandId } = useParams();

  useEffect(() => {
    fetchBrandDetails();
  }, []);

  const fetchBrandDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/brands/${brandId}`
      );
      setBrand(response.data);
    } catch (error) {
      console.error("Error fetching brand details", error);
    }
  };

  if (!brand) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div>
        <h2>{brand.brandName}</h2>
        <h3>Models:</h3>
        
      </div>
    </>
  );
};
export default DetailsBrand;

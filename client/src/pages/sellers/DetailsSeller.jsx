import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";

const DetailsSeller = (props) => {
  const { id } = useParams();
  const [seller, setSeller] = useState(null);
  const [mobiles, setMobiles] = useState([]);

  useEffect(() => {
    fetchSellerDetails();
  }, []);

  const fetchSellerDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sellers/${id}`
      );
      setSeller(response.data);
      // Fetch mobile details using the mobile Object IDs
      const mobileIds = response.data.mobiles;
      if (mobileIds && mobileIds.length > 0) {
        const mobilesResponse = await axios.get(
          `http://localhost:8000/api/mobiles`,
          {
            params: { ids: mobileIds }, // Pass the array of mobile IDs as query parameters
          }
        );
        setMobiles(mobilesResponse.data);
      }
    } catch (error) {
      console.error("Error fetching seller details", error);
    }
  };

  if (!seller) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <h2>Seller Details</h2>
        <Link to="/sellers">Back to Seller List</Link>
      </div>
      <div>
        <p>Seller Name: {seller.sellerName}</p>
        <p>Seller NIPT: {seller.sellerNipt}</p>
        <p>Location: {seller.location}</p>

        <h3>Mobiles:</h3>
        <div>
          {" "}
          {mobiles.length > 0 ? (
            <ul>
              {mobiles.map((mobile) => (
                <li key={mobile._id}>
                  <p>Brand: {mobile.brandName[0].brandName}</p>
                  <p>Model: {mobile.modelName[0].modelName}</p>
                  <p>Price: {mobile.price}</p>
                </li>
              ))}
              <Link to={""}>
                <Button>View</Button>
              </Link>
            </ul>
          ) : (
            <p>No mobiles found for this seller.</p>
          )}
        </div>
      </div>
    </>
  );
};
export default DetailsSeller;

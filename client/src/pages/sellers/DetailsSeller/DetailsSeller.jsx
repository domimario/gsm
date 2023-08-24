import React, { useState, useEffect } from "react";
import axios from "axios";
import Text from "../../../components/Text/Text";
import "./DetailsSeller.css";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { BsArrowLeft } from "react-icons/bs";
import GetModelsName from "../../brands/DetailsBrand/GetModelsName";

const DetailsSeller = (props) => {
  const { id } = useParams();
  const [seller, setSeller] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchSellerDetails();
  }, []);

  const fetchSellerDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sellers/${id}`
      );
      setSeller(response.data);
    } catch (error) {
      console.error("Error fetching seller details", error);
    }
  };

  if (!seller) {
    return <div>Loading...</div>;
  }

  const handleBackClick = () => {
    navigate("/sellers");
  };

  return (
    <>
      <div className="container">
        <div className=" container seller-name">
          <Text
            text={seller.sellerName}
            family={"open-sans"}
            lineheight={"l24"}
            size={"s40"}
            weight={"bold"}
            color={"white"}
          />
        </div>
        <br />
        <div className=" seller-models">
          <Button onClick={handleBackClick} className="back-button ">
            <BsArrowLeft size={15} />
          </Button>
          <Text
            text={"Phone Models"}
            family={"open-sans"}
            lineheight={"l24"}
            size={"s27"}
            weight={"bold"}
            color={"blue"}
          />
        </div>
        <br />
        <div>
          {seller.models.length > 0 ? (
            <ul>
              {seller.models.map((modelid, index) => (
                <li key={index}>
                  <p>
                    <GetModelsName modelId={modelid._id} index={index} />
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No models found for this seller.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default DetailsSeller;

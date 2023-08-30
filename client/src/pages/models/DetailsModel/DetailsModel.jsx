import React, { useState, useEffect } from "react";
import axios from "axios";
import "./DetailsModel.css";
import { useParams, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import ListGroup from "react-bootstrap/esm/ListGroup";
import { BsArrowLeft } from "react-icons/bs";
import Text from "../../../components/Text/Text";

const DetailsModel = () => {
  const { id } = useParams();
  const [model, setModel] = useState({});
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadModelDetails();
  }, []);

  const loadModelDetails = async () => {
    try {
      const response = await axios.get(
        `https://uthmtrqdvk.execute-api.eu-west-2.amazonaws.com/prod/api/models/${id}`
      );
      setModel(response.data);
      if (response.data.brand) {
        fetchSellersByModel(response.data.brand);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchSellersByModel = async (id) => {
    try {
      const response = await axios.get(
        `https://uthmtrqdvk.execute-api.eu-west-2.amazonaws.com/prod/api/sellers?model=${id}`
      );
      setSellers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackClick = () => {
    navigate("/models");
    // Implement this based on your routing setup
  };

  return (
    <div className="container">
      <div className="container model-name">
        <Text
          text={model.model}
          family={"open-sans"}
          lineheight={"l24"}
          size={"s40"}
          weight={"bold"}
          color={"white"}
        />
      </div>
      <br />
      <div className=" model-sellers">
        <Button onClick={handleBackClick} className="back-button ">
          <BsArrowLeft size={15} />
        </Button>
        <Text
          text={"Stores with this Model:"}
          family={"open-sans"}
          lineheight={"l24"}
          size={"s27"}
          weight={"bold"}
          color={"blue"}
        />
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <ListGroup>
              {sellers.map((sellers) => (
                <ListGroup.Item key={sellers._id}>
                  {sellers.sellerName}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsModel;

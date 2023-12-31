import React, { useEffect, useState } from "react";
import "./DetailsBrand.css";
import axios from "axios";
import Text from "../../../components/Text/Text";
import { useParams, Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import { BsArrowLeft } from "react-icons/bs";
import Card from "react-bootstrap/Card";
import GetModelsName from "./GetModelsName";
import { BASE_URL } from "../../../api";
// import { Auth } from "aws-amplify";

const DetailsBrand = (props) => {
  const [brand, setBrand] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrandDetails();
  }, []);

  const fetchBrandDetails = async () => {
    // const user = await Auth.currentAuthenticatedUser();
    // const token = user.signInUserSession.idToken.jwtToken;
    try {
      const brandResponse = await axios.get(
        `${BASE_URL}/brands/${id}`,
        // {
        //   headers: {
        //     Authorization: token,
        //   },
        // }
      );
      const brandData = brandResponse.data;
      setBrand(brandData);
    } catch (error) {
      console.error("Error fetching brand details", error);
    }
  };

  if (!brand) {
    return <div>Loading...</div>;
  }

  const handleBackClick = () => {
    navigate("/brands");
  };
  return (
    <>
      <div className="container">
        <div className="container brand-name">
          <Text
            text={brand.brandName}
            family={"open-sans"}
            lineheight={"l24"}
            size={"s40"}
            weight={"bold"}
            color={"white"}
          />
        </div>
        <br />
        <div className="brand-models">
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
        <div className="model-cards">
          {brand.models.map((model, index) => (
            <Card key={index} style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>
                  {console.log("this is a model" + model._id)}
                  <GetModelsName modelId={model._id} index={index} />
                </Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};
export default DetailsBrand;

import React, { useState, useEffect } from "react";
import "./AddBrand.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AddPost from "./AddSellerEnuminacion.svg";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";
import Text from "../../../components/Text/Text";
import { Auth } from "aws-amplify";
import { BASE_URL } from "../../../api";
import Message from "../../../components/notAuth/Message";

const AddBrand = (props) => {
  const navigate = useNavigate();
  const [brand, setBrand] = useState({
    brandName: "",
    brandOrigin: "",
    models: [],
  });
  const [modelsList, setModelsList] = useState([]);

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-models`); // Updated URL
      setModelsList(response.data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    try {
      const newBrand = {
        brandName: brand.brandName,
        brandOrigin: brand.brandOrigin,
        models: brand.models,
      };

      const response = await axios.post(`${BASE_URL}/create-brand`, newBrand, {
        headers: {
          Authorization: token,
        },
      });
      Swal.fire({
        position: "center-top",
        icon: "success",
        title: "New brand has been saved",
        showConfirmButton: false,
        timer: 2700,
      });
      navigate("/brands");
      console.log("New brand created: ", response.data);

      setBrand({
        brandName: "",
        brandOrigin: "",
        models: [],
      });
    } catch (error) {
      console.error("Error creating brand:", error);
    }
  };

  const clearForm = () => {
    setBrand({
      brandName: "",
      brandOrigin: "",
      models: [],
    });
  };

  const handleBackClick = () => {
    navigate("/brands");
  };

  const onModelsChange = (e) => {
    const selectedModels = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setBrand({ ...brand, models: selectedModels });
  };

  const isAuthenticated = Auth.user;
  if (!isAuthenticated) {
    return <Message />;
  }

  return (
    <>
      <div className=" container container-add">
        <div className="row">
          <div className="col-md-6">
            <img src={AddPost} alt="" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <div className="new-seller-head">
              {" "}
              <Button onClick={handleBackClick} className="back-button ">
                <BsArrowLeft size={15} />
              </Button>
              <Text
                text={"New Brand"}
                family={"open-sans"}
                lineheight={"l24"}
                size={"s40"}
                weight={"bold"}
                color={"white"}
              />
            </div>
            <div className="add-form">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>
                    {" "}
                    <Text
                      text={"Brand Name"}
                      family={"open-sans"}
                      lineheight={"l20"}
                      size={"s16"}
                      weight={"regular"}
                      color={"white"}
                    />
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="ex . Samsung"
                    value={brand.brandName}
                    onChange={(e) =>
                      setBrand({ ...brand, brandName: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    {" "}
                    <Text
                      text={"Brand Origin"}
                      family={"open-sans"}
                      lineheight={"l20"}
                      size={"s16"}
                      weight={"regular"}
                      color={"white"}
                    />
                  </Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="ex . South Korea"
                    value={brand.brandOrigin}
                    onChange={(e) =>
                      setBrand({ ...brand, brandOrigin: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Label>
                  {" "}
                  <Text
                    text={"Choose multiple models"}
                    family={"open-sans"}
                    lineheight={"l20"}
                    size={"s16"}
                    weight={"regular"}
                    color={"white"}
                  />
                </Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  value={brand.models}
                  onChange={onModelsChange}
                >
                  {modelsList.map((model) => (
                    <option key={model._id} value={model._id}>
                      {model.model}
                    </option>
                  ))}
                </Form.Control>

                <div className="button-forms">
                  {" "}
                  <Button type="submit" variant="success">
                    Add Brand
                  </Button>{" "}
                  <Button onClick={clearForm} variant="danger">
                    Clear All
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBrand;

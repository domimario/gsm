import React, { useState, useEffect } from "react";
import "./AddMobile.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AddPost from "./AddSellerEnuminacion.svg";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";

const AddMobile = (props) => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [brandName, setBrandName] = useState("");
  const [modelName, setModelName] = useState("");
  const [conditions, setConditions] = useState("");
  const [comment, setComment] = useState("");
  const [price, setPrice] = useState("");
  const navigate = useNavigate();

  const clearForm = () => {
    setBrands([]);
    setModels([]);
    setBrandName("");
    setModelName("");
    setConditions("");
    setComment("");
    setPrice("");
  };

  useEffect(() => {
    fetchBrands();
    fetchModels();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/brands");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brands", error);
    }
  };

  const fetchModels = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/models");
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newMobile = {
        brandName,
        modelName,
        conditions,
        comment,
        price,
      };

      const response = await axios.post(
        "http://localhost:8000/api/mobiles",
        newMobile
      );

      Swal.fire({
        position: "center-top",
        icon: "success",
        title: "New mobile has been added",
        showConfirmButton: false,
        timer: 2700,
      });

      navigate("/mobiles");
      console.log("New Mobile created: ", response.data);

      // Reset the form fields after successful submission
      setBrandName("");
      setModelName("");
      setConditions("");
      setComment("");
      setPrice("");
    } catch (error) {
      console.error("Error adding mobile", error);
    }
  };

  const handleBackClick = () => {
    navigate("/mobiles");
  };

  return (
    <>
      <div className="container-add">
        <div className="row">
          <div className="col-md-6">
            <img src={AddPost} alt="" className="img-fluid" />
          </div>
          <div className="col-md-6">
            <div className="new-seller-head">
              {" "}
              <Button onClick={handleBackClick} className="back-button ">
                <BsArrowLeft size={25} />
              </Button>
              <h1>New Mobile</h1>
            </div>
            <div className="add-form"></div>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Brand Name</Form.Label>
                <Form.Control
                  as="select"
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                >
                  <option value="">Select Brand</option>
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
                      {brand.brandName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Model Name</Form.Label>
                <Form.Control
                  as="select"
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                >
                  <option value="">Select Model</option>
                  {models.map((model) => (
                    <option key={model._id} value={model._id}>
                      {model.modelName}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Conditions</Form.Label>
                <Form.Control
                  required
                  type="number"
                  placeholder="9"
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  required
                  type="message"
                  placeholder="the phone is broken"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Price</Form.Label>
                
                <Form.Control
                  required
                  type="number"
                  placeholder="500 ALL"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <div className="button-forms">
                <Button type="submit" variant="success">
                  Add Mobile
                </Button>{" "}
                <Button onClick={clearForm} variant="danger">
                  Clear All
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMobile;
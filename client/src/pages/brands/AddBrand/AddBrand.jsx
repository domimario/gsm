import React, { useState, useEffect } from "react";
import "./AddBrand.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AddPost from "./AddSellerEnuminacion.svg";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";

const AddBrand = (props) => {
  const [brandName, setBrandName] = useState("");
  const [brandOrigin, setBrandOrigin] = useState("");
  const navigate = useNavigate();

  const clearForm = () => {
    setBrandName("");
    setBrandOrigin("");
  };

  const handleBackClick = () => {
    navigate("/brands");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newBrand = {
        brandName,
        brandOrigin,
      };

      const response = await axios.post(
        "http://localhost:8000/api/brands",
        newBrand
      );
      Swal.fire({
        position: "center-top",
        icon: "success",
        title: "New brand has been saved",
        showConfirmButton: false,
        timer: 2700,
      });
      navigate("/brands");
      console.log("New brand created: ", response.data);

      setBrandName("");
      setBrandOrigin("");
    } catch (error) {}
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
              <h1>New Seller</h1>
            </div>
            <div className="add-form">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Brand Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="ex . Samsung"
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Brand Origin</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="ex . South Korea"
                    value={brandOrigin}
                    onChange={(e) => setBrandOrigin(e.target.value)}
                  />
                </Form.Group>

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

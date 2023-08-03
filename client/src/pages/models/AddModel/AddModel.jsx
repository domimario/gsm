import React, { useState } from "react";
import "./AddModel.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AddPost from "./AddSellerEnuminacion.svg";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";

const AddModel = (props) => {
  const [modelName, setModelName] = useState("");
  const [ram, setRam] = useState("");
  const [memory, setMemory] = useState("");
  const [modelColor, setModelColor] = useState("");
  const navigate = useNavigate();

  const clearForm = () => {
    setModelName("");
    setRam("");
    setMemory("");
    setModelColor("");
  };

  const handleBackClick = () => {
    navigate("/models");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newModel = {
        modelName,
        ram,
        memory,
        modelColor,
      };

      const response = await axios.post(
        "http://localhost:8000/api/models",
        newModel
      );
      Swal.fire({
        position: "center-top",
        icon: "success",
        title: "New model has been saved",
        showConfirmButton: false,
        timer: 2700,
      });
      navigate("/models");
      console.log("New mdoel created: ", response.data);

      setModelName("");
      setRam("");
      setMemory("");
      setModelColor("");
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
              <h1>New Model</h1>
            </div>
            <div className="add-form">
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Model Name</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="ex . Galaxy S23 Ultra"
                    value={modelName}
                    onChange={(e) => setModelName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Ram</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="ex . 8"
                    value={ram}
                    onChange={(e) => setRam(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Memory</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    placeholder="ex . 128"
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    placeholder="ex . Red"
                    value={modelColor}
                    onChange={(e) => setModelColor(e.target.value)}
                  />
                </Form.Group>
                <div className="button-forms">
                  {" "}
                  <Button type="submit" variant="success">
                    Add Seller
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

export default AddModel;

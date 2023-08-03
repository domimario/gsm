import React, { useState, useEffect } from "react";
import "./EditModel.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import EditSVG from "./undraw_up_to_date_re_nqid.svg";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";

const EditModel = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [model, setModel] = useState({
    modelName: "",
    ram: "",
    memory: "",
    modelColor: "",
  });
  const [originalModel, setOriginalModel] = useState({
    modelName: "",
    ram: "",
    memory: "",
    modelColor: "",
  });

  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/models/${id}`
      );
      setModel(response.data); // Update the state with the loaded seller data
      setOriginalModel(response.data); // Save the original seller data
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModel({
      ...model,
      [name]: value,
    });
  };

  const update = async (e) => {
    await axios.put(`http://localhost:8000/api/models/${id}`, model);
  };

  const clearForm = () => {
    setModel({ ...originalModel });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      });

      if (result.isConfirmed) {
        await update();
        Swal.fire("Saved!", "", "success");
        navigate("/models");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackClick = () => {
    navigate("/models");
  };

  return (
    <>
      <div className="edit-content">
        <div className="container mt-4 ">
          <div className="row">
            <div className="col-md-6">
              <img src={EditSVG} alt="" className="img-fluid edit-img" />
            </div>
            <div className="col-md-6">
              <div className="edit-seller-head">
                {" "}
                <Button onClick={handleBackClick} className="back-button ">
                  <BsArrowLeft size={25} />
                </Button>
                <h1>Edit Model</h1>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="sellerName">
                  <Form.Label>Model Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex . Galaxy S23 Ultra"
                    name="modelName"
                    value={model.modelName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="sellerNipt">
                  <Form.Label>Ram</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ex . 8"
                    name="ram"
                    value={model.ram}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="location">
                  <Form.Label>Memory</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ex . 128"
                    name="location"
                    value={model.memory}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="location">
                  <Form.Label>Model Color</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ex . Red"
                    name="modelColor"
                    value={model.modelColor}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <div className="edit-button">
                  <Button type="submit" variant="success">
                    Update
                  </Button>{" "}
                  {""}
                  <Button onClick={clearForm} variant="danger">
                    Reset All
                  </Button>
                  {"  "}
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditModel;

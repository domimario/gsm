import React, { useState, useEffect } from "react";
import "./EditModel.css";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import EditSVG from "./undraw_up_to_date_re_nqid.svg";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";
import Text from "../../../components/Text/Text";

const EditModel = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [models, setModels] = useState({
    model: "",
    ram: "",
    memory: "",
    color: "",
  });

  const [originalModel, setOriginalModel] = useState({
    model: "",
  });

  useEffect(() => {
    loadModel();
  }, []);

  const loadModel = async () => {
    try {
      const response = await axios.get(
        `https://uthmtrqdvk.execute-api.eu-west-2.amazonaws.com/prod/api/models/${id}`
      );
      setModels(response.data); // Update the state with the loaded seller data

      setOriginalModel(response.data); // Save the original seller data
    } catch (error) {
      console.error("Error loading model:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModels({
      ...models,
      [name]: value,
    });
  };

  const update = async (e) => {
    await axios.put(`https://uthmtrqdvk.execute-api.eu-west-2.amazonaws.com/prod/api/models/${id}`, models);
    console.log("Model updated successfully!");
  };

  const clearForm = () => {
    setModels({ ...originalModel });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting the form...");
    try {
      console.log("Updating model...");
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
      <div className=" container edit-content">
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
                <Text
                  text={"Edit Model"}
                  family={"open-sans"}
                  lineheight={"l24"}
                  size={"s40"}
                  weight={"bold"}
                  color={"white"}
                />
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>Model Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex . Galaxy S23 Ultra"
                    name="model"
                    value={models.model}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Ram</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ex . 8"
                    name="ram"
                    value={models.ram}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Memory</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex . 128"
                    name="memory"
                    value={models.memory}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Color</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex . Red"
                    name="color"
                    value={models.color}
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

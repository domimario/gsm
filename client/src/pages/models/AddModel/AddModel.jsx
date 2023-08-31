import React, { useState, useEffect } from "react";
import "./AddModel.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AddPost from "./AddSellerEnuminacion.svg";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";
import Text from "../../../components/Text/Text";

const AddModel = () => {
  const [model, setModel] = useState("");
  const [ram, setRam] = useState("");
  const [memory, setMemory] = useState("");
  const [color, setColor] = useState("");

  const navigate = useNavigate();

  useEffect(() => {}, []);

  const clearForm = () => {
    setModel("");
    setRam("");
    setMemory("");
    setColor("");
  };

  const handleBackClick = () => {
    navigate("/models");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newModel = {
        model,
        ram,
        memory,
        color,
      };

      const response = await axios.post(
        "https://ii8hbtn459.execute-api.eu-west-2.amazonaws.com/dev/create-model",
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
      console.log("New model created: ", response.data);

      setModel("");
      // Clear selected brand after submission
    } catch (error) {
      console.error("Error adding model", error);
    }
  };

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
                text={"New Model"}
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
                      text={"Model Name"}
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
                    placeholder="ex . Galaxy S23 Ultra"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    {" "}
                    <Text
                      text={"Ram"}
                      family={"open-sans"}
                      lineheight={"l20"}
                      size={"s16"}
                      weight={"regular"}
                      color={"white"}
                    />
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ex . 8"
                    value={ram}
                    onChange={(e) => setRam(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    {" "}
                    <Text
                      text={"Memory"}
                      family={"open-sans"}
                      lineheight={"l20"}
                      size={"s16"}
                      weight={"regular"}
                      color={"white"}
                    />
                  </Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="ex . 64"
                    value={memory}
                    onChange={(e) => setMemory(e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>
                    {" "}
                    <Text
                      text={"Color"}
                      family={"open-sans"}
                      lineheight={"l20"}
                      size={"s16"}
                      weight={"regular"}
                      color={"white"}
                    />
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="ex . Red"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                  />
                </Form.Group>

                <div className="button-forms">
                  {" "}
                  <Button type="submit" variant="success">
                    Add Model
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

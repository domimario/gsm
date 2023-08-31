import React, { useState } from "react";
import axios from "axios";
import "./AddSeller.css";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import AddPost from "./AddSellerEnuminacion.svg";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";
import Text from "../../../components/Text/Text";

const AddSeller = (props) => {
  const [sellerName, setSellerName] = useState("");
  const [sellerNipt, setSellerNipt] = useState("");
  const [location, setLocation] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const clearForm = () => {
    setSellerName("");
    setSellerNipt("");
    setLocation("");
    setError(null);
    setValidated(false);
  };

  const handleBackClick = () => {
    navigate("/sellers");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!sellerName || !sellerNipt || !location) {
      setError("Please fill in all required fields.");
      setValidated(true);
      return;
    }

    try {
      const newSeller = {
        sellerName,
        sellerNipt,
        location,
      };

      const response = await axios.post(
        "https://ii8hbtn459.execute-api.eu-west-2.amazonaws.com/dev/create-seller",
        newSeller
      );
      Swal.fire({
        position: "center-top",
        icon: "success",
        title: "New seller has been saved",
        showConfirmButton: false,
        timer: 2700,
      });
      navigate("/sellers");
      console.log("New Seller created: ", response.data);

      setSellerName("");
      setSellerNipt("");
      setLocation("");
      setError(null);
      setValidated(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "An error occurred while creating the seller."
      );
    }
  };

  return (
    <>
      <div className="container">
        <div className="container-add">
          <div className="row">
            <div className="col-md-6">
              <img src={AddPost} alt="" className="img-fluid" />
            </div>
            <div className="col-md-6">
              <div className="new-seller-head">
                <Button onClick={handleBackClick} className="back-button ">
                  <BsArrowLeft size={15} />
                </Button>
                <Text
                  text={"New Seller"}
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
                      <Text
                        text={"Seller Name"}
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
                      placeholder="ex . Tegeria"
                      value={sellerName}
                      onChange={(e) => setSellerName(e.target.value)}
                      isInvalid={validated && !sellerName}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      {" "}
                      <Text
                        text={"NIPT"}
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
                      placeholder="ex . A12345678A"
                      value={sellerNipt}
                      onChange={(e) => setSellerNipt(e.target.value)}
                      isInvalid={validated && !sellerNipt}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>
                      {" "}
                      <Text
                        text={"Location"}
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
                      placeholder="ex . Tirane"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      isInvalid={validated && !location}
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
      </div>
    </>
  );
};
export default AddSeller;

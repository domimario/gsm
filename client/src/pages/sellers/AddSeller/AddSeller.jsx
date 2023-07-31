import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

const AddSeller = (props) => {
  const [sellerName, setSellerName] = useState("");
  const [sellerNipt, setSellerNipt] = useState("");
  const [location, setLocation] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const newSeller = {
        sellerName,
        sellerNipt,
        location,
      };

      setValidated(true);
      const response = await axios.post(
        "http://localhost:8000/api/sellers",
        newSeller
      );
      navigate("/sellers");
      console.log("New Seller created: ", response.data);

      setSellerName("");
      setSellerNipt("");
      setLocation("");
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label></Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Seller Name"
              value={sellerName}
              onChange={(e) => setSellerName(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Name.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label></Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="NIPT"
              value={sellerNipt}
              onChange={(e) => setSellerNipt(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid NIPT.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label></Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <Form.Control.Feedback type="invalid">
              Please provide a valid Location.
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Button type="submit">Add Seller</Button>{" "}
        <Link to={"/sellers"}>
          <Button variant="danger">Cancel</Button>
        </Link>
      </Form>
    </>
  );
};
export default AddSeller;

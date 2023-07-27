import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

const EditSeller = (props) => {
  const { id } = useParams();
  const [sellerName, setSellerName] = useState("");
  const [sellerNipt, setSellerNipt] = useState("");
  const [location, setLocation] = useState("");
  const [validated, setValidated] = useState(false);
  const [error, setError] = useState(null);
  const [errorMessages, setErrorMessages] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchSeller();
  }, []);

  const fetchSeller = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sellers/${id}`
      );
      const sellerData = response.data;
      setSellerName(sellerData.sellerName);
      setSellerNipt(sellerData.sellerNipt);
      setLocation(sellerData.location);
    } catch (error) {
      setError("Error fetching seller data");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity()) {
      setValidated(true);
      return;
    }
    try {
      const updatedSeller = {
        sellerName,
        sellerNipt,
        location,
      };

      const response = await axios.put(
        `http://localhost:8000/api/sellers/${id}`,
        updatedSeller
      );
      console.log("Seller updated:", response.data);
      navigate("/sellers");
    } catch (error) {
      setError("Error updating seller");
      setErrorMessages(error.response.data);
    }
  };

  return (
    <>
      <h2>EDIT SELLER</h2>
      <Link to="/sellers">Back to Seller List</Link>
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
            {errorMessages.sellerName && (
              <div className="invalid-feedback">{errorMessages.sellerName}</div>
            )}
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
            {errorMessages.sellerNipt && (
              <div className="invalid-feedback">{errorMessages.sellerNipt}</div>
            )}
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
            {errorMessages.location && (
              <div className="invalid-feedback">{errorMessages.location}</div>
            )}
          </Form.Group>
        </Row>
        <Button type="submit">Update Seller</Button>
        <Link to={"/sellers"}>
          {" "}
          <Button type="button" variant="danger">
            Cancel
          </Button>
        </Link>
      </Form>
    </>
  );
};

export default EditSeller;

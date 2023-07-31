import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

const EditSeller = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState({
    sellerName: "",
    sellerNipt: "",
    location: "",
  });

  
  useEffect(() => {
    loadSeller();
  }, []);

  const loadSeller = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/sellers/${id}`
      );
      setSeller(response.data); // Update the state with the loaded seller data
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSeller({
      ...seller,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/sellers/${id}`, seller);
      navigate("/sellers"); // Redirect to the sellers page after successful update
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Seller Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="sellerName"
              value={seller.sellerName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Nipt</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Nipt"
              name="sellerNipt"
              value={seller.sellerNipt}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Location"
              name="location"
              value={seller.location}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Link to={"/sellers"}>
            <Button variant="danger">Cancel</Button>
          </Link>{" "}
          <Button type="submit">Update</Button>
        </Form>
      </div>
    </>
  );
};

export default EditSeller;

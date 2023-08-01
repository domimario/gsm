import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditSeller.css";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import EditSVG from "./undraw_up_to_date_re_nqid.svg";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";

const EditSeller = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState({
    sellerName: "",
    sellerNipt: "",
    location: "",
  });
  const [originalSeller, setOriginalSeller] = useState({
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
      setOriginalSeller(response.data); // Save the original seller data
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

  const update = async (e) => {
    await axios.put(`http://localhost:8000/api/sellers/${id}`, seller);
  };

  const clearForm = () => {
    setSeller({ ...originalSeller });
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
        navigate("/sellers");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackClick = () => {
    navigate("/sellers");
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
                <h1>Edit Seller</h1>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="sellerName">
                  <Form.Label>Seller Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="sellerName"
                    value={seller.sellerName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="sellerNipt">
                  <Form.Label>Nipt</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Nipt"
                    name="sellerNipt"
                    value={seller.sellerNipt}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="location">
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Location"
                    name="location"
                    value={seller.location}
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

export default EditSeller;

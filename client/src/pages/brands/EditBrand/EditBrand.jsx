import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditBrand.css";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import EditSVG from "./undraw_up_to_date_re_nqid.svg";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";

const EditBrand = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState({
    brandName: "",
    brandOrigin: "",
  });
  const [originalBrand, setOriginalBrand] = useState({
    brandName: "",
    brandOrigin: "",
  });

  useEffect(() => {
    loadBrand();
  }, []);

  const loadBrand = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/brands/${id}`
      );
      setBrand(response.data); // Update the state with the loaded brand data
      setOriginalBrand(response.data); // Save the original brand data
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBrand({
      ...brand,
      [name]: value,
    });
  };

  const update = async (e) => {
    await axios.put(`http://localhost:8000/api/brands/${id}`, brand);
  };
  const clearForm = () => {
    setBrand({ ...originalBrand });
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
        navigate("/brands");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackClick = () => {
    navigate("/brands");
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
                <h1>Edit Brand</h1>
              </div>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="sellerName">
                  <Form.Label>Brand Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="brandName"
                    value={brand.brandName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="sellerNipt">
                  <Form.Label>Brand Origin</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Origin"
                    name="brandOrigin"
                    value={brand.brandOrigin}
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
export default EditBrand;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditMobile.css";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import EditSVG from "./undraw_up_to_date_re_nqid.svg";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";

const EditMobile = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [mobile, setMobile] = useState({
    brandName: "",
    modelName: "",
    conditions: "",
    comment: "",
    price: "",
  });
  const [originalMobile, setOriginalMobile] = useState({
    brandName: "",
    modelName: "",
    conditions: "",
    comment: "",
    price: "",
  });

  useEffect(() => {
    loadMobile();
    fetchBrands();
    fetchModels();
  }, []);

  const loadMobile = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/mobiles/${id}`
      );
      setMobile(response.data); // Update the state with the loaded mobile data
      setOriginalMobile(response.data); // Save the original mobile data
    } catch (error) {
      console.log(error);
    }
  };
  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/brands");
      setBrands(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchModels = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/models");
      setModels(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMobile({
      ...mobile,
      [name]: value,
    });
  };

  const update = async () => {
    await axios.put(`http://localhost:8000/api/mobiles/${id}`, mobile);
  };

  const clearForm = () => {
    setMobile({ ...originalMobile });
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
        navigate("/mobiles");
      } else if (result.isDenied) {
        Swal.fire("Changes are not saved", "", "info");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleBackClick = () => {
    navigate("/mobiles");
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
                <h1>Edit Mobile</h1>
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="brandName">
                  <Form.Label>Brand Name</Form.Label>
                  <Form.Control
                    as="select"
                    name="brandName"
                    value={mobile.brandName}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a brand</option>
                    {brands.map((brand) => (
                      <option key={brand._id} value={brand._id}>
                        {brand.brandName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="modelName">
                  <Form.Label>Model Name</Form.Label>
                  <Form.Control
                    as="select"
                    name="modelName"
                    value={mobile.modelName}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a model</option>
                    {models.map((model) => (
                      <option key={model._id} value={model._id}>
                        {model.modelName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="conditions">
                  <Form.Label>Conditions</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter conditions"
                    name="conditions"
                    value={mobile.conditions}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter comment"
                    name="comment"
                    value={mobile.comment}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter price"
                    name="price"
                    value={mobile.price}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <div className="edit-button">
                  <Button type="submit" variant="success">
                    Update
                  </Button>{" "}
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

export default EditMobile;

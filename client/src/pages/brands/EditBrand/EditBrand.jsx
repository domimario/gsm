import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditBrand.css";
import { useParams, useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import EditSVG from "./undraw_up_to_date_re_nqid.svg";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";
import Text from "../../../components/Text/Text";
import { Auth } from "aws-amplify";
import { BASE_URL } from "../../../api";
import Message from "../../../components/notAuth/Message";

const EditBrand = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [brand, setBrand] = useState({
    brandName: "",
    brandOrigin: "",
    models: [],
  });
  const [originalBrand, setOriginalBrand] = useState({
    brandName: "",
    brandOrigin: "",
    models: [],
  });

  const [modelsList, setModelsList] = useState([]);

  useEffect(() => {
    loadBrand();
    fetchModels();
  }, []);

  const loadBrand = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/brands/${id}`);
      setBrand(response.data);
      setOriginalBrand(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchModels = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/all-models`);
      const allModels = response.data;

      const selectedModelIds = brand.models.map((model) => model._id);

      // Filter all models to include both selected models and those not selected
      const updatedModelsList = allModels.map((model) => ({
        ...model,
        selected: selectedModelIds.includes(model._id),
      }));

      setModelsList(updatedModelsList);
    } catch (error) {
      console.error("Error fetching models:", error);
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
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    await axios.put(`${BASE_URL}/update-brand/${id}`, brand, {
      headers: {
        Authorization: token,
      },
    });
    console.log("Brand updated successfully!");
  };

  const clearForm = () => {
    setBrand({ ...originalBrand });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting the form...");
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

  const isAuthenticated = Auth.user;
  if (!isAuthenticated) {
    return <Message />;
  }

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
                  text={"Edit Brand"}
                  family={"open-sans"}
                  lineheight={"l24"}
                  size={"s40"}
                  weight={"bold"}
                  color={"white"}
                />
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
                <Form.Label>Models</Form.Label>
                <Form.Control
                  as="select"
                  multiple
                  name="models"
                  value={brand.models}
                  onChange={handleInputChange}
                >
                  {modelsList.map((model) => (
                    <option key={model._id} value={model._id}>
                      {model.model} {model.selected ? "(Selected)" : ""}
                    </option>
                  ))}
                </Form.Control>
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

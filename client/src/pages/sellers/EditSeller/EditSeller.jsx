import React, { useEffect, useState } from "react";
import axios from "axios";
import "./EditSeller.css";
import { useParams, useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import EditSVG from "./undraw_up_to_date_re_nqid.svg";
import Swal from "sweetalert2";
import { BsArrowLeft } from "react-icons/bs";
import Text from "../../../components/Text/Text";

const EditSeller = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seller, setSeller] = useState({
    sellerName: "",
    sellerNipt: "",
    location: "",
    models: [],
  });
  const [originalSeller, setOriginalSeller] = useState({
    sellerName: "",
    sellerNipt: "",
    location: "",
    models: [],
  });

  const [modelsList, setModelsList] = useState([]);

  useEffect(() => {
    loadSeller();
  }, []);

  const loadSeller = async () => {
    try {
      const response = await axios.get(
        `https://uthmtrqdvk.execute-api.eu-west-2.amazonaws.com/prod/api/sellers/${id}`
      );
      setSeller(response.data);
      setOriginalSeller(response.data);
    } catch (error) {
      console.log(error);
    }

    try {
      const modelsResponse = await axios.get(
        `https://uthmtrqdvk.execute-api.eu-west-2.amazonaws.com/prod/api/modelsall`
      );
      setModelsList(modelsResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "models") {
      const selectedModels = Array.from(
        e.target.selectedOptions,
        (option) => option.value
      );
      setSeller({
        ...seller,
        models: selectedModels,
      });
    } else {
      setSeller({
        ...seller,
        [name]: value,
      });
    }
  };

  const update = async () => {
    await axios.put(`https://uthmtrqdvk.execute-api.eu-west-2.amazonaws.com/prod/api/sellers/${id}`, seller);
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
      <div className=" container edit-content">
        <div className="container mt-4 ">
          <div className="row">
            <div className="col-md-6">
              <img src={EditSVG} alt="" className="img-fluid edit-img" />
            </div>
            <div className="col-md-6">
              <div className="edit-seller-head">
                <Button onClick={handleBackClick} className="back-button ">
                  <BsArrowLeft size={25} />
                </Button>
                <Text
                  text={"Edit Seller"}
                  family={"open-sans"}
                  lineheight={"l24"}
                  size={"s40"}
                  weight={"bold"}
                  color={"white"}
                />
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
                <Form.Group controlId="models">
                  <Form.Label>Models</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    name="models"
                    value={seller.models}
                    onChange={handleInputChange}
                  >
                    {modelsList.map((model) => (
                      <option key={model._id} value={model._id}>
                        {model.model}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <div className="edit-button">
                  <Button type="submit" variant="success">
                    Update
                  </Button>{" "}
                  <Link to={`/mobiles/new`}>
                    <Button variant="primary">Create New Phone</Button>
                  </Link>{" "}
                  <Button onClick={clearForm} variant="danger">
                    Reset All
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

export default EditSeller;

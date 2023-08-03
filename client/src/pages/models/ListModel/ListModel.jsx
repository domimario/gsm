import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListModel.css";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoIosAdd } from "react-icons/io";

const ListModel = (props) => {
  const [models, setModels] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchModels();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/models");
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models", error);
    }
  };

  const viewModel = (id) => {
    navigate(`/models/${id}`);
  };

  const editModel = (id) => {
    navigate(`/models/edit/${id}`);
  };

  const removeModel = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "##3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        proceedDelete(id);
      }
    });
  };

  const proceedDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/models/${id}`);
      setModels((prevModels) => prevModels.filter((model) => model._id !== id));
    } catch (error) {
      console.error("Error deleting seller", error);
    }
  };

  return (
    <>
      <div className="table-container">
        <div className="header-model">
          <h1>MODEL LIST</h1>
          <Link to={"/models/new"}>
            <Button variant="light">
              {" "}
              <IoIosAdd size={20} style={{ marginRight: "5px" }} />
              Add a new model
            </Button>{" "}
          </Link>
        </div>

        <Table responsive striped bordered hover variant="white">
          <thead>
            <tr>
              <th>#</th>
              <th>Model Name</th>
              <th>Ram</th>
              <th>Storage</th>
              <th>Colors</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {models.map((model, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{model.modelName}</td>
                <td>{model.ram}</td>
                <td>{model.memory}</td>
                <td>{model.modelColor.join(", ")}</td>
                <td>
                  {" "}
                  <Button
                    variant="info"
                    onClick={(e) => {
                      viewModel(model._id);
                    }}
                  >
                    View
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      editModel(model._id);
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      removeModel(model._id);
                    }}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};
export default ListModel;

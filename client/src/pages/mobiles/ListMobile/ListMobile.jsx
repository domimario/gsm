import React, { useState, useEffect } from "react";
import "./ListMobile.css";
import axios from "axios";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoIosAdd } from "react-icons/io";

const ListMobiles = (props) => {
  const [mobiles, setMobiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMobiles();
  }, []);

  const fetchMobiles = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/mobiles");
      setMobiles(response.data);
    } catch (error) {
      console.error("Error fetching sellers", error);
    }
  };

  const viewMobiles = (id) => {
    navigate(`/mobiles/${id}`);
  };

  const editMobiles = (id) => {
    navigate(`/mobiles/edit/${id}`);
  };

  const removeMobiles = async (id) => {
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
      await axios.delete(`http://localhost:8000/api/mobiles/${id}`);
      setMobiles((prevMobiles) =>
        prevMobiles.filter((mobile) => mobile._id !== id)
      );
    } catch (error) {
      console.error("Error deleting seller", error);
    }
  };

  return (
    <>
      <div className="table-container">
        <div className="header-seller">
          <h1>MOBILES LIST</h1>
          <Link to={"/mobiles/new"}>
            <Button variant="light">
              {" "}
              <IoIosAdd size={20} style={{ marginRight: "5px" }} />
              Add a new mobile
            </Button>{" "}
          </Link>
        </div>
        <Table responsive striped bordered hover variant="white">
          <thead>
            <tr>
              <th>#</th>
              <th>Brand Name</th>
              <th>Model Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mobiles.map((mobile, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{mobile.brandName[0].brandName}</td>
                <td>{mobile.modelName.modelName}</td>
                <td>{mobile.price}</td>
                <td>
                  {" "}
                  <Button
                    variant="info"
                    onClick={(e) => {
                      viewMobiles(mobile._id);
                    }}
                  >
                    View
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      editMobiles(mobile._id);
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      removeMobiles(mobile._id);
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
export default ListMobiles;

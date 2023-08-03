import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListBrand.css";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { IoIosAdd } from "react-icons/io";
import Swal from "sweetalert2";

const ListBrand = (props) => {
  const [brands, setBrands] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/brands");
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brandes", error);
    }
  };

  const removeBrand = async (id) => {
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
      await axios.delete(`http://localhost:8000/api/brands/${id}`);
      setBrands((prevBrands) => prevBrands.filter((brand) => brand._id !== id));
    } catch (error) {
      console.error("Error deleting brand", error);
    }
  };

  const viewBrand = (id) => {
    navigate(`/brands/${id}`);
  };

  const editBrand = (id) => {
    navigate(`/brands/edit/${id}`);
  };
  return (
    <>
      <div className="table-container">
        <div className="header-brand">
          {" "}
          <h1>BRAND LIST</h1>
          <Link to={"/brands/new"}>
            <Button variant="light">
              {" "}
              <IoIosAdd size={20} style={{ marginRight: "5px" }} />
              Add a new brand
            </Button>{" "}
          </Link>
        </div>
        <Table responsive striped bordered hover variant="white">
          <thead>
            <tr>
              <th>#</th>
              <th>Brand Name</th>
              <th>Origin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {brands.map((brand, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{brand.brandName}</td>
                <td>{brand.brandOrigin}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={(e) => {
                      viewBrand(brand._id);
                    }}
                  >
                    View
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      editBrand(brand._id);
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      removeBrand(brand._id);
                    }}
                  >
                    Remove
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default ListBrand;

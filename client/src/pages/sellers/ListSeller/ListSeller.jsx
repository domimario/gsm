import React, { useState, useEffect } from "react";
import axios from "axios";
import "./ListSeller.css";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoIosAdd } from "react-icons/io";

const ListSeller = (prop) => {
  const [sellers, setSellers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/sellers");
      setSellers(response.data);
    } catch (error) {
      console.error("Error fetching sellers", error);
    }
  };
  const ViewSeller = (id) => {
    navigate(`/sellers/${id}`);
  };

  const EditSeller = (id) => {
    navigate(`/edit/${id}`);
  };

  const DeleteSeller = async (id) => {
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
      await axios.delete(`http://localhost:8000/api/sellers/${id}`);
      setSellers((prevSellers) =>
        prevSellers.filter((seller) => seller._id !== id)
      );
    } catch (error) {
      console.error("Error deleting seller", error);
    }
  };

  return (
    <>
      <div className="table-container">
        <div className="header-seller">
          <h1>SELLER LIST</h1>
          <Link to={"/sellers/new"}>
            <Button variant="light">
              {" "}
              <IoIosAdd size={20} style={{ marginRight: "5px" }} />
              Add a new seller
            </Button>{" "}
          </Link>
        </div>
        <Table responsive striped bordered hover variant="white">
          <thead>
            <tr>
              <th>#</th>
              <th>Seller Name</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{seller.sellerName}</td>
                <td>{seller.location}</td>
                <td>
                  {" "}
                  <Button
                    variant="info"
                    onClick={(e) => {
                      ViewSeller(seller._id);
                    }}
                  >
                    View
                  </Button>{" "}
                  <Button
                    variant="secondary"
                    onClick={(e) => {
                      EditSeller(seller._id);
                    }}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={(e) => {
                      DeleteSeller(seller._id);
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
export default ListSeller;

import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./ListSeller.css";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoIosAdd } from "react-icons/io";
import Spinner from "../../../components/Spinner/Spinner";
import { Auth } from "aws-amplify";
import { BASE_URL } from "../../../api";

const ListSeller = (prop) => {
  const [loading, setLoading] = useState(true);
  const [sellers, setSellers] = useState([]);
  const [sellersPages, setSellersPages] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchSellers();
      fetchSellersPages();
    };

    fetchData();
  }, []);

  const fetchSellers = async (currentPage) => {
    setLoading(true);
    try {
      const response = await axios.get(`${BASE_URL}/all-sellers`);
      setSellers(response.data);
    } catch (error) {
      console.error("Error fetching sellers", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    fetchSellersPages(currentPage);
    const totalPages = Math.ceil(sellers.length / 5);

    if (currentPage <= totalPages) {
      fetchSellersPages(currentPage);
    } else {
      console.log("Invalid page clicked.");
    }
  };

  const fetchSellersPages = async (currentPage) => {
    try {
      const response = await axios.get(
        `https://uthmtrqdvk.execute-api.eu-west-2.amazonaws.com/prod/api/sellers?page=${currentPage}&limit=5`
      );
      setSellersPages(response.data);
    } catch (error) {
      console.error("Error fetching sellers", error);
    }
  };

  const ViewSeller = (id) => {
    navigate(`/sellers/${id}`);
  };

  const EditSeller = (id) => {
    navigate(`/sellers/edit/${id}`);
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
    const user = await Auth.currentAuthenticatedUser();
    const token = user.signInUserSession.idToken.jwtToken;
    try {
      await axios.delete(`${BASE_URL}/delete-seller/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      setSellers((prevSellers) =>
        prevSellers.filter((seller) => seller._id !== id)
      );
    } catch (error) {
      console.error("Error deleting seller", error);
    }
  };

  return (
    <>
      {loading ? ( // Conditionally render the Spinner
        <Spinner />
      ) : (
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
              {sellersPages.map((seller, index) => (
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
                        navigate(`/sellers/edit/${seller._id}`);
                        // EditSeller(seller._id);
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
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={Math.ceil(sellers.length / 5)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination justify-content-center"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item"}
            previousLinkClassName={"page-link"}
            nextClassName={"page-item"}
            nextLinkClassName={"page-link"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </div>
      )}
    </>
  );
};
export default ListSeller;

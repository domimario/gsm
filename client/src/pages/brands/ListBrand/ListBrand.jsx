import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./ListBrand.css";
import { Link, useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { IoIosAdd } from "react-icons/io";
import Swal from "sweetalert2";
import Spinner from "../../../components/Spinner/Spinner";

const ListBrand = (props) => {
  const [loading, setLoading] = useState(true);
  const [brands, setBrands] = useState([]);
  const [brandsPages, setBrandsPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchBrands();
      setLoading(true); // Show the spinner
      setTimeout(() => {
        setLoading(false); // Hide the spinner after 2 seconds
      }, 1000);
      fetchBrandsPages();
    };

    fetchData();
  }, []);

  const fetchBrands = async () => {
    try {
      const response = await axios.get(
        "https://ii8hbtn459.execute-api.eu-west-2.amazonaws.com/dev/all-brands"
      );
      setBrands(response.data);
    } catch (error) {
      console.error("Error fetching brandes", error);
    }
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    fetchBrandsPages(currentPage);
    const totalPages = Math.ceil(brands.length / 5);

    if (currentPage <= totalPages) {
      fetchBrandsPages(currentPage);
    } else {
      console.log("Invalid page clicked.");
    }
  };

  const fetchBrandsPages = async (currentPage) => {
    try {
      const response = await axios.get(
        `https://uthmtrqdvk.execute-api.eu-west-2.amazonaws.com/prod/api/brands?page=${currentPage}&limit=5`
      );
      setBrandsPages(response.data);
    } catch (error) {
      console.error("Error fetching sellers", error);
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
      await axios.delete(
        `https://ii8hbtn459.execute-api.eu-west-2.amazonaws.com/dev/delete-brand/${id}`
      );
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
      {loading ? ( // Conditionally render the Spinner
        <Spinner />
      ) : (
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
              {brandsPages.map((brand, index) => (
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
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={Math.ceil(brands.length / 5)}
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

export default ListBrand;

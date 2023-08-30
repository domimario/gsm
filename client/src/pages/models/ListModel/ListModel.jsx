import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import "./ListModel.css";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { IoIosAdd } from "react-icons/io";
import Spinner from "../../../components/Spinner/Spinner";

const ListModel = (props) => {
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState([]);
  const [modelsPages, setModelsPages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchModels();
      setLoading(true); // Show the spinner
      setTimeout(() => {
        setLoading(false); // Hide the spinner after 2 seconds
      }, 1000);
      fetchModelsPages();
    };

    fetchData();
  }, []);

  const fetchModels = async () => {
    try {
      const response = await axios.get("https://uthmtrqdvk.execute-api.eu-west-2.amazonaws.com/prod/api/modelsall");
      setModels(response.data);
    } catch (error) {
      console.error("Error fetching models", error);
    }
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    fetchModelsPages(currentPage);
    const totalPages = Math.ceil(models.length / 5);

    if (currentPage <= totalPages) {
      fetchModelsPages(currentPage);
    } else {
      console.log("Invalid page clicked.");
    }
  };

  const fetchModelsPages = async (currentPage) => {
    try {
      const response = await axios.get(
        `https://uthmtrqdvk.execute-api.eu-west-2.amazonaws.com/prod/api/models?page=${currentPage}&limit=5`
      );
      setModelsPages(response.data);
    } catch (error) {
      console.error("Error fetching sellers", error);
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
      await axios.delete(`https://uthmtrqdvk.execute-api.eu-west-2.amazonaws.com/prod/api/models/${id}`);
      setModels((prevModels) => prevModels.filter((model) => model._id !== id));
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
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {modelsPages.map((model, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{model.model}</td>

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
          <ReactPaginate
            previousLabel={"previous"}
            nextLabel={"next"}
            breakLabel={"..."}
            pageCount={Math.ceil(models.length / 5)}
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
export default ListModel;

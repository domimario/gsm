import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/esm/Table";
import Button from "react-bootstrap/esm/Button";

const ListModel = (props) => {
  const [models, setModels] = useState([]);

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

  return (
    <>
      <div>
        <h1>MODEL LIST</h1>
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
                  <Button variant="secondary">View</Button>{" "}
                  <Button variant="danger">Remove</Button>{" "}
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

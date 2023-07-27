import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const ListBrand = (props) => {
  const [brands, setBrands] = useState([]);

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
  return (
    <>
      <h1>BRAND LIST</h1>
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
                <Button variant="primary">Add</Button>{" "}
                <Button variant="secondary">View</Button>{" "}
                <Button variant="danger">Remove</Button>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ListBrand;

import React from "react";
import "./SellerBox.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import DetailsSeller from "./DetailsSeller";
import { Link } from "react-router-dom";

const SellerBox = (props) => {
  return (
    <div
      className="modal show , stilizim"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Seller Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <DetailsSeller />
        </Modal.Body>

        <Modal.Footer>
          <Link to={"/sellers"}>
            {" "}
            <Button variant="primary">Back to Seller List</Button>
          </Link>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
};

export default SellerBox;

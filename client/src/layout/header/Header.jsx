import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import GSM from "./gsmlogo.png";
import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand as={Link} to={"/"}>
            <img
              src={GSM}
              alt=""
              style={{
                maxHeight: "60px",
                maxWidth: "auto",
                marginRight: "10px",
              }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to={"/"}>
                Home
              </Nav.Link>

              <NavDropdown title="Select" id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to={"/sellers"}>
                  Sellers
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/brands"}>
                  Brands
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to={"/models"}>
                  Models
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
              <Nav.Link as={Link} to={"/about"}>
                About Us
              </Nav.Link>
              {/* <Nav.Link as={Link} to={"/contact"}>
                Contact Us
              </Nav.Link> */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

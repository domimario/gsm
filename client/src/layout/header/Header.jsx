import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import GSM from "./gsmlogo.png";
import { Link } from "react-router-dom";
import { Auth } from "aws-amplify"; // Import Auth from AWS Amplify
import { useNavigate } from "react-router-dom";

const Header = (props) => {
  const user = Auth.user; // Get the authenticated user from AWS Amplify
  const navigate = useNavigate("");
  const [authenticated, setAuthenticated] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const checkAuthenticated = async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      if (user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
      }

      const userAttributes = user.attributes || {};
      const userEmail = userAttributes.email || "";
      setEmail(userEmail);
    } catch (error) {
      setAuthenticated(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await Auth.signOut();
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };
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
            </Nav>
            {user ? (
              <Nav>
                <Nav.Link>Hello, {user.attributes.email}</Nav.Link>
                <Nav.Link onClick={handleSignOut}>
                  <i class="fa-solid fa-right-from-bracket fa-lg"></i> Sign Out
                </Nav.Link>
              </Nav>
            ) : (
              <Nav.Link as={Link} to={"/signin"}>
                <i class="fas fa-sign-in fa-lg"></i> Sing In
              </Nav.Link>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;

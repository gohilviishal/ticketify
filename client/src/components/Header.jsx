import React from "react";
import { Navbar, Container, Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <Navbar className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>tICKET.iFY</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {user && user.email ? user.email : "Signed in as"}
            {user && user.email ? (
              <Button
                className="mx-2"
                variant="light"
                size="sm"
                onClick={() => handleLogout()}
              >
                LOGOUT
              </Button>
            ) : (
              <Link to="/">
                <Button className="mx-2" variant="light" size="sm">
                  LOGIN
                </Button>
              </Link>
            )}
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

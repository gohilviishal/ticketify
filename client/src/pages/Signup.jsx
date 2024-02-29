import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:3001/api/user/signup",
        {
          email,
          password,
        }
      );
      toast.success("Sign up successfully", {
        autoClose: 2000,
        position: "bottom-center",
        theme: "dark",
      });
      login(data.email, data.token);
      navigate("/list");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        autoClose: 2000,
        position: "bottom-center",
        theme: "dark",
      });
    }
  };
  return (
    <Container className="col-md-5 p-5 mx-auto">
      <h5 className="text-center">Signup</h5>
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
        <hr />
        already have an account{" "}
        <Link to="/">
          <Button variant="light" size="sm">
            Login
          </Button>
        </Link>
      </Form>
    </Container>
  );
};

export default Signup;

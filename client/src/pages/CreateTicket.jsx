import React, { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Auth from "../components/Auth";

const CreateTicket = () => {
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:3001/api/ticket/",
        {
          title,
        },
        config
      );
      toast.success("Created successfully", {
        autoClose: 2000,
        position: "bottom-center",
        theme: "dark",
      });
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
    <Auth>
      <Container className="col-md-5 p-5 mx-auto">
        <h5 className="text-center">Create</h5>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
          <Link to="/list">
            <Button className="mx-2">Cancel</Button>
          </Link>
        </Form>
      </Container>
    </Auth>
  );
};

export default CreateTicket;

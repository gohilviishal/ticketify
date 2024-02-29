import React, { useEffect, useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import Auth from "../components/Auth";

const UpdateTicket = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { token } = useAuth();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:3001/api/ticket/${id}`,
        config
      );
      setTitle(data.title);
      setStatus(data.status);
    };
    fetchData();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.patch(
        `http://localhost:3001/api/ticket/${id}`,
        {
          title,
          status,
        },
        config
      );
      toast.success("Updated successfully", {
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
        <h5 className="text-center">Update</h5>
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="open">OPEN</option>
              <option value="inProgress">IN PROGRESS</option>
              <option value="done">DONE</option>
              <option value="closed">CLOSED</option>
            </Form.Select>
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

export default UpdateTicket;

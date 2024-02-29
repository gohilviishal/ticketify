import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Table,
  Pagination,
  PageItem,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import Auth from "../components/Auth";

const List = () => {
  const [tickets, setTickets] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  let items = [];
  for (let number = 1; number <= totalPages; number++) {
    items.push(
      <Pagination.Item
        onClick={() => setPage(number)}
        key={number}
        active={number === page}
        linkClassName="bg-dark text-white border-0 mx-1 border-radius-3"
      >
        {number}
      </Pagination.Item>
    );
  }
  const { token } = useAuth();
  useEffect(() => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:3001/api/ticket?page=${page}`,
        config
      );
      setTickets(data.tickets);
      setTotalPages(data.totalPages);
    };
    fetchData();
  }, [page]);
  return (
    <Auth>
      <Container className="p-5">
        <Link to="/create">
          <Button variant="success m-3">ADD +</Button>
        </Link>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Status</th>
              <th>#ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(({ _id, title, status }) => (
              <tr key={_id}>
                <td>{title}</td>
                <td>{status}</td>
                <td>
                  <Link to={`/update/${_id}`}>
                    <Button size="sm" variant="secondary">
                      Update
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination variant="dark" size="sm">
          {items}
        </Pagination>
      </Container>
    </Auth>
  );
};

export default List;

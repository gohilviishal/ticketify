const express = require("express");
const { create, update, getAll, getSingle } = require("../controllers/ticket");

const ticketRoute = express.Router();

ticketRoute.post("/", create);
ticketRoute.patch("/:id", update);
ticketRoute.get("/", getAll);
ticketRoute.get("/:id", getSingle);

module.exports = ticketRoute;

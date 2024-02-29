const Ticket = require("../models/ticket");
const validator = require("validator");
const getAll = async (req, res) => {
  const { page } = req.query;
  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  const endIndex = page * pageSize;
  try {
    const tickets = await Ticket.find({}).sort({ updatedAt: -1 });
    if (!tickets) {
      return res.status(400).json({ message: "Tickets not found" });
    }
    const paginated = tickets.slice(startIndex, endIndex);
    const totalPages = Math.ceil(tickets.length / pageSize);
    res.status(200).json({ tickets: paginated, totalPages });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return res.status(400).json({ message: "Tickets not found" });
    }
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const create = async (req, res) => {
  const { title } = req.body;
  try {
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    if (!validator.isLength(title, { min: 2, max: 50 })) {
      return res.status(400).json({ message: "Invalid length" });
    }
    const ticket = await Ticket.create({ title });
    res.status(200).json(ticket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const { title, status } = req.body;
  const { id } = req.params;
  const transition = {
    open: ["open", "inProgress"],
    inProgress: ["open", "inProgress", "done"],
    done: ["inProgress", "done", "closed"],
    closed: ["closed", "done"],
  };
  try {
    if (!title || !status) {
      return res.status(400).json({ message: "All fields is required" });
    }
    if (!validator.isLength(title, { min: 2, max: 50 })) {
      return res.status(400).json({ message: "Invalid length" });
    }
    const ticket = await Ticket.findById(id);
    if (!transition[ticket.status].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }
    const updatedTicket = await Ticket.findByIdAndUpdate(id, { title, status });
    res.status(200).json(updatedTicket);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getAll, getSingle, create, update };

const mongoose = require("mongoose");
const ticketSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    status: { type: String, default: "open", enum:["open","inProgress","done","closed"] },
  },
  { timestamps: true }
);

const Ticket = mongoose.model("tickets", ticketSchema);

module.exports = Ticket;

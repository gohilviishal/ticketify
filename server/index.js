const mongoose = require("mongoose");
const cors = require("cors");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const userRoute = require("./routes/auth");
const verifyToken = require("./middlewares/verifyToken");
const ticketRoute = require("./routes/ticket");

const app = express();
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/user", userRoute);
app.use("/api/ticket", verifyToken, ticketRoute);

mongoose.connect(process.env.URI).then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server is listening");
  });
});

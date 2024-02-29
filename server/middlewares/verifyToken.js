const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(400).json({ message: "Token not provided" });
  }
  jwt.verify(token.split(" ")[1], process.env.SECRET, (error, decoded) => {
    if (error) {
      res.status(400).json({ message: "Token invalid" });
    }
    req.user = decoded
    next()
  });
};

module.exports = verifyToken
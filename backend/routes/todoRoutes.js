const express = require("express");
const jwt = require("jsonwebtoken");
const {
  createInfo,
  getInfos,
  updateInfo,
  deleteInfo,
} = require("../controllers/infoController");

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token provided" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err)
      return res.status(401).json({ message: "Failed to authenticate token" });

    req.userId = decoded.userId;
    next();
  });
};

router.get("/", authenticate, getInfos);

router.post("/", authenticate, createInfo);

router.put("/:id", authenticate, updateInfo);

router.delete("/:id", authenticate, deleteInfo);

module.exports = router;

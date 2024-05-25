const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const todoRoutes = require("./routes/todoRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connection established"))
  .catch((err) => console.log("MongoDB connection error: ", err));

app.use("/todos", todoRoutes);
app.use("/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

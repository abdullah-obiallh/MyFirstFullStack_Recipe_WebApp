const express = require("express");
const dotenv = require("dotenv").config();
const connectDB = require("./config/DBConnection");
const cors = require("cors");

connectDB();
const app = express();
app.use(cors());

port = process.env.PORT || 3000;

app.use(express.json());
app.use("/recipe", require("./routes/Recipe"));
app.use("/user", require("./routes/User"));
app.use("/public", express.static("public"));
app.listen(port, () => {
  console.log("server is running On Port :", port);
});

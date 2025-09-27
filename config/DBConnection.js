const moongose = require("mongoose");
dotenv = require("dotenv").config();
const dbURL = process.env.DB_URL;

const connectDB = async () => {
  moongose
    .connect(dbURL)
    .then((c) => {
      console.log("Database connected successfully : ", c.connection.host);
    })
    .catch((err) => {
      console.log("Database connection failed : ", err);
    });
};
module.exports = connectDB;

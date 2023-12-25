const express = require("express");
const app = express();
const cookie_parser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());

const { databaseConnect } = require("./config/database.js");
databaseConnect();

const userRoutes = require("./routes/user.js");
const authRoutes = require("./routes/auth.js");
const roomRoutes = require("./routes/room.js");
const hotelRoutes = require("./routes/hotel.js");
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/room", roomRoutes);
app.use("/api/v1/hotel", hotelRoutes);

module.exports = app;

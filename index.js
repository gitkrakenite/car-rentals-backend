const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const cors = require("cors");

// local imports
const connectDB = require("./config/db");
const carRouter = require("./routes/carRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

// connection to DB
connectDB();

// routes
app.get("/", (req, res) => res.send("API working"));

// app routes
app.use("/api/v1/car", carRouter);

// listener
app.listen(PORT, () => console.log(`server running on port ${PORT}`.red));

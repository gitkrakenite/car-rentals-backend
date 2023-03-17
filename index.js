const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(express.json());
app.use(express.urlencoded());

// routes
app.get("/", (req, res) => res.send("API working"));

// listener
app.listen(PORT, () => console.log(`server running on port ${PORT}`));

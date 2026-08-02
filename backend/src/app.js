const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", routes);

// 404 Middleware
app.use(notFoundMiddleware);

// Global Error Middleware
app.use(errorMiddleware);

module.exports = app;
const express = require("express");
const cors = require("cors");

const routes = require("./routes");

const notFoundMiddleware = require("./middleware/notFoundMiddleware");
const errorMiddleware = require("./middleware/errorMiddleware");

const app = express();

// ======================================
// Allowed Origins
// ======================================

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

// ======================================
// CORS Configuration
// ======================================

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin
      // (Postman, mobile apps, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },
    credentials: true,
  })
);

// ======================================
// Body Parsers
// ======================================

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

// ======================================
// API Routes
// ======================================

app.use("/", routes);

// ======================================
// 404 Handler
// ======================================

app.use(notFoundMiddleware);

// ======================================
// Global Error Handler
// ======================================

app.use(errorMiddleware);

module.exports = app;
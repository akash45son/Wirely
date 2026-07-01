const express = require("express");
const cors = require("cors");

const app = express();
// app.use(
//   cors({
//     origin: [
//       "http://localhost:5173",
//       process.env.FRONTEND_URL,
//     ],
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow requests with no origin (Postman, curl, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());

const healthRoutes = require("./routes/v1/healthRoutes");
const userRoutes = require("./routes/v1/userRoutes");
const categoryRoutes = require("./routes/v1/categoryRoutes");
const productRoutes = require("./routes/v1/productRoutes");
const aiRoutes = require("./routes/v1/aiRoutes");

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/ai", aiRoutes);

const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

app.use(notFound);
app.use(errorHandler);

module.exports = app;
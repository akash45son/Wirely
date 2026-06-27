const express = require("express");
const cors = require("cors");

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

const healthRoutes = require("./routes/v1/healthRoutes");
const userRoutes = require("./routes/v1/userRoutes");
const categoryRoutes = require("./routes/v1/categoryRoutes");
const productRoutes = require("./routes/v1/productRoutes");

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/products", productRoutes);

const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

app.use(notFound);
app.use(errorHandler);

module.exports = app;
// server.js
const express = require("express");
const dotenv = require("dotenv");
const productRoutes = require("./src/routes/productRoutes");
const userRoutes = require("./src/routes/userRoutes");
const authMiddleware = require("./src/middlewares/authMiddleware");
const connectToDatabase = require("./src/config/database");
const rateLimit = require("express-rate-limit");
const swaggerUi = require("swagger-ui-express");
const specs = require("./src/docs/swagger");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// Rate limiting configuration
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per windowMs
});

// Apply rate limiting to all requests
app.use(limiter);

// Middleware
app.use(express.json());

// Connect to MongoDB
connectToDatabase();

// Routes
app.use("/products", authMiddleware, productRoutes);
app.use("/users", userRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

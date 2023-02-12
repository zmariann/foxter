import express from "express";

// Import cors to handle cross-origin resource sharing
import cors from "cors";

// Load environment variables from .env file
require("dotenv").config();

import { foxRouter } from "./api/foxes";
import { loggerMiddleware } from "./api/logger";

const app = express();

// Get the port number from environment variable or use 5000 as default
const PORT = process.env.PORT || 5000;

// Use cors middleware for handling cross-origin resource sharing
app.use(cors());

// Use json middleware for parsing incoming request bodies as JSON
app.use(express.json());

app.use(loggerMiddleware);

app.use("/api", [foxRouter]);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

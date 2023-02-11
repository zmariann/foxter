// Import express framework
import express from "express";

// Import cors to handle cross-origin resource sharing
import cors from "cors";

// Load environment variables from .env file
require("dotenv").config();

// Import foxRouter and loggerMiddleware from the api directory
import { foxRouter } from "./api/foxes";
import { loggerMiddleware } from "./api/logger";

// Create an express application
const app = express();

// Get the port number from environment variable or use 5000 as default
const PORT = process.env.PORT || 5000;

// Use cors middleware for handling cross-origin resource sharing
app.use(cors());

// Use json middleware for parsing incoming request bodies as JSON
app.use(express.json());

// Use loggerMiddleware to log request and response data
app.use(loggerMiddleware);

// Use foxRouter for handling fox-related requests/ / Mount the foxes router on the /api endpoint
app.use("/api", [foxRouter]);

// start the server and Listen for incoming connections on the specified port
app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

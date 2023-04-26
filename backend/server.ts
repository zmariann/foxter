import express from "express";
// Import cors to handle cross-origin resource sharing
import cors from "cors";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
require("dotenv").config();

import { foxRouter } from "./api/foxes";
import { loggerMiddleware } from "./api/logger";
import { authRouter } from "./api/auth";
// import { authMiddleware } from "./api/authMiddleware";
// import { validateBody } from "./api/validation";
import { userRouter } from "./api/users";
import { messagesRouter } from "./api/messages";
import { followRouter } from "./api/following"
import { hTagRouter } from "./api/hashtag";
import { likesRouter } from "./api/likes";
import { profileRouter } from "./api/profile";

const app = express();

// Get the port number from environment variable or use 5000 as default
const PORT = process.env.PORT || 5000;

// Use cors middleware for handling cross-origin resource sharing
app.use(cors());

// Use json middleware for parsing incoming request bodies as JSON
app.use(express.json());
app.use(cookieParser());
app.use(loggerMiddleware);
app.use("/api", [foxRouter, authRouter, userRouter, messagesRouter, followRouter, hTagRouter, likesRouter, profileRouter]);

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

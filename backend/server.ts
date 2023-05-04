// Load environment variables from .env file
require("dotenv").config();

import { app } from "./app";

// Get the port number from environment variable or use 5000 as default
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
});

module.exports = app;
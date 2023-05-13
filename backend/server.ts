// Load environment variables from .env file
require("dotenv").config();

import { app } from "./app";

// Get the port number from environment variable or use 5000 as default
const PORT = process.env.PORT || 5000;

if (process.env.JWT_SECRET == undefined) {
  console.error("You need to set the JWT_SECRET env variable");
  process.exit(1);
}

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);

});

module.exports = app;


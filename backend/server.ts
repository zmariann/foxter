// Load environment variables from .env file
require("dotenv").config();

import { app } from "./app";

// Get the port number from environment variable or use 5000 as default
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening at port ${PORT}`);
<<<<<<< HEAD
});

module.exports = app;
=======
});
>>>>>>> 814761cf21107fb17f80eda75e67a0d8c2fff8be

import express from "express";
import { db } from "../database/db";

const foxRouter = express.Router();

// Retrieve all foxes from the database and send as a response
foxRouter.get("/foxes", (req, res) => {
  // Fetch data from the foxes table, ordered by the newest entries first
  const data = db.prepare("SELECT * FROM foxes ORDER BY id DESC").all();
  // Return the data as the response
  res.send(data);
});

// Add a new fox to the database
foxRouter.post("/foxes", (req, res) => {
    try {
      // Extract the content from the request body
      const { content } = req.body;
    
      // Return an error if the content is missing
      if (!content) {
        return res.status(400).send({ error: "Content is required." });
      }
    
      // Prepare an INSERT statement to add the fox to the database
      const stmt = db.prepare("INSERT INTO foxes (content) VALUES (?)");
    
      // Run the statement
      stmt.run(content);
    
      // Return a success message
      res.status(201).send({ message: "Fox created successfully!" });
    } catch (error) {
      // Return the error message if an error occurs
      res.status(400).send({ error: error.message });
    }  
});
  
// Delete a fox from the database
foxRouter.delete('/foxes/:id', async (req, res) => {
  try {
    // Prepare a DELETE statement to remove the fox with the specified id
    db.prepare("DELETE FROM foxes WHERE id = ?").run(req.params.id);
    // Return a success message
    res.status(200).send('Entry deleted');
  } catch (error) {
    // Return the error message if an error occurs
    res.send(error.message);
  }
})

// Export the router for use in other parts of the application
export { foxRouter }
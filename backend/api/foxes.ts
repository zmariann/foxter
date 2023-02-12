import express from "express";
import { db } from "../database/db";

const foxRouter = express.Router();

// get all foxes
foxRouter.get("/foxes", (req, res) => {
  const data = db.prepare("SELECT * FROM foxes ORDER BY id DESC").all();
  res.send(data);
});

// Create a fox
foxRouter.post("/foxes", (req, res) => {
    try {
      const { content } = req.body;
    
      if (!content) {
        return res.status(400).send({ error: "Content is required." });
      }
    
      const stmt = db.prepare("INSERT INTO foxes (content) VALUES (?)");
    
      stmt.run(content);
    
      res.status(201).send({ message: "Fox created successfully!" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }  
});
  
// delete foxes by id
foxRouter.delete('/foxes/:id', async (req, res) => {
  try {
    db.prepare("DELETE FROM foxes WHERE id = ?").run(req.params.id);
    res.status(200).send('Entry deleted');
  } catch (error) {
    res.send(error.message);
  }
})

export { foxRouter }
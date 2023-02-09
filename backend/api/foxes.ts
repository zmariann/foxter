import express from "express";
import { db } from "../database/db";
import { loggerApp } from "./logger";

const foxRouter = express.Router();

foxRouter.use(loggerApp)

// get all foxes
foxRouter.get("/foxes", (req, res) => {
  const data = db.prepare("SELECT * FROM foxes ORDER BY id DESC").all();
  res.send(data);
});

// Create a fox
foxRouter.post("/foxes", (req, res) => {
    try {
    const { data } = req.body;
    if (!data) {
    return res.status(400).send({ error: "Content is required." });
    }
    const stmt = db.prepare("INSERT INTO foxes (content) VALUES (?)");
    stmt.run(data);
    res.status(201).send({ message: "Fox created successfully!" });
    } catch (error) {
    res.status(400).send({ error: error.message });
    }
    });
  
// delete foxes by id

foxRouter.delete('/foxes/:id', async (req, res) => {
  try {
    //const entry = await deleteFox(req.params.id);
    /* if (!entry) {
      return res.status(403).send('No entry was fount with this ID')
    } */
    res.status(200).send('Entry deleted');
  } catch (error) {
    res.send(error.message);
  }
})

export { foxRouter }
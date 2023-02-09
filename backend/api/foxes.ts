import express from "express";
import { db } from "../database/db";
import { loggerApp } from "./logger";

const foxRouter = express.Router();

foxRouter.use(loggerApp)

// get all foxes
foxRouter.get("/foxes", (req, res) => {
  const data = db.prepare("SELECT * FROM foxes").all();
  res.send(data);
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
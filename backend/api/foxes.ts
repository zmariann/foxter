import express from "express";
import { db } from "../database/db";

const foxRouter = express.Router();

// get all foxes
foxRouter.get("/foxes", (req, res) => {
  const data = db.prepare("SELECT * FROM fox").all();
  res.send(data);
});

export = foxRouter;
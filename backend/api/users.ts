import express from 'express'
import { db } from '../database/db'

const userRouter = express.Router()

userRouter.get("/users", (req, res) => {
    const data = db.prepare("SELECT * FROM users ORDER BY id DESC").all();
    res.send(data);
  });

export { userRouter }
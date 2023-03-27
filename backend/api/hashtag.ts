import express, { Request, Response, Router } from "express";
import { db } from "../database/db";

const hTagRouter: Router = express.Router();

hTagRouter.get("/htsearch", (req: Request, res: Response) => {
  const hashtag = req.query.hashtag as string;
  const result = db
    .prepare(
      `SELECT fox.*
      FROM foxes AS fox
      LEFT JOIN hashtags AS tag ON tag.fox_id = fox.id
      WHERE tag.tag LIKE ?
      ORDER BY fox.created_at as createdAt DESC
      `
    )
    .all(hashtag);
    console.log(result)
  res.json(result);
});

export { hTagRouter };

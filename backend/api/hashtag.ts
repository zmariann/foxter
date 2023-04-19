import express, { Request, Response, Router } from "express";
import { db } from "../database/db";

const hTagRouter: Router = express.Router();

hTagRouter.get("/htsearch", (req: Request, res: Response) => {
  const hashtag = req.query.hashtag as string;

  const data = db
    .prepare(
      `SELECT f.id, u.name AS userName, f.content, f.created_at as createdAt, f.user_id as userId, COUNT(l.id) AS likes, t.id
      FROM foxes f 
      LEFT JOIN users u ON f.user_id = u.id
      LEFT JOIN hashtags t ON t.fox_id = f.id
      LEFT JOIN fox_likes l ON f.id = l.fox_id 
      WHERE t.tag LIKE ?
      GROUP BY(f.id)
      ORDER BY f.created_at DESC;`
    )
    .all(hashtag);

  res.json(data);
});

export { hTagRouter };

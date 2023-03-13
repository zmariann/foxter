import express, { Request, Response, Router } from "express";
import { db } from "../database/db";

const likesRouter: Router = express.Router();

likesRouter.post("/fox_likes/:fox_id", async (req, res) => {
  const { user_id } = req.body;
  const { fox_id } = req.params;

  console.log(user_id, fox_id);

  try {
    // Insert the like into the database
    const result = await db
      .prepare("INSERT INTO fox_likes (fox_id, user_id) VALUES (?, ?)")
      .run(fox_id, user_id);
    const count = await countLikes(fox_id);
    console.log(count);
    // Return the updated like count to the client
    res.json({ status: true, count: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Server error" });
  }
});

likesRouter.delete("/fox_likes/:fox_id", async (req, res) => {
  const { user_id } = req.body;
  const { fox_id } = req.params;
  try {
    // Delete the like from the fox_likes table
    db.prepare(`DELETE FROM fox_likes WHERE user_id = ? AND fox_id = ?`).run(
      user_id,
      fox_id
    );

    const count = await countLikes(fox_id);
    // Return the updated like count to the client
    res.json({ status: true, count: count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: false, error: "Server error" });
  }
});

const countLikes = async (fox_id) => {
  // Get the total number of likes for the fox
  const countResult = await db
    .prepare("SELECT COUNT(*) AS count FROM fox_likes WHERE fox_id = ?")
    .get(fox_id);
  const count = countResult.count;
  return count;
};

export { likesRouter };

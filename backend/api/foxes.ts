import express from "express";
import { db } from "../database/db";
import { verifyUser } from "./auth";
import { z } from "zod";
import { validateBody } from "./validation";

const foxRouter = express.Router();

foxRouter.get("/foxes", (req, res) => {
  const data = db
    .prepare(
      `SELECT f.id, u.name AS userName, f.content, f.created_at as createdAt, f.user_id as userId, COUNT(l.id) AS likes
      FROM foxes f 
      LEFT JOIN users u ON f.user_id = u.id
      LEFT JOIN fox_likes l ON f.id = l.fox_id GROUP BY(f.id)
      ORDER BY f.created_at DESC;`
    )
    .all();
  res.send(data);
});

const foxesBodySchema = z.object({
  content: z.string().min(1),
});

// create a fox
foxRouter.post("/foxes", validateBody(foxesBodySchema), (req, res) => {
  try {
    const { content } = req.body;

    // Verify the user token
    const user = verifyUser(req);
    if (user === null) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    const hashtagUnfiltered = content.match(/#[a-zA-Z0-9]+/g); // Find all hashtags in the content
    const hashtags: Array<string> = Array.from(new Set(hashtagUnfiltered));

    const foxStmt = db
      .prepare("INSERT INTO foxes (content, user_id) VALUES (?,?)")
      .run(content, user.id);
    const foxId = foxStmt.lastInsertRowid;
    const hashtagsLength = hashtags.length > 10 ? 10 : hashtags.length;

    if (hashtagsLength > 0) {
      const insertStmt = db.prepare(
        "INSERT INTO hashtags (tag, fox_id) VALUES (?, ?)"
      );
      for (
        let hashtagCount = 0;
        hashtagCount < hashtagsLength;
        hashtagCount++
      ) {
        console.log(hashtags[hashtagCount]);
        let hashTag = hashtags[hashtagCount].replace("#", "");
        insertStmt.run(hashTag, foxId);
      }
    }

    res.status(201).send({ message: "Fox created successfully!" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// Delete a fox
foxRouter.delete("/foxes/:id", async (req, res) => {
  try {
    const foxId: number = parseInt(req.params.id);
    const user = verifyUser(req);
    if (user === null) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    const data = db
      .prepare("SELECT * FROM foxes WHERE id=? AND  user_id= ?")
      .all(foxId, user.id);
    if (data.length == 1) {
      // Prepare a DELETE statement to remove the fox with the specified id
      db.prepare("DELETE FROM hashtags WHERE fox_id = ?").run(foxId);
      db.prepare("DELETE FROM fox_likes WHERE fox_id = ?").run(foxId);
      db.prepare("DELETE FROM foxes WHERE id = ?").run(foxId);
      res.status(200).send({ message: "Entry deleted" });
    } else {
      res.status(400).send({ message: "Cannot delete fox" });
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Export the router for use in other parts of the application
export { foxRouter };

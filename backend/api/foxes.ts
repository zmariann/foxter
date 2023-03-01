import express from "express";
import { db } from "../database/db";
import { verifyUser } from "./auth";
import { z } from "zod";
import { validateBody } from "./validation";

const foxRouter = express.Router();

foxRouter.get("/foxes", (req, res) => {
  const data = db.prepare("SELECT * FROM foxes ORDER BY created_at DESC").all();
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
    const hashtags: Set<string> = new Set(hashtagUnfiltered);
   
    const foxStmt = db
      .prepare("INSERT INTO foxes (content, user_id) VALUES (?,?)")
      .run(content, user.id);
    const foxId = foxStmt.lastInsertRowid;

    const maxHashtags = Math.min(hashtags.size, 10);
    if (maxHashtags > 0) {
      let i = 0;
      const insertStmt = db.prepare(
        "INSERT INTO hashtags (tag, fox_id) VALUES (?, ?)"
      );
      for (let hashTag of hashtags) {
        if (i >= maxHashtags) {
          break
        }
      
        hashTag = hashTag.replace("#", "")
        insertStmt.run(hashTag, foxId)
        i++;
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
    // Prepare a DELETE statement to remove the fox with the specified id
    db.prepare("DELETE FROM foxes WHERE id = ?").run(req.params.id);
    res.status(200).send("Entry deleted");
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Export the router for use in other parts of the application
export { foxRouter };

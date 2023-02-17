import express from "express";
import { db } from "../database/db";
import { verifyUser } from "./auth";

const foxRouter = express.Router();

foxRouter.get("/foxes", (req, res) => {
  const data = db.prepare("SELECT * FROM foxes ORDER BY id DESC").all();
  res.send(data);
});

// create a fox
foxRouter.post("/foxes", (req, res) => {
  try {
    const { content } = req.body;

    // Return an error if the content is missing
    if (!content) {
      return res.status(400).send({ error: "Content is required." });
    }

    const token = req.cookies.token;

    // Verify the user token
    const user = verifyUser(token);

    if (!user) {
      return res.status(401).send({ error: "Unauthorized." });
    }

    const stmt = db.prepare("INSERT INTO foxes (content) VALUES (?)");

    stmt.run(content);

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
    res.send(error.message);
  }
});

// Export the router for use in other parts of the application
export { foxRouter };

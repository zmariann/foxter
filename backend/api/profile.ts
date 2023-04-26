// api/users.ts
import express from "express";
import { db } from "../database/db";

const profileRouter = express.Router();

profileRouter.get("/profile/:username", (req, res) => {
    const { username } = req.params;

    // Fetch user information
    const user = db.prepare("SELECT * FROM users WHERE name = ?").get(username);

    if (!user) {
        return res.status(404).send({ error: "User not found" });
    }

    // Fetch user tweets (foxes)
    const foxes = db
        .prepare(`SELECT f.id, u.name AS userName, f.content, f.created_at as createdAt, f.user_id as userId, COUNT(l.id) AS likes
    FROM foxes f 
    LEFT JOIN users u ON f.user_id = u.id
    LEFT JOIN fox_likes l ON f.id = l.fox_id
    WHERE f.user_id = ?
    GROUP BY(f.id)
    ORDER BY f.created_at DESC;`
        )
        .all(user.id);

    res.send({ user, foxes });
});

export { profileRouter };

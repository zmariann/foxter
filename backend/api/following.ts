import express from "express";
import { db } from "../database/db";
import { z } from "zod";
import { verifyUser } from "./auth";
import { validateBody } from "./validation";

const followRouter = express.Router();
const followBodySchema = z.object({

    followedId: z.number(),
});



followRouter.post("/following", validateBody(followBodySchema), async (req, res) => {
    console.log("following fired")
    try {
        const user = verifyUser(req)
        if (user == null) {
            return res.status(401).send({ error: "Unauthorized!" })
        }

        const followedId = req.body.followedId;
        if (followedId == user.id) {
            return res.status(401).send({ error: 'Cannot follow yourself!' })
        }

        // Check if both users exist in the database
        const usersExistQuery = `
    SELECT COUNT(*) as count
    FROM users
    WHERE id IN (?, ?)
  `

        const row = db.prepare(usersExistQuery).get(user.id, followedId)

        if (row.count !== 2) {
            return res.status(404).send({ error: 'User not found' });
        }

        const followQuery = `
        INSERT INTO followers (follower, followed)
        VALUES (?, ?)
    `

        db.prepare(followQuery).run(user.id, followedId)

        res.send({ message: "User followed successfully" })
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Server error' });
    }
});

export { followRouter };
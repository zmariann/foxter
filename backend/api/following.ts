import express from "express";
import { db } from "../database/db";
import { z } from "zod";
import { verifyUser } from "./auth";
import { validateBody } from "./validation";

const followRouter = express.Router();
const followBodySchema = z.object({
    follower: z.number(),
    followed: z.number()
});

followRouter.post("/profile", validateBody(followBodySchema), (req, res) => {
    const follower = req.body.follower;
    const followed = req.body.followed;
    console.log(followBodySchema)
    // Check if both users exist in the database
    const usersExistQuery = `
    SELECT COUNT(*) as count
    FROM users
    WHERE id IN (?, ?)
  `;

    db.get(usersExistQuery, [follower, followed], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else if (row.count !== 2) {
            res.status(404).send('User not found');
        } else {
            // Follow the user by inserting a row into the following table
            const followQuery = `
        INSERT INTO followers (follower, followed)
        VALUES (?, ?)`
                ;

            db.run(followQuery, [follower, followed], (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Server error');
                } else {
                    res.send('User followed successfully');
                }
            });
        }
    });
});

export { followRouter };

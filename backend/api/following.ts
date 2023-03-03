import express from "express";
import { db } from "../database/db";

const followRouter = express.Router();


async function followUser(req: Request, res: Response) {
    const userId = req.body.user_Id;
    const followingId = req.body.follow_user_id;

    // Check if both users exist in the database
    const usersExistQuery = `
    SELECT COUNT(*) as count
    FROM users
    WHERE id IN (?, ?)
  `;

    db.get(usersExistQuery, [userId, followingId], (err, row) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server error');
        } else if (row.count !== 2) {
            res.status(404).send('User not found');
        } else {
            // Follow the user by inserting a row into the following table
            const followQuery = `
        INSERT INTO following (user_id, following_user_id)
        VALUES (?, ?)`
                ;

            db.run(followQuery, [userId, followingId], (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Server error');
                } else {
                    res.send('User followed successfully');
                }
            });
        }
    });
}
export { followRouter };

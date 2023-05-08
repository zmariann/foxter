import express from "express";
import { db } from "../database/db";
import { z } from "zod";
import { verifyUser } from "./auth";
import { validateBody } from "./validation";

const followRouter = express.Router();
const followBodySchema = z.object({
  followedId: z.number(),
});

// Follow user route
followRouter.post("/following/:id", async (req, res) => {
  try {
    const user = verifyUser(req);
    if (user == null) {
      return res.status(401).send({ error: "Unauthorized!" });
    }

    const followedId = parseInt(req.params.id);

    if (followedId == user.id) {
      return res.status(400).send({ error: "User cannot follow self" })
    }

    const stat = await checkFollowingStatus(user.id, followedId)

    if (stat) {
      //unfollow > delete the record from DB
      db.prepare("DELETE FROM followers WHERE follower = ? AND followed = ?").run(user.id, followedId)
    } else {
      //follow > insert record into db
      db.prepare("INSERT INTO followers VALUES(NULL, ?, ?)").run(user.id, followedId)
    }

    res.send({ status: !stat })
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }
});

followRouter.get('/following/:id', async (req, res) => {

  try {
    const user = verifyUser(req);
    if (user == null) {
      return res.status(401).send({ error: "Unauthorized!" });
    }

    // followed -> external user passed through param :id
    // follower -> signed in user / current auth user
    const followedId = parseInt(req.params.id);
    const stat = await checkFollowingStatus(user.id, followedId)
    if (stat) {
      res.send({ status: true })
    } else {
      res.send({ status: false })
    }

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Server error" });
  }

})

const checkFollowingStatus = async (followerId: number, followedId: number) => {
  const count = db.prepare("SELECT * FROM followers WHERE follower = ? AND followed = ?").all(followerId, followedId)
  if (count.length == 0) {
    return false;
  } else {
    return true;
  }
}

export { followRouter };

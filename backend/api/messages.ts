import express from "express";
import { db } from "../database/db";

const messagesRouter = express.Router();

// create a new message
messagesRouter.post("/messages/:roomId", (req, res) => {
  try {
    const content = req.body;
    const roomId = req.params.roomId;
    // const userId =
    // how we get the userId?
    db.prepare(
      "INSERT INTO messages (content, room_id, user_id) VALUES (?,?,?)"
    ).run(content, roomId, userId);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// reach all messages in the specific room
messagesRouter.get("/messages/:roomId", (req, res) => {
  try {
    const roomId = req.params.roomId;
    const messages = db
      .prepare(
        "SELECT content FROM messages WHERE room_id = ? ORDER BY id DESC"
      )
      .all(roomId);
    res.send(messages);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// delete a message
messagesRouter.delete("/messages/:id", async (req, res) => {
  try {
    const id = req.params.id;
    db.prepare("DELETE FROM messages WHERE id = ?").run(id);
    res.status(200).send("Message is successfully deleted.");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// create a new room
messagesRouter.post("/rooms", (req, res) => {
  try {
    const roomsGroup = req.body;
    const creatorId = req.body;
    // where we get the creator id, creator is the person who logged in
    db.prepare("INSERT INTO rooms (rooms_group, creator_id) VALUES (?,?)").run(
      roomsGroup,
      creatorId
    );
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// show every room for a specific user
// in other words the person who logged in
// can see every room where he/she is in
messagesRouter.get("/rooms/:id", (req, res) => {
  try {
    const creatorId = req.params.id;
    const rooms = db
      .prepare(
        "SELECT rooms_group FROM rooms WHERE creator_id = ? ORDER BY id DESC"
      )
      .all(creatorId);
    res.send(rooms);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// room participants




// room invitations





export { messagesRouter };

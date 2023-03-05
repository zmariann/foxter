import express from "express";
import { db } from "../database/db";
import { verifyUser } from "./auth";

const messagesRouter = express.Router();

// ---- MESSAGES
// create a new message
messagesRouter.post("/messages/:roomId", (req, res) => {
  try {
    const { content } = req.body;
    const { roomId } = req.params;
    const user = verifyUser(req);
    if (user === null) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    const message = db
      .prepare(
        "INSERT INTO messages (content, room_id, user_id) VALUES (?,?,?)"
      )
      .run(content, roomId, user.id);
    res.send({ message: "New message has successfully created" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// reach all messages in the specific room
messagesRouter.get("/messages/:roomId", (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = db
      .prepare(
        "SELECT id, content FROM messages WHERE room_id = ? ORDER BY id DESC"
      )
      .all(roomId);
    res.send(messages);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// delete a message
messagesRouter.delete("/messages/:messageId", async (req, res) => {
  try {
    const { messageId } = req.params;
    const user = verifyUser(req);
    if (user === null) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    const result = db
      .prepare("DELETE FROM messages WHERE id = ? AND user_id = ?")
      .run(messageId, user.id);
    if (result.changes === 0) {
      return res
        .status(400)
        .send({ error: "You can delete a message if you are the creator" });
    }
    res.status(200).send("Message is successfully deleted.");
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ---- ROOMS
// create a new room
messagesRouter.post("/rooms", (req, res) => {
  try {
    const { name, group } = req.body;
    // get the user id of the person who logged in
    const user = verifyUser(req);
    if (user === null) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    // check if this name in rooms database is exists
    const result = db.prepare("SELECT * FROM rooms WHERE name = ?").get(name);
    if (result !== undefined) {
      return res.status(400).send({ error: "This room has already exists" });
    }
    db.prepare(
      "INSERT INTO rooms (name, rooms_group, creator_id) VALUES (?,?,?)"
    ).run(name, group, user.id);
    res.send({ message: "New room has successfuly created" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// show rooms
messagesRouter.get("/rooms", (req, res) => {
  try {
    // get the user id of the person who logged in
    const user = verifyUser(req);
    if (user === null) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    const rooms = db
      .prepare(
        "SELECT name, id FROM rooms WHERE creator_id = ? ORDER BY id DESC"
      )
      .all(user.id);
    res.send(rooms);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// delete a room
messagesRouter.delete("/rooms/:roomId", async (req, res) => {
  try {
    const { roomId } = req.params;
    // get the user id of the person who logged in
    const user = verifyUser(req);
    if (user === null) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    // check if logged in person is the room creator or not
    const result = db
      .prepare("SELECT * FROM rooms WHERE id = ? AND creator_id = ?")
      .all(roomId, user.id);
    console.log(result);
    // if she/he it is then delete everything that related to the deleted room
    if (result[0].creator_id === user.id) {
      db.prepare("DELETE FROM messages WHERE room_id = ?").run(roomId);
      db.prepare("DELETE FROM room_participants WHERE room_id = ?").run(roomId);
      db.prepare("DELETE FROM room_invitations WHERE room_id = ?").run(roomId);
      db.prepare("DELETE FROM rooms WHERE id = ?").run(roomId);
      return res.status(200).send("Room is successfully deleted.");
    }
    // otherwise send an error
    return res
      .status(400)
      .send({ error: "You can delete a room if you are the creator" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ---- INVITATIONS
// room invitations
messagesRouter.post("/invitation/:roomId", (req, res) => {
  try {
    // who will be invited
    const { invitedUserId } = req.body;
    // the number of the room where the invitation is addressed
    const { roomId } = req.params;
    // user who logged in
    const user = verifyUser(req);
    if (user === null) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    db.prepare(
      "INSERT INTO room_invitations (host_id, invited_id, room_id) VALUES (?,?,?)"
    ).run(user.id, invitedUserId, roomId);
    res.send({ message: "New invitation has successfuly created" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// we need all the users where we can choose the person who we want to invite
// in users.ts

// user can check his/her invitations from others
messagesRouter.get("/invitations", (req, res) => {
  try {
    // get the user id of the person who logged in
    const user = verifyUser(req);
    if (user === null) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    // get the room names
    const namesOfRooms = db
      .prepare(
        "SELECT rooms.name FROM rooms INNER JOIN room_invitations ON rooms.id = room_invitations.room_id WHERE invited_id = ? ORDER BY room_invitations.id DESC"
      )
      .all(user.id);
    res.send(namesOfRooms);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// check all invitations for test purposes
messagesRouter.get("/invitations/all", (req, res) => {
  try {
    // get the user id of the person who logged in
    const user = verifyUser(req);
    if (user === null) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    const invitations = db
      .prepare(
        "SELECT * FROM room_invitations WHERE invited_id = ? ORDER BY id DESC"
      )
      .all(user.id);
    res.send(invitations);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// user who got the invitation can delete it
messagesRouter.delete("/invitations/:invitationId", (req, res) => {
  try {
    const { invitationId } = req.params;
    // get the user id of the person who logged in
    const user = verifyUser(req);
    if (user === null) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    db.prepare("DELETE FROM room_invitations WHERE id = ?").run(invitationId);
    res.send({ message: "Invitation is successfully deleted" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export { messagesRouter };

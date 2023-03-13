import express from "express";
import { db } from "../database/db";
import { verifyUser } from "./auth";
import { z } from "zod";
import { validateBody } from "./validation";

const messagesRouter = express.Router();

// ---- MESSAGES
// create a new message
const messageContentBodySchema = z.object({
  content: z.string(),
});
messagesRouter.post(
  "/messages/:roomId",
  validateBody(messageContentBodySchema),
  (req, res) => {
    try {
      const { content } = req.body;
      const { roomId } = req.params;
      // get the user id of the person who logged in
      const user = verifyUser(req);
      if (user === null) {
        return res.status(401).send({ error: "Unauthorized." });
      }
      const message = db
        .prepare(
          "INSERT INTO messages (content, room_id, user_id) VALUES (?,?,?)"
        )
        .run(content, roomId, user.id);
      res.status(200).send({ message: "New message has successfully created" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

/*
// reach all messages in the specific room
messagesRouter.get("/messages/:roomId", (req, res) => {
  try {
    const { roomId } = req.params;
    const messages = db
      .prepare(
        "SELECT id, content FROM messages WHERE room_id = ? ORDER BY id DESC"
      )
      .all(roomId);
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});
*/

// delete a message
messagesRouter.delete("/messages/:messageId", (req, res) => {
  try {
    const { messageId } = req.params;
    // get the user id of the person who logged in
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
    res.status(200).send({ message: "Message is successfully deleted." });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ---- ROOMS
// create a new room
const roomsBodySchema = z.object({
  name: z.string(),
  group: z.number(),
});
messagesRouter.post("/rooms", validateBody(roomsBodySchema), (req, res) => {
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
    // insert new room into rooms table
    const roomId = db
      .prepare(
        "INSERT INTO rooms (name, rooms_group, creator_id) VALUES (?,?,?)"
      )
      .run(name, group, user.id);
    // insert new room into participants table
    db.prepare(
      "INSERT INTO room_participants (room_id, user_id) VALUES (?,?)"
    ).run(roomId.lastInsertRowid, user.id);
    res.status(200).send({ message: "New room has successfuly created" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// get a room
messagesRouter.get("/rooms/:roomId", (req, res) => {
  try {
    const { roomId } = req.params;
    // get the user id of the person who logged in
    const user = verifyUser(req);
    if (user === null) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    console.log(user.id);
    // check if he is a participant of the room (if he is the crator of the room he is automatically in the room_participants table)
    const participantOfThisRoom = db
      .prepare(
        "SELECT * FROM room_participants WHERE room_id = ? AND user_id = ?"
      )
      .get(roomId, user.id);
    console.log(participantOfThisRoom);
    // user can access the room, so he can see the messages
    if (participantOfThisRoom === undefined) {
      return res.status(403).send({
        error: "You can only access to this room if you are a participant",
      });
    }
    const messages = db
      .prepare(
        "SELECT id, content FROM messages WHERE room_id = ? ORDER BY id DESC"
      )
      .all(roomId);
    res.status(200).send(messages);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// get the name of the room
messagesRouter.get("/rooms/name/:roomId", (req, res) => {
  try {
    const { roomId } = req.params;
    const roomName = db
      .prepare("SELECT name FROM rooms WHERE id = ?")
      .get(roomId);
    res.status(200).send(roomName);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// show rooms, what the user created & where he/she is invited
messagesRouter.get("/rooms", (req, res) => {
  try {
    // get the user id of the person who logged in
    const user = verifyUser(req);
    if (user === null) {
      return res.status(401).send({ error: "Unauthorized." });
    }
    const rooms = db
      .prepare(
        "SELECT DISTINCT rooms.name, rooms.id FROM rooms INNER JOIN room_participants ON rooms.id = room_participants.room_id WHERE rooms.creator_id = ? OR room_participants.user_id = ? ORDER BY rooms.name ASC"
      )
      .all(user.id, user.id);
    res.status(200).send(rooms);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// delete a room
messagesRouter.delete("/rooms/:roomId", (req, res) => {
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
      .get(roomId, user.id);
    // if she/he it is then delete everything that related to the deleted room
    if (result !== undefined) {
      db.prepare("DELETE FROM messages WHERE room_id = ?").run(roomId);
      db.prepare("DELETE FROM room_participants WHERE room_id = ?").run(roomId);
      db.prepare("DELETE FROM room_invitations WHERE room_id = ?").run(roomId);
      db.prepare("DELETE FROM rooms WHERE id = ?").run(roomId);
      return res.status(200).send("Room is successfully deleted.");
    }
    // otherwise send an error
    res
      .status(403)
      .send({ error: "You can delete a room if you are the creator" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// ---- INVITATIONS
// room invitations for chats
const invitationsBodySchema = z.object({
  invitedUserId: z.number(),
  roomId: z.number(),
});
messagesRouter.post(
  "/invitations/group/",
  validateBody(invitationsBodySchema),
  (req, res) => {
    try {
      // the id who will get the invitation &
      // the number of the room where the invitation is addressed
      const { invitedUserId, roomId } = req.body;

      // user who logged in
      const user = verifyUser(req);
      if (user === null) {
        return res.status(401).send({ error: "Unauthorized." });
      }

      // check if the user who would like to send an invitation is the creator of the room
      const creator = db
        .prepare("SELECT creator_id FROM rooms WHERE id = ?")
        .get(roomId);
      if (creator === undefined) {
        return res.status(403).send({
          error:
            "You can send an invitation if you are the creator of the a room",
        });
      }
      // if he has already the part of the room he can't get an invitation
      const invited = db
        .prepare(
          "SELECT * FROM room_participants WHERE room_id = ? AND user_id = ?"
        )
        .get(roomId, invitedUserId);
      if (invited !== undefined) {
        return res.status(400).send({
          error: "This user has already part of the room",
        });
      }
      // check if this invitation is exists
      const existingInvitation = db
        .prepare(
          "SELECT id FROM room_invitations WHERE host_id = ? AND invited_id = ? AND room_id = ?"
        )
        .get(user.id, invitedUserId, roomId);
      if (existingInvitation !== undefined) {
        return res
          .status(400)
          .send({ message: "This invitation has already exist" });
      }
      db.prepare(
        "INSERT INTO room_invitations (host_id, invited_id, room_id) VALUES (?,?,?)"
      ).run(user.id, invitedUserId, roomId);
      return res
        .status(200)
        .send({ message: "New invitation has successfuly created" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

// user can check his/her invitations what he got
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
    res.status(200).send(namesOfRooms);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// user accepts the invitation
messagesRouter.post(
  "/invitations/accept/:invitationId",
  validateBody(invitationsBodySchema),
  (req, res) => {
    try {
      const { invitedUserId, roomId } = req.body;
      const { invitationId } = req.params;
      // if the user is the part of the room he can't accept again
      const invited = db
        .prepare(
          "SELECT * FROM room_participants WHERE room_id = ? AND user_id = ?"
        )
        .get(roomId, invitedUserId);
      if (invited !== undefined) {
        return res.status(400).send({
          error: "This user has already part of the room",
        });
      }
      db.prepare(
        "INSERT INTO room_participants (room_id, user_id) VALUES (?,?)"
      ).run(roomId, invitedUserId);
      // delete the invitation
      db.prepare("DELETE FROM room_invitations WHERE id = ?").run(invitationId);
      res.status(200).send({ message: "Invitation accepted" });
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  }
);

// check all invitations for test purposes
messagesRouter.get("/invitations/all", (req, res) => {
  try {
    const invitations = db.prepare("SELECT * FROM room_invitations").all();
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

// check room_participants for test purposes
messagesRouter.get("/participants/", (req, res) => {
  try {
    const participants = db.prepare("SELECT * FROM room_participants").all();
    res.send(participants);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// shows participants in a specific room
messagesRouter.get("/participants/:roomId", (req, res) => {
  try {
    const { roomId } = req.params;
    const result = db
      .prepare(
        "SELECT name FROM users INNER JOIN room_participants ON users.id = room_participants.user_id WHERE room_participants.room_id = ?"
      )
      .all(roomId);
    res.send(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

export { messagesRouter };

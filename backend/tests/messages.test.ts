import request from "supertest";
import { app } from "../app";

let token;
let headers;
const userName = "test"
const userPassword = "test"
beforeAll(async () => {
  const response = await request(app)
    .post("/api/login")
    .send({ name: userName, password: userPassword });
  headers = response.headers;
});

describe("Rooms API", () => {
  let roomId = null;
  let roomName = "Test Room";
  let roomMessage = "Hello World";

  // Test case for GET /api/rooms
  test("GET /api/rooms - Retrieves all rooms", async () => {
    const response = await request(app)
      .get("/api/rooms")
      .set("Cookie", [...headers["set-cookie"]]);
    expect(response.status).toEqual(200);
    expect(Array.isArray(response.body)).toBeTruthy();
  });

  // Test case for POST /api/rooms
  test("POST /api/rooms - Creates a new room", async () => {
    const roomData = { name: roomName, group: 1 };
    const response = await request(app)
      .post("/api/rooms")
      .set("Cookie", [...headers["set-cookie"]])
      .send(roomData);
    roomId = response.body.roomId;
    expect(response.status).toEqual(200);
  });

  test("POST /messages/:roomId", async () => {
    const messageData = { content: roomMessage };
    const response = await request(app)
      .post(`/api/messages/${roomId}`)
      .set("Cookie", [...headers["set-cookie"]])
      .send(messageData);
    expect(response.status).toEqual(200);
  });

  // Test case for GET /api/rooms/:id
  test("GET /api/rooms/:id - Retrieves messages from a specific room", async () => {
    const response = await request(app)
      .get(`/api/rooms/${roomId}`)
      .set("Cookie", [...headers["set-cookie"]]);
    console.log(response.body);
    expect(response.status).toEqual(200);
    expect(response.body).toStrictEqual([
      { name: userName, id: 1, content: roomMessage },
    ]);
  });

  // Test case for GET /api/rooms/name/:id
  test("GET /api/rooms/name/:id - Retrieves name of a specific room", async () => {
    const response = await request(app)
      .get(`/api/rooms/name/${roomId}`)
      .set("Cookie", [...headers["set-cookie"]]);
    expect(response.status).toEqual(200);
    expect(response.body.name).toBe(roomName);
  });

  // Test case for DELETE /api/rooms/:id
  test("DELETE /api/rooms/:id - Deletes a specific room", async () => {
    const response = await request(app)
      .delete(`/api/rooms/${roomId}`)
      .set("Cookie", [...headers["set-cookie"]]);

    expect(response.status).toEqual(200);
    expect(response.body.message).toBe("Room is successfully deleted.");
  });
});

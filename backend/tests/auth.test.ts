import request from "supertest";
import { app } from "../app"



//POST registration path test 
describe("POST /register", () => {
  test("register new user successfully", async () => {
    const res = await request(app).post("/api/register").send({
      name: "testUser",
      password: "testPassword",
    });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Successfully registered!");
  });
  test("no duplication of username", async () => {
    const res = await request(app).post("/api/register").send({
      name: "testUser",
      password: "testPassword",
    });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error", "Username already exists");
  });
});

//post login route

describe("POST /login", () => {
  test("Existing User login", async () => {
    const res = await request(app).post("/api/login").send({
      name: "testUser",
      password: "testPassword",
    });
    console.log(res.body);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Logged in successfully!");
  });
  test("Not login a non-existing user", async () => {
    const res = await request(app).post("/api/login").send({
      name: "nonExistingTestUser",
      password: "testPassword",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "No user found");
  });
  test("Not login with wrong password", async () => {
    const res = await request(app).post("/api/login").send({
      name: "testUser",
      password: "wrongPassword",
    });
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("error", "Invalid credentials.");
  });
});

//Post logout route

describe("Try logout", () => {
  let userId;
  let token;

  beforeAll(async () => {
    // Register a user and get their token
    const user = {
      name: "testuser",
      password: "password",
    };

    const registerResponse = await request(app)
      .post("/api/register")
      .send(user);

    userId = registerResponse.body.userId;
    token = registerResponse.body.token;
  });

  it("should successfully log out a user", async () => {
    const response = await request(app)
      .post("/api/logout")
      .set("Cookie", [`token=${token}`, `userId=${userId}`]);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Logged out successfully!");
  });

  it("should be able to log out a user without a token", async () => {
    const response = await request(app).post("/api/logout");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Logged out successfully!");
  });
});

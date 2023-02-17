import express, { Request, Response } from "express";
import { db } from "../database/db";
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

const authRouter = express.Router();

// Generate a random token
function generateToken(): string {
  return Math.random().toString(36).substring(2);
}

// generate User token function
function generateUserToken(user_id, res) {
  // Generate a new token
  const token = generateToken();
  console.log(token);

  // Save the token in the database
  db.prepare(
    "INSERT INTO token (user_id, token) VALUES (?, ?) ON CONFLICT(user_id) DO UPDATE SET token = ? "
  ).run(user_id, token, token);

  // Set the token as a cookie in the response
  res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });

  // Set the user_id as a cookie in the response
  res.cookie("user_id", user_id, {
    httpOnly: true,
    maxAge: 2 * 60 * 60 * 1000,
  });
}

// delete userToken Function
function deleteUserToken(user_id, token, res) {
  // Delete the token from the database
  db.prepare("DELETE FROM token WHERE user_id = ? AND token =?").run(
    user_id,
    token
  );
  // Remove the token cookie from the response
  res.clearCookie("token");
}

// Logout route
authRouter.post("/logout", (req: Request, res: Response) => {
  try {
    const token = req.cookies.token;
    const user_id = req.cookies.user_id;
    deleteUserToken(user_id, token, res);

    res.send({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

authRouter.get("/verify", (req: Request, res: Response) => {
  let user = verifyUser(req);
  res.json(user);
});

// Verify user token
function verifyUser(req): { name: string } | null | boolean {
  try {
    const token = req.cookies.token;
    const user_id = req.cookies.user_id;

    const tokenData = db
      .prepare("SELECT * FROM token WHERE user_id = ? and token= ?")
      .get(user_id, token);
    console.log(tokenData);
    if (tokenData) {
      const userData = db
        .prepare("SELECT id, name from user WHERE id=?")
        .get(user_id);
      return userData;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }

  // If there was an error or the token was invalid, return null
  return null;
}

export { authRouter, verifyUser };

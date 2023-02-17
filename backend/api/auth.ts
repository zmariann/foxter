import express, { Request, Response } from "express";
import { db } from "../database/db";
// npm install cookie-parser
// npm install jsonwebtoken
import jwt from "jsonwebtoken";
// npm install bcrypt
import bcrypt from "bcrypt";
import { z } from "zod";

const authRouter = express.Router();

// Generate a random token
function generateToken(): string {
  return Math.random().toString(36).substring(2);
}

// generate User token function
function generateUserToken(userId, res) {
  // Generate a new token
  const token = generateToken();
  
  // Save the token in the database
  db.prepare(
    "INSERT OR REPLACE INTO tokens (user_id, token) VALUES (?, ?)"
  ).run(userId, token);

  // Set the token as a cookie in the response
  res.cookie("token", token, { httpOnly: true, maxAge: 2 * 60 * 60 * 1000 });

  // Set the user_id as a cookie in the response
  res.cookie("userId", userId, {
    httpOnly: true,
    maxAge: 2 * 60 * 60 * 1000,
  });
}

const RegisterBodySchema = z.object({
  username: z.string(),
  password: z.string()
})

// Register route
authRouter.post("/register", async (req: Request, res: Response) => {
  const validated = RegisterBodySchema.safeParse(req.body);
  
  if (validated.success === false) {
    return res.status(401).send({ error: validated.error.flatten() });
  }
  
  const { username, password } = validated.data; 
  
  const result = db.prepare("SELECT * FROM users WHERE name = ?").get(username);

  if (result !== undefined) {
    return res.status(400).send({ error: "User with this username already exists" })
  }
  
  const hashedPassword = await hashPassword(password)
  
  const { id: userId } = db.prepare("INSERT INTO users (name, password) VALUES (?, ?) RETURNING id").get(
    username,
    hashedPassword
  );
  
  generateUserToken(userId, res);
 
  res.send({ message: "Successfuly registered!"});     
});

// for register route: take req.body.password and hash it with bcrypt (with 10 rounds)
async function hashPassword(password: string): Promise<string> {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  return hashedPassword;
}

// delete userToken Function
function deleteUserToken(userId, token, res) {
  // Delete the token from the database
  db.prepare("DELETE FROM tokens WHERE user_id = ? AND token =?").run(
    userId,
    token
  );
  // Remove the token cookie from the response
  res.clearCookie("token");
  res.clearCookie("userId");
}

// Logout route
authRouter.post("/logout", (req: Request, res: Response) => {
  try {
    const { token, userId } = req.cookies;
    deleteUserToken(userId, token, res);

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
function verifyUser(req: Request): { id: number, name: string } | null {
  try {
    const { token, userId } = req.cookies;

    const tokenData = db
      .prepare("SELECT * FROM tokens WHERE user_id = ? and token= ?")
      .get(userId, token);
    console.log(tokenData);
    
    if (tokenData === undefined) {
      return null;
    }
    
    const userData = db
      .prepare("SELECT id, name from users WHERE id=?")
      .get(user_id);
    
    return userData;
    
  } catch (error) {
    console.error(error);
  }

  // If there was an error or the token was invalid, return null
  return null;
}

export { authRouter, verifyUser };

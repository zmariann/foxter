import express, { Request, Response } from "express";
import { db } from "../database/db";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { z } from "zod";
import { validateBody } from "./validation";

const authRouter = express.Router();

interface UserJWTObject {
  userId: number,
  userName: string,
}

// Generate a random token
function generateJWT(user: UserJWTObject, res: Response) {
  let token: string = jwt.sign({ userName: user.userName, userId: user.userId }, process.env.JWT_SECRET);
  res.cookie("token", token, { path: "/" });
}

// delete userToken Function
function deleteUserToken(req: Request, res: Response): void {
  res.clearCookie("token", { path: "/" });
}

const RegisterBodySchema = z.object({
  name: z.string(),
  password: z.string(),
});

// for register route: take req.body.password and hash it with bcrypt (with 10 rounds)
async function hashPassword(password: string): Promise<string> {
  const hashedPassword: string = await bcrypt.hash(password, 10);
  return hashedPassword;
}

// Register route
authRouter.post(
  "/register",
  validateBody(RegisterBodySchema),
  async (req: Request, res: Response) => {
    try {
      const { name, password } = req.body;
      const result = db.prepare("SELECT * FROM users WHERE name = ?").get(name);

      if (result !== undefined) {
        return res.status(400).send({ error: "Username already exists" });
      }
      const hashedPassword = await hashPassword(password);

      const userId = db
        .prepare(
          "INSERT INTO users (name, password) VALUES (?, ?) RETURNING id"
        )
        .get(name, hashedPassword);

        generateJWT({ userId: userId.id, userName: name }, res);

      res.send({ message: "Successfully registered!", data : { userId: userId.id, userName: name }, status: true });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Internal server error" });
    }
  }
);

// Login route
authRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { name, password } = req.body;

    // Check if user is already logged in
    if (req.cookies.token) {
      return res
        .status(400)
        .json({ status: false, error: "You are already logged in." });
    }

    // Check if user exists
    const user = db.prepare("SELECT * FROM users WHERE name = ?").get(name);
    if (!user) {
      return res.status(400).json({ status: false, error: "No user found" });
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(400)
        .json({ status: false, error: "Invalid credentials." });
    }
  // Generate a new token
  generateJWT({ userId: user.id, userName: name }, res);
    res.json({ status: true, message: "Logged in successfully!", data: { userId: user.id, userName: name } });
  } catch (error) {
    res.status(400).json({ status: false, error: error.message });
  }
});

// Logout route
authRouter.post("/logout", (req: Request, res: Response) => {
  try {
    deleteUserToken(req, res);
    res.send({ message: "Logged out successfully!" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// verifyUser Route
authRouter.get("/verify", (req: Request, res: Response) => {
  const user = verifyUser(req);
  if (user) {
    res.json(user);
  } else {
    res.status(401).send({ error: "Invalid token" });
  }
});

// Verify user token
function verifyUser(req: Request): { id: number; name: string } | null {
  try {
    const { token } = req.cookies;

    const jwtResponse = jwt.verify(token, process.env.JWT_SECRET) as UserJWTObject | string | null;

    if (jwtResponse && typeof jwtResponse != "string") {
      return {
        id: jwtResponse.userId,
        name: jwtResponse.userName!,
      };

    } else {
      return null;
    }

  } catch (error) {
    console.error(error);
  }

  // If there was an error or the token was invalid, return null
  return null;
}

export { authRouter, verifyUser };

import express from "express";
import { verifyUser } from "./auth";

function authMiddleware(req, res, next) {
  const user = verifyUser(req);
  if (user === null) {
    return res.status(401).send({ error: "Unauthorized" });
  }
  req.user = user;
  next();
}

export { authMiddleware };

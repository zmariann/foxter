//set up express
import express, { Request, Response } from "express";
const app = express();
//set up SQLite
const db = require("better-sqlite3")("database.db");
//parse json
app.use(express.json());
const path = require("path");
// use public folder
app.use(express.static('public'));

db.prepare(
  `
    CREATE TABLE IF NOT EXISTS fox (
    id INTEGER PRIMARY KEY,
    content TEXT NOT NULL,
    created_at TEXT)`
).run();

// INSERT INTO THE DATABASE
// db.prepare(`INSERT INTO fox (content, created_at) VALUES ('littleTEXTtext', date())`).run();
const allFoxes = db.prepare(`SELECT * FROM fox`).all();
console.log(allFoxes);

app.get("/api/users", (req: Request, res: Response) => {
  res.send(db.prepare('SELECT * FROM fox').all());
});

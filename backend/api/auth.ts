import express from 'express';
// npm install cookie-parser
const cookieParser = require('cookie-parser');
// npm install jsonwebtoken
const jwt = require('jsonwebtoken')
const auth = express();
// npm install bcrypt
const bcrypt = require('bcrypt');

auth.use(cookieParser());

// / TOKEN -> Username const TOKENS = new Map<string, string>()
// function generateToken() { 
// return "32-random-characters" 
// } 

// fire a function before doc saved to db


const tokens = new Map<string, string>();
tokens.set('Marika', 'secret passw');

async function generateToken() {
    const passw = 'password';
    const hashedpassw = await bcrypt.hash(passw, 10)
    const result = await bcrypt.compare(passw, hashedpassw)
}

/*
Jakub's code for help:

app.post("/api/login", (req, res) => { 

const { username, password } = req.body;

validate(username) 

validate(password) 

const token = generateToken() 

TOKENS.set(token, username) return res.status(200).send(token) 

}) 

app.get("/api/secret", (req, res) => { 

const username: string | undefined = TOKENS.get(req.headers["X-Auth-Token"]) 

if (username === undefined) { 

return res.status(401).send("Not authorized") 

} 

const secret = getSecretFor(username) 

return res.send(secret) }) 

app.post("/api/logout", (req, res) => 

{ const { token } = req.headers["X-Auth-Token"] TOKENS.remove(token) return res.send("Succesfuly logout") 

})
*/
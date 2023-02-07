import fs from 'fs'
const sqlite = require('better-sqlite3')

const db = sqlite('foxter.db')

db.exec(fs.readFileSync('./database/create.sql').toString())

export { db }
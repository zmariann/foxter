import fs from 'fs'
const sqlite = require('better-sqlite3')

const name = process.env['DB_NAME'] || 'foxter'

const db = sqlite(name + '.db')

db.exec(fs.readFileSync('./database/create.sql').toString())

export { db }
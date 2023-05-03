import fs from 'fs'
import sqlite3 from 'better-sqlite3'

const name = process.env['NODE_ENV'] == 'test' ? 'test' : 'foxter'
const db: any = sqlite3(name + '.db')

db.exec(fs.readFileSync('./database/create.sql').toString())

export { db }

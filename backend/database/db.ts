import fs from 'fs'
import sqlite from 'better-sqlite3'

const name = process.env['NODE_ENV'] == 'test' ? 'test' : 'foxter'
const db: any = sqlite(name + '.db')

db.exec(fs.readFileSync('./database/create.sql').toString())

export { db }

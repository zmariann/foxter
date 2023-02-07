const sqlite = require('better-sqlite3')

const db = sqlite('foxter.db')

export { db }
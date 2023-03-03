CREATE TABLE IF NOT EXISTS foxes (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	content TEXT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS tokens (
  user_id INTEGER PRIMARY KEY NOT NULL,
  token TEXT UNIQUE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-----------------------------------------------
-- messages & room tables

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  content TEXT NOT NULL,
  room_id INT NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS rooms (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  rooms_group INTEGER NOT NULL,
  creator_id INTEGER NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS room_participants  (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  room_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (room_id) REFERENCES rooms(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS room_invitations  (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  host_id INTEGER NOT NULL,
  invited_id INTEGER NOT NULL,
  room_id INTEGER NOT NULL,
  FOREIGN KEY (host_id) REFERENCES users(id),
  FOREIGN KEY (invited_id) REFERENCES users(id),
  FOREIGN KEY (room_id) REFERENCES rooms(id)
);

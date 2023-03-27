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
  followers_count INTEGER,
  profile_image_url TEXT,
  UNIQUE (name)
);

CREATE TABLE IF NOT EXISTS tokens (
  user_id INTEGER PRIMARY KEY NOT NULL,
  token TEXT UNIQUE NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS hashtags (
id INTEGER PRIMARY KEY AUTOINCREMENT,
tag TEXT NOT NULL,
fox_id INTEGER NOT NULL,
FOREIGN KEY (fox_id)
REFERENCES foxes(id)
);

----------- fox-likes -----------------------------
CREATE TABLE IF NOT EXISTS fox_likes (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	fox_id INTEGER NOT NULL,
	user_id INTEGER NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (fox_id) REFERENCES foxes(id),
	FOREIGN KEY (user_id) REFERENCES users(id) 
 );
 CREATE UNIQUE INDEX IF NOT EXISTS unique_fox_like ON fox_likes (fox_id,user_id);

---------- messages & room tables------------------

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  content TEXT,
  room_id INT NOT NULL,
  user_id INTEGER NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS rooms (
  id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  is_group INTEGER NOT NULL,
  creator_id INTEGER NOT NULL,
  FOREIGN KEY (creator_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS room_participants (
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

CREATE TABLE IF NOT EXISTS followers (
  id INTEGER PRIMARY KEY,
  follower INTEGER NOT NULL,
  followed INTEGER NOT NULL,
  FOREIGN KEY (follower) REFERENCES users (id),
  FOREIGN KEY (followed) REFERENCES users (id)
);

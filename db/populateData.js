require('dotenv').config();
const { Client } = require('pg');

const SQL = `
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
    username    VARCHAR(100) UNIQUE NOT NULL,
    password    TEXT,
    is_member   BOOLEAN DEFAULT FALSE,
    is_admin    BOOLEAN DEFAULT FALSE
  );

  CREATE TABLE IF NOT EXISTS messages (
    id          INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id),
    title       VARCHAR(255) NOT NULL,
    text        TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );


  INSERT INTO users (first_name, last_name, username, password, is_member, is_admin)
  VALUES
  ('Admin', 'User', 'admin', '$2b$10$StArQXKAArvU2rYECHMtWOu1MSon8egd.0VgYkKk65MuNOcKEJ1a.', FALSE, TRUE),  -- Admin
  ('Regular', 'User', 'user', '$2b$10$tfNC7HjoJbCrxL1P5eH0g.0GCjtnJUVfRML.WKdpgaMUlnPY0H2WC', TRUE, FALSE); -- Regular Member


  INSERT INTO messages (user_id, title, text)
  VALUES
  (1, 'Welcome to the Club', 'Excited to have you all here! Let’s have fun.'),
  (1, 'Club Rules', 'Please respect each other and follow the guidelines.'),
  (1, 'Meeting Reminder', 'We have a meeting this Saturday at 3 PM.'),
  (2, 'Hello Everyone', 'Just joined the club! Looking forward to great discussions.'),
  (2, 'A Question', 'Does anyone have book recommendations on web development?'),
  (1, 'Update', 'New feature coming soon. Stay tuned!'),
  (2, 'Thanks for the warm welcome!', 'Happy to be here and meet you all.'),
  (1, 'Reminder', 'Don’t forget to submit your proposals before Friday.'),
  (2, 'Funny Story', 'Something hilarious happened today...'),
  (1, 'Announcement', 'New club merchandise is now available!');
`;

async function populateData() {
  console.log('seeding...');
  const client = new Client({
    connectionString:
      process.env.DATABASE_URL || process.env.LOCAL_DATABASE_URL,
  });

  try {
    await client.connect();
    await client.query(SQL);
    console.log('done');
  } catch (error) {
    console.error(error);
  } finally {
    await client.end();
  }
}

populateData();

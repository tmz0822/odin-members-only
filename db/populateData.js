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

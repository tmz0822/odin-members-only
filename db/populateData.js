const SQL = `
  CREATE TABLE users (
    id          INTEGER GENERATE ALWAYS AS IDENTITY PRIMARY KEY,
    first_name  VARCHAR(100) NOT NULL,
    last_name   VARCHAR(100) NOT NULL,
    username    VARCHAR(100) UNIQUE NOT NULL,
    is_member   BOOLEAN DEFAULT FALSE,
    is_admin    BOOLEAN DEFAULT FALSE
  );

  CREATE TABLE messages (
    id          INTEGER GENERATE ALWAYS AS IDENTITY PRIMARY KEY,
    user_id     INTEGER NOT NULL REFERENCES users(id),
    title       VARCHAR(255) NOT NULL,
    text        TEXT NOT NULL,
    created_at  TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
  );
`;

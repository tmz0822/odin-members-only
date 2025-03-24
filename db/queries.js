const pool = require('./pool');

/**
 * USERS
 * */

async function signUpUser(user) {
  const { firstName, lastName, username, password } = user;

  await pool.query(
    `
      INSERT INTO users (first_name, last_name, username, password)
      VALUES ($1, $2, $3, $4)
    `,
    [firstName, lastName, username, password]
  );
}

async function getUserByUsername(username) {
  const { rows } = await pool.query(
    `
      SELECT * FROM users
      WHERE username = $1
    `,
    [username]
  );

  return rows[0];
}

async function getUserById(id) {
  const { rows } = await pool.query(
    `
      SELECT * FROM users
      WHERE id = $1
    `,
    [id]
  );

  return rows[0];
}

async function updateUserMembership(id) {
  await pool.query(
    ` 
      UPDATE users
      SET is_member = true
      WHERE id = $1
    `,
    [id]
  );
}

/**
 * MESSAGES
 */
async function getMessages() {
  const { rows } = await pool.query(
    `
      SELECT m.id, u.first_name || ' ' || u.last_name AS author, m.title, m.text, m.created_at
      FROM messages m
      JOIN users u
      ON m.user_id = u.id;
    `
  );

  return rows;
}

async function addMessage(userId, message) {
  await pool.query(
    `
      INSERT INTO messages (user_id, title, text)
      VALUES ($1, $2, $3)
    `,
    [userId, message.title, message.text]
  );
}

async function deleteMessage(id) {
  await pool.query(
    `
      DELETE FROM messages
      WHERE id = $1
    `,
    [id]
  );
}

module.exports = {
  signUpUser,
  getUserByUsername,
  getUserById,
  updateUserMembership,
  getMessages,
  addMessage,
  deleteMessage,
};

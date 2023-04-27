import db from './connection.js';

export async function getUserByEmail(email) {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
}

export async function createUser(user) {
  const { email, password } = user;
  const [result] = await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password]);
  return result.insertId;
}

export const getUserById = async (id) => {
    try {
      const [rows] = await connectionPool.query('SELECT * FROM users WHERE id = ?', [id]);
      if (rows.length > 0) {
        const user = {
          id: rows[0].id,
          email: rows[0].email,
          password: rows[0].password,
        };
        return user;
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error fetching user by id:', error);
      throw error;
    }
  };
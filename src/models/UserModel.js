const db = require('../config/db');

exports.createUser = async (userData) => {
  const [result] = await db.execute(
    `INSERT INTO users (name, email, password, role, phone, city, country)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      userData.name,
      userData.email,
      userData.password,
      userData.role,
      userData.phone,
      userData.city,
      userData.country,
    ]
  );
  return result;
};

exports.findByEmail = async (email) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

exports.findById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM users WHERE id = ?', [id]);
  return rows[0];
};

exports.getAllUsers = async (search, country) => {
  let query = 'SELECT * FROM users WHERE 1=1';
  const params = [];

  if (search) {
    query += ' AND (name LIKE ? OR email LIKE ?)';
    params.push(`%${search}%`, `%${search}%`);
  }

  if (country) {
    query += ' AND country = ?';
    params.push(country);
  }

  const [rows] = await db.execute(query, params);
  return rows;
};

let db = require("../config/db");

async function registerQuery(nama, hashedPassword) {
  return await db.query(
    `INSERT INTO users (username,password) VALUES ($1,$2)`,
    [nama, hashedPassword],
  );
}

async function userQuery(nama) {
  let user = await db.query(`SELECT id,username,password FROM users WHERE username = $1`, [
    nama,
  ]);
  return user.rows
}

module.exports = { registerQuery,userQuery };

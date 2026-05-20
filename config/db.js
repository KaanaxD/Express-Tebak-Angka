const db = require("pg");
let pool = new db.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,
  },
});

module.exports = pool;

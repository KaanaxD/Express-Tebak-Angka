const db = require("../config/db");

async function setGameQuery(id, target, attempt, status) {
  let result = await db.query(
    `INSERT INTO game (user_id,target_number,attempt,is_finished) VALUES ($1,$2,$3,$4) RETURNING *`,
    [id, target, attempt, status],
  );
  return result.rows;
}

async function getLatestGameQuery(id) {
  let result = await db.query(
    `SELECT id,target_number,attempt,is_finished FROM game WHERE user_id = $1 ORDER BY id DESC LIMIT 1`,
    [id],
  );
  return result.rows;
}

async function setLeaderboardQuery(id, attempt) {
  let result = await db.query(
    `INSERT INTO leaderboard (user_id,attempts) VALUES ($1,$2) RETURNING *`,
    [id, attempt],
  );
  return result.rows;
}

module.exports = { setGameQuery, getLatestGameQuery, setLeaderboardQuery };

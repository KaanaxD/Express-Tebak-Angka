let db = require("../config/db");

async function getLeaderboardQuery() {
  let result = await db.query(
    `SELECT users.username, leaderboard.attempts FROM users JOIN leaderboard ON leaderboard.user_id = users.id ORDER BY leaderboard.attempts ASC`,
  );
  return result.rows
}

module.exports = getLeaderboardQuery
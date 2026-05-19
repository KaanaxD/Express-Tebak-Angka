let getLeaderboardQuery = require("../models/leaderboardModel")

async function getLeaderboard(req,res,next){
    let leaderboard = await getLeaderboardQuery();
    res.json({
        success: true,
        leaderboard: leaderboard
    })
}

module.exports = {getLeaderboard}
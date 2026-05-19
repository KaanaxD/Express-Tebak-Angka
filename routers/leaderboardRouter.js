let controller = require("../controllers/leaderboardController")
let express = require("express")
let router = express.Router()

router.get("/",controller.getLeaderboard)

module.exports = router
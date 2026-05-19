let controller = require("../controllers/gameController")
let express = require("express")
let router = express.Router()

router.get("/start",controller.startGame)

module.exports = router
let controller = require("../controllers/gameController")
let express = require("express")
let router = express.Router()

router.get("/start",controller.startNewGame)
router.post("/check",controller.checkGame)

module.exports = router
let controller = require("../controllers/authController")
let express = require("express")
let router = express.Router()

router.post("/register",controller.register)
router.post("/login",controller.login)

module.exports = router
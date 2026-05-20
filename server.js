require("dotenv").config()
const express = require('express')
const app = express()
const port = process.env.PORT
const errorHandler = require("./middlewares/errorHandler")
const authRouter = require("./routers/authRouter")
const gameRouter = require("./routers/gameRouter")
const leaderboardRouter = require("./routers/leaderboardRouter")
const authmiddleware = require("./middlewares/authmiddleware")


app.use(express.json())
app.use(express.urlencoded())
app.use("/api/auth",authRouter)
app.use("/api/game",authmiddleware,gameRouter)
app.use("/api/leaderboard",leaderboardRouter)


app.use(errorHandler.errorHandler)
app.listen(port, () => console.log(`listening on port ${port}!`))
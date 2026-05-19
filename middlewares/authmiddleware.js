let jwt = require("jsonwebtoken")
let {createError} = require("../middlewares/errorHandler")

function authmiddleware(req,res,next){
    let bearerToken = req.headers.authorization.split(" ")[1]
    if(!bearerToken){
        return next(createError(404,"belum login"))
    }
    let check = jwt.verify(bearerToken,process.env.JWT_SECRET)
    if(!check){
        return next(createError(404,"invalid token"))
    } else {
        req.user = check
        next()
    }
}

module.exports = authmiddleware
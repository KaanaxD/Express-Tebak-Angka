function createError(status,message){
    const error = new Error(message)
    error.status = status
    return error
}

function errorHandler(err,req,res,next){
    return res.json(err.status||500).json({
        message: err.message || "internal server error",
    })
}

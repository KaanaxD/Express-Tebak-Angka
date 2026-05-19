let service = require("../services/gameService");
let { createError } = require("../middlewares/errorHandler");
let { rng } = require("../utils/rng");

async function startNewGame(req, res, next) {
  let target = rng();
  let check = await service.historyCheck(req.user.id);
  if (!check) {
    return next(createError(404, "masih ada game yang belum diselesaikan"));
  }

  await service.setNewGame(req.user.id, target);
  res.json({
    succes: true,
    message: "game dimulai",
    target_number: target,
  });
}

async function checkGame(req, res, next) {
  try {
    let guess = req.body.guess;
    if(!guess){
        throw createError(400,"Guess tidak boleh kosong")
    }
    let result = await service.guessCheck(req.user.id, guess);
    res.json(result)
  } catch (error) {
    next(error)
  }
}
module.exports = { startNewGame, checkGame };

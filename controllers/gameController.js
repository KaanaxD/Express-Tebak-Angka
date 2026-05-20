const service = require("../services/gameService");
const { createError } = require("../middlewares/errorHandler");
const { rng } = require("../utils/rng");
const { z } = require("zod");

const input = z.object({
  guess: z.number(),
});

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
    if (!guess) {
      throw createError(400, "Guess tidak boleh kosong");
    }
    let inputCheck = input.safeParse({guess});
  
    if (!inputCheck.success) {
      throw createError(400,"guess harus berupa angka")
    }
    let result = await service.guessCheck(req.user.id, guess);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
module.exports = { startNewGame, checkGame };

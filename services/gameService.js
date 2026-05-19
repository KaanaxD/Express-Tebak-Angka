let query = require("../models/gameModels");

async function setNewGame(user_id, rng) {
  await query.setGameQuery(user_id, rng, 0, false);
}

async function historyCheck(id) {
  let done = await query.getLatestGameQuery(id);
  console.log(done);
  if (done.length == 0) {
    return true;
  } else if (done[0].is_finished == true) {
    return true;
  }
  return false;
}

async function guessCheck(id, guess) {
  let target = await query.getLatestGameQuery(id);
  if (!target.length || target[0].is_finished) {
    throw {
      success: false,
      message: "game belum dimulai",
    };
  }
  if (target[0].target_number != guess) {
    let status;
    if (target[0].target_number > guess) {
      status = "kekecilan";
    } else {
      status = "kebesaran";
    }
    console.log(target[0]);
   let result = await query.setGameQuery(
      id,
      target[0].target_number,
      target[0].attempt + 1,
      false,
    );
        return {
      success: true,
      correct: false,
      message: "tebakan salah",
      status: status,
    };
  }
  await query.setGameQuery(
    id,
    target[0].target_number,
    target[0].attempt + 1,
    true,
  );
  await query.setLeaderboardQuery(id, target[0].attempt + 1);
  return {
    succes: true,
    correct: true,
    message: "tebakan benar",
  };
}

module.exports = { setNewGame, historyCheck, guessCheck };

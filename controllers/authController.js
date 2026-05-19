let service = require("../services/authServices");
let jwt = require("jsonwebtoken");
let { createError } = require("../middlewares/errorHandler");

async function register(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    return next(createError(400, "Username atau password harus diisi"));
  }
  await service.makeAccount(username, password);
  res.json({
    succes: true,
    message: "Akun berhasil dibuat",
  });
}

async function login(req, res, next) {
  try {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
      return next(createError(400, "Username atau password harus diisi"));
    }
    let result = await service.verifyAcc(username, password);
    res.json({
      succes: true,
      message: "Berhasil login",
      result
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register,login };

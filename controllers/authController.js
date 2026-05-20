let service = require("../services/authService");
let jwt = require("jsonwebtoken");
let { createError } = require("../middlewares/errorHandler");
let { z, ipv4, success } = require("zod");

const input = z.object({
  username: z.string(),
  password: z.string().min(8),
});

async function register(req, res, next) {
  let { username, password } = req.body;

  if (!username || !password) {
    return next(createError(400, "Username atau password harus diisi"));
  }
  let inputCheckt = input.safeParse({
    username: username,
    password: password,
  });

  if (!inputCheckt.success) {
    next(createError(400, "password harus lebih dari 8 karakter"));
  }

  await service.makeAccount(username, password);
  res.json({
    succes: true,
    message: "Akun berhasil dibuat",
  });
}

async function login(req, res, next) {
  try {
    let { username, password } = req.body;

    if (!username || !password) {
      return next(createError(400, "Username atau password harus diisi"));
    }

    let inputCheck = input.safeParse({
      username: username,
      password: password,
    });

    if (!inputCheck.success) {
      next(createError(400, "password harus lebih dari 8 karakter"));
    }
    let result = await service.verifyAcc(username, password);
    res.json({
      succes: true,
      message: "Berhasil login",
      result,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { register, login };

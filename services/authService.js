let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
let query = require("../models/usersModel");
let { createError } = require("../middlewares/errorHandler");
const { verify } = require("jsonwebtoken");

async function makeAccount(nama, password) {
  let hashPasswrd = await bcrypt.hash(password, 10);
  try {
    await query.registerQuery(nama, hashPasswrd);
  } catch (error) {
    throw createError(400,"Username telah terdaftar")
  }
}

async function verifyAcc(username, password) {
  let user = await query.userQuery(username);
  if (user.length == 0) {
    throw createError(400, "username tidak ditemukan");
  }
  let check = await bcrypt.compare(password, user[0].password);
  if (!check) {
    throw createError(400, "Password salah");
  }
  let token = jwt.sign(
    {
      id: user[0].id,
      username: user[0].username,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h",
    },
  );

  return({
    token: token,
    user: {
        id: user[0].id,
        username: user[0].username
    }
  })
}

module.exports = { makeAccount, verifyAcc };

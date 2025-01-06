const { request, response } = require("express");
const jwt = require("../utils/jwt");

async function validateToken(req = request, res = response, next) {
  const token = req.cookies["accesstoken"] || req.headers["accesstoken"];
  if (token == null)
    return res.status(401).json({ message: "No estas autenticado" });
  try {
    const userData = jwt.decodeToken(token);
    req.user = userData;
    await next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "No se pudo autenticar" });
  }
}

module.exports = {
    validateToken
}
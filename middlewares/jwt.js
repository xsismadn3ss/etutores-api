const { request, response } = require("express");
const jwt = require("../utils/jwt");

async function validateToken(req = request, res = response, next) {
  const url = req.path;
  console.log(url)
  if (url.includes("/login") || url.includes('/register/')) {
    await next();
  } else {
    const token = req.cookies["access-token"] || req.headers["access-token"];
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
}

module.exports = validateToken;

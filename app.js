const express = require("express");
const config = require("./appConfig");
const cookieParser = require("cookie-parser");
const cors = require("cors");
// middlewares
const notFoundHandler = require("./middlewares/notFound");
const httpErrorHandler = require("./middlewares/httpError");
const validateToken = require("./middlewares/jwt");
const logger = require("./middlewares/logger");
// routers
const home = require("./routes/home");
const sexos = require("./routes/sexos");
const roles = require("./routes/roles");
const usuarios = require("./routes/usuarios");
const auth = require("./routes/auth");
const inscripciones = require("./routes/inscripciones");
const materias = require("./routes/materias");
const experiencias = require("./routes/experiencias");
const profesores = require("./routes/profesores");

const app = express();
app.set("port", config.app.port);
app.use(cors(config.cors));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173"); // Origen permitido
  res.header("Access-Control-Allow-Credentials", "true"); // Permitir credenciales
  next();
});
app.use(express.json());
app.use(cookieParser());

// middleware para añadir logs de las endpoints
app.use(logger);
// añadir autenticaciones
// app.use("/api", validateToken);

// registrar rutas
const base = config.app.base;
app.use(base, home);
app.use(base, sexos);
app.use(base, roles);
app.use(base, usuarios);
app.use(base, auth);
app.use(base, inscripciones);
app.use(base, materias);
app.use(base, experiencias);
app.use(base, profesores);

// registrar middlewares
app.use(notFoundHandler);
app.use(httpErrorHandler);

module.exports = app;

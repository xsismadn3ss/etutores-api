const express = require("express");
const config = require("./appConfig");
const cookieParser = require("cookie-parser");
// middlewares
const notFoundHandler = require("./middlewares/notFound");
const httpErrorHandler = require("./middlewares/httpError");
const validateToken = require("./middlewares/jwt");
// routers
const home = require("./routes/home");
const sexos = require("./routes/sexos");
const roles = require("./routes/roles");
const usuarios = require("./routes/usuarios");
const auth = require("./routes/auth");
const inscripciones = require("./routes/inscripciones");
const materias = require("./routes/materias");
const experiencias = require("./routes/experiencias");

const app = express();
app.set("port", config.app.port);
app.use(express.json());
app.use(cookieParser());

// añadir autenticaciones
app.use("/api", validateToken);

// registrar rutas
app.use("/api", home);
app.use("/api", sexos);
app.use("/api", roles);
app.use("/api", usuarios);
app.use("", auth);
app.use("/api", inscripciones);
app.use("/api", materias);
app.use("/api", experiencias);

// registrar middlewares
app.use(notFoundHandler);
app.use(httpErrorHandler);

module.exports = app;

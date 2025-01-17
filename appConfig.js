const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  app: {
    port: process.env.PORT || 3000,
    base: "/api",
  },
  env: process.env.NODE_ENV || "development",
  jwt: {
    secret: process.env.SECRET_KEY,
    algorithm: "HS256",
  },
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  },
};

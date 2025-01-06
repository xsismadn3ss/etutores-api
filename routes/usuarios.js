const express = require("express");
const userController = require("../controllers/userController");
const jwtMiddleware = require("../middlewares/jwt");

const router = express.Router();

router.get("/users/", jwtMiddleware.validateToken, userController.getUsers);
router.get("/users/:id", userController.getUser);
router.post("/users/register/", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.post('/users/login', userController.login)
router.delete('/users/:id', userController.deleteUser);

module.exports = router
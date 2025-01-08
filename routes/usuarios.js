const express = require("express");
const userController = require("../controllers/userController");
const validatePermission = require('../middlewares/rolHandler')

const router = express.Router();

router.get("/users/", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.put("/users/:id", userController.updateUser);
router.delete('/users/:id', validatePermission(['administrador']),userController.deleteUser);
router.get('/profile/', userController.profile)

module.exports = router
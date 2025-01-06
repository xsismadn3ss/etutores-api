const express = require("express");
const router = express.Router();
const rolController = require("../controllers/rolController");

router.get("/roles/", rolController.getRoles);
router.get("/roles/:id", rolController.getRol);
router.post("/roles/", rolController.createRol);
router.put("/roles/:id", rolController.updateRol);
router.delete("/roles/:id", rolController.deleteRol);

module.exports = router;
const express = require("express");
const sexoController = require("../controllers/sexoController");
const validatePermissions = require('../middlewares/rolHandler')

const router = express.Router();

router.get("/sexos/",validatePermissions(['administrador']), sexoController.getSexos);
router.get("/sexos/:id",validatePermissions(['administrador']), sexoController.getSexo);
router.post("/sexos/",validatePermissions(['administrador']), sexoController.createSexo);
router.put("/sexos/:id",validatePermissions(['administrador']), sexoController.updateSexo);
router.delete("/sexos/:id",validatePermissions(['administrador']), sexoController.deleteSexo);

module.exports = router;

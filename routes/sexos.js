const express = require("express");
const router = express.Router();
const sexoController = require("../controllers/sexoController");

router.get("/sexos/", sexoController.getSexos);
router.get("/sexos/:id", sexoController.getSexo);
router.post("/sexos/", sexoController.createSexo);
router.put("/sexos/:id", sexoController.updateSexo);
router.delete("/sexos/:id", sexoController.deleteSexo);

module.exports = router;

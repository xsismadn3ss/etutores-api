const express = require("express");
const router = express.Router();
const materiaController = require("../controllers/materiaController");

router.get('/materias', materiaController.getMaterias)
router.get('/materias/:id', materiaController.getMateria)
router.post('/materias', materiaController.createMateria)
router.put('/materias', materiaController.updateMateria)
router.delete('/materia', materiaController.deleteMateria)

module.exports = router
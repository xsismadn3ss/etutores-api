const express = require("express");
const router = express.Router();
const materiaController = require("../controllers/materiaController");
const validatePermissions = require('../middlewares/rolHandler')

// rutas comunes
router.get('/materias', materiaController.getMaterias)
router.get('/materias/:id', materiaController.getMateria)
// rutar para administrador
router.post('/materias',validatePermissions(['administrador']), materiaController.createMateria)
router.put('/materias',validatePermissions(['administrador']), materiaController.updateMateria)
router.delete('/materias/:id',validatePermissions(['administrador']), materiaController.deleteMateria)
// rutas para profesores
router.get('/profesor/materias/',validatePermissions(['profesor']), materiaController.getProfesorMaterias)
router.put('/profesor/materias/:id', validatePermissions(['profesor']), materiaController.updateProfesorMateria)
router.delete('/profesor/materias/:id',validatePermissions(['profesor']), materiaController.deleProfesorMateria)

module.exports = router
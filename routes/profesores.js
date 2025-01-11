const express = require("express");
const router = express.Router();
const {
  getProfesor,
  getProfesorSelf,
  getProfesores,
  createProfesor,
  updateProfesores,
  deleteProfesor,
} = require("../controllers/profesorController");
const rolAccess = require('../middlewares/rolHandler')

router.get('/profesores/all', getProfesores)
router.get('/profesores', getProfesor)
router.get('/profesores/self', rolAccess(['profesor', 'administrador']), getProfesorSelf)
router.post('/profesores',rolAccess(['profesor', 'administrador']), createProfesor)
router.put('/profesores', rolAccess(['profesor', 'administrador']), updateProfesores)
router.put('/profesores', rolAccess(['profesor', 'administrador']), deleteProfesor)

module.exports = router
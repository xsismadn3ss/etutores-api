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

router.get('/profesores', getProfesores)
router.get('/profesores/:id', getProfesor)
router.get('/profesores/self', getProfesorSelf)
router.post('/profesores',rolAccess(['profesor', 'administrador']), createProfesor)
router.put('/profesores', rolAccess(['profesor', 'administrador']), updateProfesores)
router.put('/profesores', rolAccess(['profesor', 'administrador']), deleteProfesor)
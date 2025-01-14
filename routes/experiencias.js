const express = require("express");
const router = express.Router();
const experienciaController = require("../controllers/experienciaController");
const validatePermissions = require('../middlewares/rolHandler');

// rutas comunes
router.get('/experiencias', experienciaController.getExperienciaByProfesorId)

// rutas de administrador
router.get("/experiencias",validatePermissions(['administrador']), experienciaController.getExperiencias);        
router.get("/experiencia/:id",validatePermissions(['administrador']), experienciaController.getExperiencia);     
router.post("/experiencia",validatePermissions(['administrador']), experienciaController.createExperiencia);     
router.put("/experiencia/:id",validatePermissions(['administrador']), experienciaController.updateExperiencia);  
router.delete("/experiencia/:id",validatePermissions(['administrador']), experienciaController.deleteExperiencia); 

// rutas para profesor
router.get('/profesor/experiencias/', validatePermissions(['profesor', 'administrador']), experienciaController.getProfesorExperience)
router.post('/profesor/experiencias/', validatePermissions(['profesor', 'administrador']), experienciaController.createProfesorExperience)
router.put('/profesor/experiencias/:id', validatePermissions(['profesor', 'administrador']), experienciaController.updateProfesorExperience)
router.delete('/profesor/experiencias/:id', validatePermissions(['profesor', 'administrador']), experienciaController.deleteProfesorExperience)

module.exports = router;

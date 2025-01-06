const express = require("express");
const router = express.Router();
const experienciaController = require("../controllers/experienciaController");

router.get("/experiencias", experienciaController.getExperiencias);        
router.get("/experiencia/:id", experienciaController.getExperiencia);     
router.post("/experiencia", experienciaController.createExperiencia);     
router.put("/experiencia/:id", experienciaController.updateExperiencia);  
router.delete("/experiencia/:id", experienciaController.deleteExperiencia); 

module.exports = router;

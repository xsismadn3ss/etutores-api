const express = require("express");
const router = express.Router();
const inscripcionController = require("../controllers/inscripcionController");
const validateRol = require('../middlewares/rolHandler')

router.get("/inscripciones", validateRol(["administrados"]) ,inscripcionController.getInscripciones);        
router.get("/inscripciones/:id", inscripcionController.getInscripcion);    
router.post("/inscripciones", inscripcionController.createInscripcion);     
router.put("/inscripciones/:id", inscripcionController.updateInscripcion);  
router.delete("/inscripciones/:id", inscripcionController.deleteInscripcion);
router.get("/inscripciones/self", inscripcionController.getMyInscripciones)
router.get("/inscripciones/materia/:id", inscripcionController.getInscritos)

module.exports = router;
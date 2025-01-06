const express = require("express");
const router = express.Router();
const inscripcionController = require("../controllers/inscripcionController");

router.get("/inscripciones", inscripcionController.getInscripciones);        
router.get("/inscripciones/:id", inscripcionController.getInscripcion);    
router.post("/inscripciones", inscripcionController.createInscripcion);     
router.put("/inscripciones/:id", inscripcionController.updateInscripcion);  
router.delete("/inscripciones/:id", inscripcionController.deleteInscripcion); 

module.exports = router;
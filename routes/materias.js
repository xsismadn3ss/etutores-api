const express = require("express");
const router = express.Router();
const materiaController = require("../controllers/materiaController");
const validatePermissions = require("../middlewares/rolHandler");

// rutas comunes
router.get("/materias/all", materiaController.getMaterias);
router.get("/materias", materiaController.getMateria);
router.get("/materias/search", materiaController.searchMateria);
// rutas para administrador
router.put(
  "/materias",
//   validatePermissions(["administrador"]),
  materiaController.updateMateria
);
router.delete(
  "/materias/:id",
//   validatePermissions(["administrador"]),
  materiaController.deleteMateria
);
// rutas para profesores
router.post(
  "/profesor/materias",
//   validatePermissions(["administrador", "profesor"]),
  materiaController.createMateria
);
router.get(
  "/profesor/materias/",
//   validatePermissions(["profesor", "administrador"]),
  materiaController.getProfesorMaterias
);
router.put(
  "/profesor/materias/:id",
//   validatePermissions(["profesor", "administrador"]),
  materiaController.updateProfesorMateria
);
router.delete(
  "/profesor/materias/:id",
//   validatePermissions(["profesor", "administrador"]),
  materiaController.deleProfesorMateria
);

module.exports = router;

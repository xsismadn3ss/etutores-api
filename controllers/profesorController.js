const { request, response } = require("express");
const { profesor } = require("../models");

async function getProfesores(req = request, res = response) {
  try {
    const profesores = await profesor.findAll({ where: { activo: true } });
    if (Profesores.lengeth === 0) {
      return res.status(404).json({ message: "No se encontro resultado" });
    }
    res.status(200).json(Profesores);
  } catch (error) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener las materias" });
  }
}

async function getProfesor(req = requeset, res = response) {
  try {
    const { id } = req.params;
    const profesor = await profesor.findOne({ where: { id, activo: true } });
    if (profesor) {
      res.status(200).json(profesor);
    } else {
      res.status(400).json({ message: "No se encontro resultado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener los profesores" });
  }
}

async function getProfesorSelf(req = request, res = response) {
  const { id } = req.user;
  try {
    const profesor = profesor.findOne({
      where: {
        id,
      },
    });
    if (!profesor) {
      return res.status(404).json({ message: "No tienes perfil de tutor" });
    }
    if (!profesor.activo) {
      return res
        .status(200)
        .json({ message: "El perfil de tutor esta deshabilitado" });
    }
    return res
      .status(200)
      .json({ message: "perfil encontrado", profesor: profesor });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Ocurrió un error al obtener los datos" });
  }
}

async function createProfesor(req = requeset, res = response) {
  const { titulo, especialidad, biografia } = req.body;
  const user = req.user;
  if (!titulo || !especialidad || !biografia) {
    return res.status(400).json({
      message: "Llena los campos requeridos",
      fields: ["titulo", "especialidad", "biografia"],
    });
  }
  try {
    const profesor = await profesor.create({
      titulo,
      especialidad,
      biografia,
      personaId: user.id,
    });
    res.status(201).json(profesor);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear la materia" });
  }
}

async function updateProfesores(req = request, res = response) {
  const { id } = req.user;
  const { titulo, especialidad, biografia } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ message: "Tu usuario no tiene un perfil de tutor" });
  }
  if (!titulo || !especialidad || !biografia) {
    return res.status(400).json({
      message: "Llena los campos requeridos",
      fields: ["titulo", "especialidad", "biografia"],
    });
  }
  try {
    const profesor = await profesor.findOne({ where: { id, activo: true } });
    if (profesor) {
      profesor.titulo = titulo;
      profesor.especialidad = especialidad;
      profesor.biografia = biografia;
      await profesor.save();
      res.status(200).json({ message: "perfil actualizado con exito" });
    } else {
      res.status(400).json({ message: "No se encontraron resultados" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actulizar profesores" });
  }
}

async function deleteProfesor(params) {
  const { id } = req.user;
  if (!id) {
    return res
      .status(400)
      .json({ message: "Tu usuario no tiene un perfil de tutor" });
  }
  try {
    const profesor = await profesor.findOne({
      where: {
        activo: true,
        id,
      },
    });
    if (!profesor) {
      return res.status(404).json({ message: "No se encontraron resultados" });
    }
    profesor.activo = false;
    profesor.save();
    return res
      .status(200)
      .json({ message: "Perfil de tutor eliminado con exito" });
  } catch (error) {
    return res.status(500).json({ message: "no se pudo eliminar" });
  }
}

module.exports = {
  getProfesor,
  getProfesores,
  getProfesorSelf,
  createProfesor,
  updateProfesores,
  deleteProfesor,
};

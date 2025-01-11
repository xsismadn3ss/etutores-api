const { request, response } = require("express");
const { profesor } = require("../models");

async function getProfesores(req = request, res = response) {
  try {
    const profesores = await profesor.findAll({ where: { activo: true } });
    if (profesores.lengeth === 0) {
      return res.status(404).json({ message: "No se encontro resultado" });
    }
    res.status(200).json(profesores);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las materias" });
  }
}

async function getProfesor(req = requeset, res = response) {
  try {
    const { id } = req.query;
    if (!id) {
      return res.redirect(301, "/api/profesores/all");
    }
    const p = await profesor.findOne({
      where: { personaId: id, activo: true },
    });
    if (p) {
      res.status(200).json(p);
    } else {
      res.status(400).json({ message: "No se encontraron resultados" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al buscar el profesor" });
  }
}

async function getProfesorSelf(req = request, res = response) {
  try {
    const { id } = req.user;
    const p = await profesor.findOne({
      where: { personaId: id },
    });
    if (!p) {
      return res
        .status(404)
        .json({ message: "Aun no tienes un perfil de tutor" });
    }
    if (!p.activo) {
      return res
        .status(200)
        .json({ message: "El perfil de tutor esta deshabilitado", data:p });
    }
    return res.status(200).json(p);
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
    const p = await profesor.create({
      titulo,
      especialidad,
      biografia,
      personaId: user.id,
    });
    res.status(201).json({ message: "creado con exito" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear el perfil de tutor" });
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

const { request, response } = require("express");
const { Materia, profesor, Persona } = require("../models/");

async function getMaterias(req = request, res = response) {
  try {
    const materias = await Materia.findAll({
      where: { activo: true },
      attributes: [
        "id",
        "nombre",
        "descripcion",
        "requisitos",
        "inversion",
        "inicia",
        "finaliza",
      ],
      include: [
        {
          model: profesor,
          as: "owner",
          attributes: ["id", "titulo", "especialidad", "biografia"],
          include: [
            {
              model: Persona,
              as: "persona",
              attributes: ["id", "nombres", "apellidos", "usuario", "email"],
            },
          ],
        },
      ],
    });
    if (materias.length === 0) {
      return res.status(404).json({ message: "No se encontraron resultados" });
    }
    res.status(200).json(materias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener las materias" });
  }
}

async function getMateria(req = request, res = response) {
  console.log(req.query);
  try {
    const { profesor, id } = req.query;
    if (!profesor && !id) {
      return res.redirect("/api/materias/all");
    }
    if (profesor) {
      return res.redirect(`/api/profesores?id=${profesor}`);
    } else {
      const materia = await Materia.findOne({ where: { id, activo: true } });
      if (materia) {
        res.status(200).json(materia);
      } else {
        res.status(404).json({ message: "No se encontraron resultados" });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener la materia" });
  }
}

async function createMateria(req = request, res = response) {
  console.log(req.user);
  const { profesor } = req.user;
  const { nombre, descripcion } = req.body;
  if (!profesor.id)
    return res
      .status(400)
      .json({ message: "Tu cuenta no tiene un perfil de tutor" });
  if (!nombre) {
    return res.status(400).json({
      message: "Rellena los cambios que son obligatorios",
      fields: ["nombre"],
    });
  }
  try {
    const materia = await Materia.create({
      nombre,
      descripcion,
      profesor: profesor.id,
    });
    res.status(201).json(materia);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear la materia" });
  }
}

async function updateMateria(req = request, res = response) {
  const { id } = req.params;
  const { nombre, descripcion, requisitos, inicia, finaliza, inversion } =
    req.body;
  if (!nombre) {
    return res.status(400).json({ message: "El campo nombre es obligatorio" });
  }
  try {
    const materia = await Materia.findOne({ where: { id, activo: true } });
    if (materia) {
      materia.nombre = nombre;
      nombre.descripcion = descripcion;
      nombre.requisitos = requisitos;
      nombre.inicia = inicia;
      nombre.finaliza = finaliza;
      nombre.inversion = inversion;
      await materia.save();
      res.status(200).json(materia);
    } else {
      res.status(404).json({ message: "No se encontraron resultados" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar la materia" });
  }
}

async function deleteMateria(req = request, res = response) {
  const { id } = req.params;
  try {
    const materia = await Materia.findOne({ where: { id, activo: true } });
    if (materia) {
      materia.activo = false;
      await materia.save();
      res.status(200).json({ message: "Materia eliminada" });
    } else {
      res.status(404).json({ message: "No se encontraron resultados" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar la materia" });
  }
}

async function getProfesorMaterias(req = request, res = response) {
  // obtener las materias ligadas a mi usuario
  const profesor = req.user.profesor;
  if (!profesor) {
    return res
      .status(500)
      .json({ message: "Tu cuenta no tiene un perfil de tutor" });
  }
  try {
    const materias = await Materia.findAll({
      where: {
        activo: true,
        profesor: profesor.id,
      },
    });
    if (!materias) {
      res.status(404).json({ message: "no se encontraron resultado" });
    }
    res.status(200).json(materias);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "ha ocurrido un error" });
  }
}

async function updateProfesorMateria(req = request, res = response) {
  const profesor = req.user.profesor;
  const { id } = req.params;
  const { nombre, descripcion, requisitos, inicia, finaliza, inversion } =
    req.body;
  if (!profesor) {
    return res
      .status(500)
      .json({ message: "Tu cuenta no tiene un perfil de tutor" });
  }
  try {
    const materia = await Materia.findOne({
      where: {
        activo: true,
        profesor: profesor.id,
        id: id,
      },
    });
    if (!materia) {
      return res.status(404).json({ message: "No se encontraron resultados" });
    }
    materia.nombre = nombre;
    materia.descripcion = descripcion;
    materia.requisitos = requisitos;
    materia.inicia = inicia;
    materia.finaliza = finaliza;
    await materia.save();
    return res
      .status(200)
      .json({ message: "materia actualizada con exito", result: materia });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "" });
  }
}

async function deleProfesorMateria(req = request, res = response) {
  const profesor = req.user.profesor;
  const { id } = req.params;
  if (!profesor) {
    return res
      .status(400)
      .json({ message: "Tu cuenta no tiene un perfil de tutor" });
  }
  try {
    const materia = await Materia.findOne({
      where: {
        id: id,
        profesor: profesor.id,
        activo: true,
      },
    });
    if (!materia) {
      return res
        .status(404)
        .json({ message: "esta materia ya esta eliminada" });
    }
    materia.activo = false;
    await materia.save();
    return res.status(200).json({ message: "materia eliminada" });
  } catch (error) {
    console.error(error);
    return res.json({ message: "no se pudo eliminar la materia" }).status(500);
  }
}

module.exports = {
  getMaterias,
  getMateria,
  createMateria,
  updateMateria,
  deleteMateria,
  getProfesorMaterias,
  updateProfesorMateria,
  deleProfesorMateria,
};

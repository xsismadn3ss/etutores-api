const { request, response } = require("express");
const {expreriencia, profesor} = require("../models/");

async function getExperiencias(req = request, res = response) {
  try {
    const experiencias = await expreriencia.findAll({
      where: {
        activo: true,
      },
    });
    if (experiencias.length === 0) {
      return res
        .status(404)
        .json({ message: "No se encontraron experiencias" });
    }
    res.status(200).json(experiencias);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener las experiencias" });
  }
}

async function getExperiencia(req = request, res = response) {
  try {
    const { id } = req.params;
    const experiencia = await expreriencia.findOne({
      where: {
        id,
        activo: true,
      },
    });
    if (!experiencia) {
      return res.status(404).json({ message: "No se encontró la experiencia" });
    }
    res.status(200).json(experiencia);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener la experiencia" });
  }
}

async function createExperiencia(req = request, res = response) {
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: "El campo nombre es obligatorio" });
  }

  try {
    const experiencia = await expreriencia.create({ nombre, descripcion });
    res.status(201).json(experiencia);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear la experiencia" });
  }
}

async function updateExperiencia(req = request, res = response) {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    return res.status(400).json({ message: "El campo nombre es obligatorio" });
  }

  try {
    const experiencia = await expreriencia.findOne({
      where: {
        id,
        activo: true,
      },
    });

    if (!experiencia) {
      return res.status(404).json({ message: "No se encontró la experiencia" });
    }

    experiencia.nombre = nombre;
    experiencia.descripcion = descripcion;
    await experiencia.save();

    res.status(200).json(experiencia);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar la experiencia" });
  }
}

async function deleteExperiencia(req = request, res = response) {
  const { id } = req.params;

  try {
    const experiencia = await expreriencia.findOne({
      where: {
        id,
        activo: true,
      },
    });

    if (!experiencia) {
      return res.status(404).json({ message: "No se encontró la experiencia" });
    }

    experiencia.activo = false;
    await experiencia.save();

    res.status(200).json({ message: "Experiencia eliminada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar la experiencia" });
  }
}

module.exports = {
  getExperiencias,
  getExperiencia,
  createExperiencia,
  updateExperiencia,
  deleteExperiencia,
};

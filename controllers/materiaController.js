const { request, response } = require("express");
// const sequelize = require("../config/dbConfig");
// const { DataTypes } = require("sequelize");
// const Materia = require("../models/materia")(sequelize, DataTypes);
const Materia = require("../models/")

async function getMaterias(req = request, res = response) {
  try {
    const materias = await Materia.findAll({ where: { activo: true } });
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
  try {
    const { id } = req.params;
    const materia = await Materia.findOne({ where: { id, activo: true } });
    if (materia) {
      res.status(200).json(materia);
    } else {
      res.status(404).json({ message: "No se encontraron resultados" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener la materia" });
  }
}

async function createMateria(req = request, res = response) {
  const { nombre, descripcion } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: "El campo nombre es obligatorio" });
  }
  try {
    const materia = await Materia.create({ nombre, descripcion });
    res.status(201).json(materia);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear la materia" });
  }
}

async function updateMateria(req = request, res = response) {
  const { id } = req.params;
  const { nombre, descripcion } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: "El campo nombre es obligatorio" });
  }
  try {
    const materia = await Materia.findOne({ where: { id, activo: true } });
    if (materia) {
      materia.nombre = nombre;
      materia.descripcion = descripcion;
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

module.exports = {
  getMaterias,
  getMateria,
  createMateria,
  updateMateria,
  deleteMateria,
};
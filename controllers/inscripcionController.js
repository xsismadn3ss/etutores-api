const { request, response } = require("express");
// const sequelize = require("../config/dbConfig");
// const { DataTypes } = require("sequelize");
// const Inscripcion = require("../models/inscripcion")(sequelize, DataTypes);
const Inscripcion = require("../models/")

async function getInscripciones(req = request, res = response) {
    try {
      const inscripciones = await Inscripcion.findAll({ where: { activo: true } });
      if (inscripciones.length === 0) {
        return res.status(404).json({ message: "No se encontraron resultados" });
      }
      res.status(200).json(inscripciones);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al obtener las inscripciones" });
    }
  }

  async function getInscripcion(req = request, res = response) {
    try {
      const { id } = req.params;
      const inscripcion = await Inscripcion.findOne({ where: { id, activo: true } });
      if (inscripcion) {
        res.status(200).json(inscripcion);
      } else {
        res.status(404).json({ message: "No se encontraron resultados" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al obtener la inscripción" });
    }
  }
  async function createInscripcion(req = request, res = response) {
    const { estudianteId, materiaId, fecha } = req.body;
    if (!estudianteId || !materiaId || !fecha) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    try {
      const inscripcion = await Inscripcion.create({ estudianteId, materiaId, fecha });
      res.status(201).json(inscripcion);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al crear la inscripción" });
    }
  }
  
  async function updateInscripcion(req = request, res = response) {
    const { id } = req.params;
    const { estudianteId, materiaId, fecha } = req.body;
    if (!estudianteId || !materiaId || !fecha) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    try {
      const inscripcion = await Inscripcion.findOne({ where: { id, activo: true } });
      if (inscripcion) {
        inscripcion.estudianteId = estudianteId;
        inscripcion.materiaId = materiaId;
        inscripcion.fecha = fecha;
        await inscripcion.save();
        res.status(200).json(inscripcion);
      } else {
        res.status(404).json({ message: "No se encontraron resultados" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al actualizar la inscripción" });
    }
  }

  async function deleteInscripcion(req = request, res = response) {
    const { id } = req.params;
    try {
      const inscripcion = await Inscripcion.findOne({ where: { id, activo: true } });
      if (inscripcion) {
        inscripcion.activo = false;
        await inscripcion.save();
        res.status(200).json({ message: "Inscripción eliminada" });
      } else {
        res.status(404).json({ message: "No se encontraron resultados" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al eliminar la inscripción" });
    }
  }
  
  module.exports = {
    getInscripciones,
    getInscripcion,
    createInscripcion,
    updateInscripcion,
    deleteInscripcion,
  };
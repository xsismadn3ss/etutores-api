const { request, response } = require("express");
const sequelize = require("../config/dbConfig");
const { DataTypes, where } = require("sequelize");
const Sexo = require("../models/sexo")(sequelize, DataTypes);

async function getSexos(req = request, res = response) {
  try {
    const sexos = await Sexo.findAll({
      where: {
        activo: true,
      },
    });
    if (sexos.length === 0) {
      return res.status(404).json({ message: "No se encontraron resultados" });
    } else {
      res.json(sexos).status(200);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener el listado de sexos" });
  }
}

async function getSexo(req = request, res = response) {
  try {
    const { id } = req.params;
    const sexo = await Sexo.findOne({
      where: {
        id,
        activo: true,
      },
    });
    if (sexo) {
      res.json(sexo).status(200);
    } else {
      res.status(404).json({ message: "No se encontraron resultados" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al obtener los datos" });
  }
}

async function createSexo(req = request, res = response) {
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: "El campo nombre es obligatorio" });
  }
  try {
    const sexo = await Sexo.create({ nombre });
    return res.json(sexo).status(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear el sexo" });
  }
}

async function updateSexo(req = request, res = response) {
  const { id } = req.params;
  const { nombre } = req.body;
  if (!nombre) {
    return res.status(400).json({ message: "El campo nombre es obligatorio" });
  }
  try {
    const sexo = await Sexo.findOne({
      where: {
        id,
        activo: true,
      },
    });
    if (sexo) {
      sexo.nombre = nombre;
      await sexo.save();
      return res.json(sexo).status(200);
    } else {
      return res.status(404).json({ message: "No se encontraron resultados" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar el sexo" });
  }
}

async function deleteSexo(req = request, res = response) {
  const { id } = req.params;
  try {
    const sexo = await Sexo.findOne({
      where: {
        id,
        activo: true,
      },
    });
    if (sexo) {
      sexo.activo = false;
      sexo.save();
      res.json({ message: "Sexo eliminado" }).status(200);
    } else {
      res.status(404).json({ message: "No se encontraron resultados" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar el sexo" });
  }
}

module.exports = {
  getSexos,
  getSexo,
  createSexo,
  updateSexo,
  deleteSexo,
};

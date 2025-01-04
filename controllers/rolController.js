const {request, response} = require("express");
const sequelize = require("../config/dbConfig");
const {DataTypes } = require("sequelize"); 
const Rol = require('../models/rol')(sequelize, DataTypes)

async function getRol(req = request, res = response) 
{
    try{
        const roles = await Rol.findAll({
            where:{
                activo: true,
            },
        });
        if(roles.length === 0){
            return res.status(404).json({message: "No se encontro resultados"});
        } else{
            res.json(roles).status(200);
        }
    } catch (err){
        console.error(err);
        res.status(500).json({message: "Error al obtener el listado de roles"});
    }
}

async function getRol(req = request, res = response) 
{
    try {
      const { id } = req.params;
      const rol = await Rol.findOne({
        where: {
          id,
          activo: true,
        },
      });
      if (rol) {
        res.json(rol).status(200);
      } else {
        res.status(404).json({ message: "No se encontraron resultados" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al obtener los datos del rol" });
    }
  }

  async function createRol(req = request, res = response) {
    const{ nombre} = req.body;
    if (!nombre){
        return res.status(400).json({message: "El campo nombre es obligatorio"});
    }
    try{
        const rol = await Rol.create({ nombre});
        return res.json(rol).status(201);
    } catch (err){
        console.error(err);
        res.status(500).json({message: "Error al crear el rol"});
    }
    
  }
  
  async function updateRol(req = request, res = response) {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: "El campo nombre es obligatorio" });
    }
    try {
      const rol = await Rol.findOne({
        where: {
          id,
          activo: true,
        },
      });
      if (rol) {
        rol.nombre = nombre;
        await rol.save();
        return res.json(rol).status(200);
      } else {
        return res.status(404).json({ message: "No se encontraron resultados" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al actualizar el rol" });
    }
  }
  
 
  async function deleteRol(req = request, res = response) {
    const { id } = req.params;
    try {
      const rol = await Rol.findOne({
        where: {
          id,
          activo: true,
        },
      });
      if (rol) {
        rol.activo = false;
        await rol.save();
        res.json({ message: "Rol eliminado" }).status(200);
      } else {
        res.status(404).json({ message: "No se encontraron resultados" });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error al eliminar el rol" });
    }
  }
  
  module.exports = {
    getRoles,
    getRol,
    createRol,
    updateRol,
    deleteRol,
  };



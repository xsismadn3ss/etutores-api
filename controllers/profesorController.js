const { request, response } = require('express');
const {profesor, experiencia} = require('../models')

async function getProfesores(req = request, res= response) {
    try {
        const profesores = await profesor.findAll({where: {activo: true}});
        if (Profesores.lengeth === 0){
            return res.status(404).json({message: "No se encontro resultado"})
        }
        res.status(200).json(Profesores)
    } catch (error) {
        console.error(err);
        res.status(500).json({message: "Error al obtener las materias"});
    }
}

async function getProfesor(req = requeset, res = response) {
    try{const {id} = req.params;
    const profesor = await Profesor.findOne({where:{id, activo: true}});
    if (profesor){
        res.status(200).json(profesor);
    } else {
        res.status(400).json({message:"No se encontro resultado"});
    }
} catch (err){
    console.error(err);
    res.status(500).json({message: "Error al obtener los profesores"});
 }
}

async function createProfesores(req = requeset, res= response) {
    const {titulo, especialidad, biografia} = req.body;
    if(!titulo){
        return res.status(400).json({message: "El campo titulo es obligatorio "})
    }
    try {
        const profesores = await Profesores.create({titulo,especialidad, biografia});
        res.status(201).json(profesores);
    } catch (err) {
        console.error(err);
        res.status(500).json({message:"Error al crear la materia"});
    }
    
}

async function updateProfesores(req = request, res = response) {
    const {id} = req.params;
    const {titulo, especialidad, biografia} = req.body;
    if(!titulo){
        return res.status(400).json({message:"El campo titulo es necesario"});
    } 
    try {
        const profesor = await Profesores.findOne({where:{id, activo: true}});
        if (profesor){
            profesor.titulo = titulo;
            profesor.especialidad = especialidad;
            profesor.biografia = biografia;
            await profesor.save();
            res.status(200).json(profesor);
        } else {
            res.status(400).json({message: "No se encontraron resultados"});
        }
    } catch (err){
        console.error(err);
        res.status(500).json({message: "Error al actulizar profesores"})
    }
    
}


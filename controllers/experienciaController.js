const { request, response } = require("express");
const { expreriencia } = require("../models/");
const experiencia = require("../models/experiencia");

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
  const { titulo, descripcion, lugar, fecha_final, fecha_inicio } = req.body;

  if (!titulo || !lugar || !fecha_inicio || !fecha_final || !descripcion)
    return res.status(400).json({
      message: "Los siguientes parametros son requeridos...",
      fields: ["titulo", "lugar", "descripcion", "fecha_inicio", "fecha_final"],
    });

  try {
    const experiencia = await expreriencia.create({
      titulo,
      descripcion,
      lugar,
      fecha_inicio,
      fecha_inicio,
    });
    res
      .status(201)
      .json({ message: "agregado con exito", experiencia: experiencia });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear la experiencia" });
  }
}

async function updateExperiencia(req = request, res = response) {
  const { id } = req.params;
  const { descripcion, fecha_inicio, fecha_final, titulo, lugar } = req.body;

  if (!titulo || !lugar || !fecha_inicio || !fecha_final || !descripcion)
    return res.status(400).json({
      message: "Los siguientes parametros son requeridos...",
      fields: ["titulo", "lugar", "descripcion", "fecha_inicio", "fecha_final"],
    });

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
    experiencia.titulo = titulo;
    experiencia.descripcion = descripcion;
    experiencia.lugar = lugar;
    experiencia.fecha_inicio = fecha_inicio;
    experiencia.fecha_inicio = fecha_final;
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

async function getProfesorExperience(req = request, res = response) {
  const profesor = req.user.profesor;
  if (!profesor)
    return res
      .status(400)
      .json({ message: "Tu usuario no tiene un perfil de tutor" });
  try {
    const experiencias = await experiencia.findAll({
      where: {
        activo: true,
        profesorId: profesor.id,
      },
    });
    if (!experiencias) {
      return res.status(404).json({ message: "No se encontraron resultados" });
    }
    return res.status(200).json(experiencias);
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ message: "No se pudo obtener los resultados" });
  }
}

async function createProfesorExperience(req = request, res = response) {
  const { profesor } = req.user;
  const { descripcion, fecha_inicio, fecha_final, titulo, lugar } = req.body;

  if (!titulo || !lugar || !fecha_inicio || !fecha_final || !descripcion)
    return res.status(400).json({
      message: "Los siguientes parametros son requeridos...",
      fields: ["titulo", "lugar", "descripcion", "fecha_inicio", "fecha_final"],
    });
  try {
    const experiencia = await experiencia.create({
      descripcion,
      fecha_inicio,
      fecha_final,
      titulo,
      lugar,
      profesorId: profesor.id,
    });
    experiencia.save();
    return res
      .status(201)
      .json({ message: "Creado con exito", experiencia: experiencia });
  } catch (error) {
    return res.status(500).json({ message: "No se pudo crear 😞" });
  }
}

async function updateProfesorExperience(req = request, res = response) {
  const profesor = req.user.profesor;
  const { id } = req.params.id;
  const { titulo, lugar, descripcion, fecha_inicio, fecha_final } = req.body;

  if (!titulo || !lugar || !fecha_inicio || !fecha_final || !descripcion)
    return res.status(400).json({
      message: "Los siguientes parametros son requeridos...",
      fields: ["titulo", "lugar", "descripcion", "fecha_inicio", "fecha_final"],
    });

  if (!profesor)
    return res
      .status(400)
      .json({ message: "Tu usuario no tiene un perfil de tutor" });
  try {
    const experiencia = await expreriencia.findOne({
      where: {
        activo: true,
        id: id,
        profesorId: profesor.id,
      },
    });
    if (!experiencia)
      return res
        .status(404)
        .json({ message: "El registro que deseas actualizar no existe" });
    experiencia.titulo = titulo;
    experiencia.descripcion = descripcion;
    experiencia.lugar = lugar;
    experiencia.fecha_inicio = fecha_inicio;
    experiencia.fecha_final = fecha_final;
  } catch (err) {
    return res
      .status(500)
      .json({ message: "no se pudo actualizar el registro" });
  }
}

async function deleteProfesorExperience(req = request, res = response) {
  const profesor = req.user.profesor;
  const { id } = req.params;
  try {
    const experiencia = await expreriencia.findOne({
      where: {
        activo: true,
        id,
        profesorId: profesor.id,
      },
    });
    if (!experiencia)
      return res
        .status(404)
        .json("El registro que quieres eliminar no existe o ya esta eliminado");
    experiencia.activo = false;
    experiencia.save();
    return res.status(200).json({ message: "Eliminado con exito" });
  } catch (error) {
    return res.status(500).json({ message: "No se pudo eliminar" });
  }
}

async function getExperienciaByProfesorId(req = request, res = response) {
  const { profesor } = req.query;
  try {
    const experiencias = await experiencia.findAll({
      where: {
        activo: true,
        profesorId: profesor,
      },
    });
    if (!experiencias)
      return res
        .status(404)
        .json({ message: "Este profesor no tiene experiencias agregadas" });
    return res.status(200).json(experiencias);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "No se pudo obtener la experiencia de este profesor" });
  }
}

module.exports = {
  getExperiencias,
  getExperiencia,
  createExperiencia,
  updateExperiencia,
  deleteExperiencia,
  getProfesorExperience,
  createProfesorExperience,
  updateProfesorExperience,
  deleteExperiencia,
  deleteProfesorExperience,
  getExperienciaByProfesorId
};

const { request, response } = require("express");
const { Inscripcion, Materia, Persona, profesor } = require("../models/");

// obtener el listado de todas las incripciones que existen en la base de datos
async function getInscripciones(req = request, res = response) {
  try {
    const inscripciones = await Inscripcion.findAll({
      where: {
        activo: true,
        include: [
          //incluir materia y personas a las que hace referencia la inscripcion
          {
            model: Materia,
            as: "materia_",
            attributes: [
              "id",
              "nombre",
              "descripcion",
              "requisitos",
              "inversion",
              "inicia",
              "finaliza",
              "profesor",
            ],
            include: [
              //incluir profesor que creo la materia
              {
                model: profesor,
                as: "owner",
                attributes: ["id", "titulo", "especialidad"],
                include: [
                  //incluir persona a la que hace referencia el perfil de tutor
                  {
                    model: Persona,
                    as: "persona",
                    attributes: [
                      "id",
                      "nombres",
                      "apellidos",
                      "usuario",
                      "email",
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: Persona,
            as: "inscrito_",
            attributes: ["id", "nombres", "apellidos", "usuario", "email"],
          },
        ],
      },
    });
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
    const inscripcion = await Inscripcion.findOne({
      where: {
        activo: true,
        id: id,
        include: [
          //incluir materia y personas a las que hace referencia la inscripcion
          {
            model: Materia,
            as: "materia_",
            attributes: [
              "id",
              "nombre",
              "descripcion",
              "requisitos",
              "inversion",
              "inicia",
              "finaliza",
              "profesor",
            ],
            include: [
              //incluir profesor que creo la materia
              {
                model: profesor,
                as: "owner",
                attributes: ["id", "titulo", "especialidad"],
                include: [
                  //incluir persona a la que hace referencia el perfil de tutor
                  {
                    model: Persona,
                    as: "persona",
                    attributes: [
                      "id",
                      "nombres",
                      "apellidos",
                      "usuario",
                      "email",
                    ],
                  },
                ],
              },
            ],
          },
          {
            model: Persona,
            as: "inscrito_",
            attributes: ["id", "nombres", "apellidos", "usuario", "email"],
          },
        ],
      },
    });
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
  const { id } = req.user;
  const { materia } = req.body;
  if (!materia || !id) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  try {
    const inscripcion = await Inscripcion.create({
      materia,
      persona: id,
    });
    res.status(201).json(inscripcion);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear la inscripción" });
  }
}

async function updateInscripcion(req = request, res = response) {
  const { id } = req.params;
  const persona = req.user.id;
  const { materia } = req.body;
  if (!materia || !id) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }
  try {
    const inscripcion = await Inscripcion.findOne({
      where: { id, activo: true, persona },
    });
    if (inscripcion) {
      inscripcion.persona = id;
      inscripcion.materia = materia;
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
  const persona = req.user.id;
  try {
    const inscripcion = await Inscripcion.findOne({
      where: { id, activo: true, persona },
    });
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

async function getMyInscripciones(req = request, res = response) {
  const { id } = req.user;
  try {
    const inscripciones = await Inscripcion.findAll({
      where: {
        activo: true,
        persona: id,
      },
      include: [
        {
          model: Materia,
          as: "materia_",
          attributes: [
            "id",
            "nombre",
            "descripcion",
            "requisitos",
            "inversion",
            "inicia",
            "finaliza",
          ],
        },
      ],
    });
    if (!inscripciones) {
      return res.status(404).json({ message: "No se encontraron resultados" });
    }
    return res.status(200).json({ inscripciones });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "error al obtener las inscripciones" });
  }
}

// obtener personas que estan inscritas a una materias
async function getInscritos(req = request, res = response) {
  const materia = req.params.id;
  try {
    const inscritos = await Inscripcion.findOne({
      where: {
        activo: true,
        materia: materia,
        include: [
          {
            model: Persona,
            as: "inscrito_",
            attributes: ["id", "nombres", "apellidos", "usuario", "email"],
          },
          {
            model: Materia,
            as: "materia_",
            attributes: [
              "nombre",
              "descripcion",
              "requisitos",
              "inversions",
              "inicia",
              "finaliza",
              "profesor",
            ],
          },
        ],
      },
    });
    if (!inscritos) {
      return res
        .status(404)
        .json({ message: "Aun no hay personas inscritas a este curso" });
    }
    return res.status(200).json(inscritos);
  } catch (error) {
    return res.status(500).json({ message: "Ha ocurrido un error" });
  }
}

module.exports = {
  getInscripciones,
  getInscripcion,
  createInscripcion,
  updateInscripcion,
  deleteInscripcion,
  getMyInscripciones,
  getInscritos,
};

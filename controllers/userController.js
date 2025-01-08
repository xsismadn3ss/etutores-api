const { request, response } = require("express");
// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/dbConfig");
const { Persona, Sexo, rol } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");

async function getUsers(req = request, res = response) {
  try {
    console.log(Persona.associations);
    const personas = await Persona.findAll({
      where: {
        activo: true,
      },
      attributes: [
        "id",
        "nombres",
        "apellidos",
        "usuario",
        "fechaNacimiento",
        "telefono",
        "email",
      ],
      include: [
        {
          model: Sexo,
          as: "sexos",
          attributes: ["nombre"],
        },
        {
          model: rol,
          as: "rol",
          attributes: ["nombre"],
        },
      ],
    });
    if (personas.length === 0) {
      return res.status(404).json({
        message: "Aún no hay cuentas creadas",
      });
    }
    return res.json(personas).status(200);
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Error al obtener los usuarios",
    });
  }
}

async function getUser(req = request, res = response) {
  try {
    const { id } = req.params;
    const persona = await Persona.findOne({
      where: {
        id,
        activo: true,
      },
      attributes: [
        "id",
        "nombres",
        "apellidos",
        "usuario",
        "fechaNacimiento",
        "telefono",
        "email",
      ],
      include: [
        {
          model: Sexo,
          as: "sexos",
          attributes: ["nombre"],
        },
        {
          model: rol,
          as: "rol",
          attributes: ["nombre"],
        },
      ],
    });
    if (persona) {
      return res.json(persona).status(200);
    }
    return res.status(404).json({
      message: "Esta cuenta no existe",
    });
  } catch (error) {
    return res
      .json({
        message: "Error al obtener los datos",
      })
      .status(500);
  }
}

async function profile(req = request, res = response) {
  const user = req.user
  try {
    const persona = await Persona.findOne({
      where:{
        id: user.id,
        activo: true,
      }
    })
    attributes: [
      "id",
      "nombres",
      "apellidos",
      "usuario",
      "fechaNacimiento",
      "telefono",
      "email"
    ]
    if (!persona){
      return res.status(404).json({message: "Tu cuenta ya no existe o esta inhabilitada"})
    }
    return res.status(200).json(persona).status(200)
  } catch (error) {
    console.error(error)
    return res.status(500).json({message: "Ha ocurrido un error"})
  }
}

async function createUser(req = request, res = response) {
  const {
    nombres,
    apellidos,
    usuario,
    fechaNacimiento,
    sexo,
    email,
    telefono,
    password,
  } = req.body;
  if (
    !nombres ||
    !apellidos ||
    !usuario ||
    !fechaNacimiento ||
    !email ||
    !password
  ) {
    return res.status(400).json({
      message: "Llena los campos obligatorios",
      fields: [
        "nombres",
        "apellidos",
        "usuario",
        "fechaNacimiento",
        "email",
        "password",
      ],
    });
  }
  try {
    const persona = await Persona.create({
      nombres,
      apellidos,
      usuario,
      fechaNacimiento,
      sexo,
      email,
      telefono,
      password: bcrypt.hashSync(password, 10),
    });
    persona.save();
    return res.json({ message: "Cuenta creada con exito" }).status(201);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al crear la cuenta" });
  }
}

async function updateUser(req = request, res = response) {
  const { id } = req.params;
  try {
    const user = await Persona.findOne({
      where: {
        id,
        activo: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "No se encontro el usuario" });
    }
    if ("password" in req.body) {
      req.body[password] = bcrypt.hashSync(password, 10);
    }
    user.set(req.body);
    user.save();
    res
      .json({ message: "Usuario actualizado con exito", user: user })
      .status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
}

async function deleteUser(req = request, res = response) {
  const { id } = req.params;
  try {
    const user = await Persona.findOne({
      where: {
        id,
        activo: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "No se encontro el usuario" });
    }
    user.activo = false;
    user.save();
    res.json({ message: "Usuario eliminado con exito" }).status(200);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al eliminar el usuario" });
  }
}

async function login(req = request, res = response) {
  const { usuario, password } = req.body;
  if (!usuario || !password) {
    return res.status(400).json({
      message: "Usuario y contraseña son obligatorios",
      fields: ["usuario", "password"],
    });
  }
  try {
    const user = await Persona.findOne({
      where: {
        id,
        activo: true,
      },
      include: [
        {
          model: Sexo,
          as: "sexos",
          attributes: ["nombre"],
        },
        {
          model: rol,
          as: "rol",
          attributes: ["nombre"],
        },
      ],
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const checkPassword = bcrypt.compareSync(password, user.password);
    if (checkPassword) {
      const responsePayload = {
        id: user.id,
        usuario: user.usuario,
        nombre: `${user.nombres} ${user.apellidos}`,
        email: user.email,
        telefono: user.telefono,
        rol: user.rol.nombre,
      };

      const accessToken = jwt.generateToken(responsePayload);
      res.cookie("accesstoken", accessToken, {
        maxAge: 64800,
        httpOnly: true,
        path: "/api",
      });
      return res.json({ message: "has iniciado sesión con exito" }).status(200);
    }
    return res.json({ message: "contraseña incorrecta" }).status(401);
  } catch (err) {
    console.error(err);
    res.json({ message: "No se pudo iniciar sesión" }).status(500);
  }
}

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  profile
};

const { request, response } = require("express");
const { DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Persona = require("../models/persona")(sequelize, DataTypes);
const Sexo = require("../models/sexo")(sequelize, DataTypes);
const Rol = require("../models/sexo")(sequelize, DataTypes);
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");

async function getUsers(req = request, res = response) {
  try {
    const personas = await Persona.findAll({
      where: {
        activo: true,
      },
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
      fields: ["nombres", "apellidos", "usuario", "fechaNacimiento", "email"],
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

async function updateuser(req = request, res = response) {
  const { id } = req.params;
  const {
    nombres,
    apellidos,
    usuario,
    fechaNacimiento,
    sexo,
    telefono,
    password,
    email,
  } = req.body;
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
    user
      .set({
        nombres,
        apellidos,
        usuario,
        fechaNacimiento,
        sexo,
        telefono,
        email,
        password: bcrypt.hashSync(password, 10),
      })
      .save();
    res.json({ message: "Usuario actualizado con exito" }).status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el usuario" });
  }
}

async function deleteuser(req = request, res = response) {
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
        usuario,
        activo: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const hashed_password = bcrypt.hashSync(password, 10);
    if (hashed_password === password) {
      const responsePayload = {
        id: user.id,
        usuario: user.usuario,
        nombre: `${user.nombres} ${user.apellidos}`,
      };

      if (user.sexo) {
        const sexo = await Sexo.findOne({
          where: {
            id: user.sexo,
            activo: true,
          },
        });
        responsePayload.sexo = sexo;
      }
      if (user.rol) {
        const rol = await Rol.findOne({
          where: {
            id: user.rol,
            activo: true,
          },
        });
        responsePayload.rol = rol
      }

      const accessToken = jwt.generateToken(responsePayload);
      res.cookie("accessToke", accessToken, {
        maxAge: 64800,
        httpOnly: true,
        path: "/api",
      });
      return res.json(responsePayload).status(200);
    }
  } catch (err) {
    console.error(err);
    res.json({ message: "No se pudo iniciar sesión" }).status(500);
  }
}
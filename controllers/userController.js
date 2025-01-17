const { request, response } = require("express");
const { Persona, Sexo, rol, profesor, experiencia } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");

async function getUsers(req = request, res = response) {
  try {
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
          as: "genero",
          attributes: ["id","nombre"],
        },
        {
          model: rol,
          as: "rol",
          attributes: ["id","nombre"],
        },
        {
          model: profesor,
          as: "profesor",
          attributes: ["id","titulo", "especialidad", "biografia"],
          include:[
            {
              model: experiencia,
              as: "experiencias",
              attributes: [
                "id","titulo", "lugar", "descripcion"
              ]
            }
          ]
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
          as: "genero",
          attributes: ["nombre"],
        },
        {
          model: rol,
          as: "rol",
          attributes: ["nombre"],
        },
        {
          model: profesor,
          as: "profesor",
          attributes: ["titulo", "especialidad", "biografia"],
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
    console.log(error);
    return res
      .json({
        message: "Error al obtener los datos",
      })
      .status(500);
  }
}

async function profile(req = request, res = response) {
  const id = req.user.id;
  try {
    return res.redirect(301, `/api/users/${id}`);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Ha ocurrido un error" });
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
    const user = await Persona.create({
      nombres,
      apellidos,
      usuario,
      fechaNacimiento,
      sexo,
      email,
      telefono,
      password: bcrypt.hashSync(password, 10),
    });
    user.save();
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
        usuario,
        activo: true,
      },
      include: [
        {
          model: Sexo,
          as: "genero",
        },
        {
          model: rol,
          as: "rol",
        },
        {
          model: profesor,
          as: "profesor",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    const responsePayload = {
      id: user.id,
      usuario: user.usuario,
      nombre: `${user.nombres} ${user.apellidos}`,
      email: user.email,
      telefono: user.telefono,
      rol: user.rol ? user.rol.nombre : "sin permisos",
      profesor: user.profesor ? user.profesor : null,
    };

    const accessToken = jwt.generateToken(responsePayload);
    res.cookie("access-token", accessToken, {
      maxAge: 64800,
      httpOnly: true,
      path: "/",
    });
    res.setHeader("access-token", accessToken);

    return res.status(200).json({ message: "Has iniciado sesión con éxito" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "No se pudo iniciar sesión" });
  }
}

async function updateProfile(req = request, res = response) {
  const id = req.user.id;
  try {
    const user = await Persona.findOne({
      where: {
        id,
        activo: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "No se encontró la cuenta" });
    }
    if ("password" in req.body) {
      req.body[password] = bcrypt.hashSync(password, 10);
    }
    user.set(req.body);
    user.save();
    res
      .json({ message: "Perfil actualizado con exito", user: user })
      .status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el perfil" });
  }
}

async function deleteAccount(req = request, res = response) {
  const id = req.user.id;
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

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  login,
  profile,
  updateProfile,
  deleteAccount,
};

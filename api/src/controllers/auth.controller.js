import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";
// import { SECRET } from "../config.js";
import { SECRET } from "../global.js";
//const config = require('../global.js');
//import secret from '../global.js';

export const signupHandler = async (req, res) => {
  try {
    const { nombres,apellidos,username, email,dni,celular, password, roles } = req.body;

    // Creating a new User Object
    const newUser = new User({
      nombres,
      apellidos,
      username,
      email,
      dni,
      celular,
      password,
    });

    // checking for roles
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "user" });
      newUser.roles = [role._id];
    }

    // Saving the User Object in Mongodb
    const savedUser = await newUser.save();

    // Create a token
    const token = jwt.sign({ id: savedUser._id }, SECRET, {
      expiresIn: 86400, // 24 hours
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

export const signinHandler = async (req, res) => {
  try {
    // Request body email can be an email or username
    const userFound = await User.findOne({ email: req.body.email }).populate(
      "roles"
    );

    if (!userFound) return res.status(400).json({ message: "User Not Found" });

    const matchPassword = await User.comparePassword(
      req.body.password,
      userFound.password
    );

    if (!matchPassword)
      return res.status(401).json({
        token: null,
        message: "Invalid Password",
      });

    const token = jwt.sign({ id: userFound._id }, SECRET, {
      expiresIn: 86400, // 24 hours
    });


    // res.json({ token });

    const userData = {
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      roles: userFound.roles.map(role => role.name) // Suponiendo que el nombre del rol está en la propiedad "name"
    };

    res.json({
      token,
      user: userData // Enviar los datos del usuario junto con el token
    });

  } catch (error) {
    console.log(error);
  }
};

// En algún lugar de tu código, podrías tener una función para agregar tokens a la lista negra
const addToBlacklist = (token) => {
  // Aquí deberías guardar el token en tu almacenamiento persistente (base de datos, cache, etc.)
};

// En tu controlador de "logout"
export const logoutHandler = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(400).json({ message: "Authorization header missing" });
    }

    const token = req.headers.authorization.split(" ")[1]; // Obtener el token del encabezado

    // Aquí podrías agregar el token a la lista negra
    addToBlacklist(token);

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};


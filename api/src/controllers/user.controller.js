import User from "../models/User.js";
import Role from "../models/Role.js";
import mongoose from 'mongoose';
export const createUser = async (req, res) => {
  try {
    const {nombres,apellidos,username,
       email,dni,celular, password, roles } = req.body;

    const rolesFound = await Role.find({ name: { $in: roles } });

    // creating a new User
    const user = new User({
      nombres,
      apellidos,
      username,
      email,
      dni,
      celular,
      password,
      roles: rolesFound.map((role) => role._id),
    });

    // encrypting password
    user.password = await User.encryptPassword(user.password);

    // saving the new user
    const savedUser = await user.save();

    return res.status(200).json({
      _id: savedUser._id,
      nombres:savedUser.nombres,
      apellidos:savedUser.apellidoss,
      username: savedUser.username,
      email: savedUser.email,
      dni:savedUser.dni,
      celular:savedUser.celular,
      roles: savedUser.roles,

    });
  } catch (error) {
    console.error(error);
  }
};

export const getUsers = async (req, res) => {
  const users = await User.find();
  return res.json(users);
};

export const getUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const isValidObjectId = mongoose.Types.ObjectId.isValid(userId);

    if (!isValidObjectId) {
      return res.status(400).json({ message: 'Invalid user ID' });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

export const checkEmail = async (req, res) => {
  try {
    const { email } = req.params;

    // Verificar si el correo existe en la base de datos
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({ message: 'El correo electrónico ya está en uso' });
    } else {
      return res.status(200).json({ message: 'El correo electrónico está disponible' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error en el servidor' });
  }
};


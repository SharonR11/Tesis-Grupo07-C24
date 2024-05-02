import Cuarto from "../models/Cuarto.js";
import Servicio from "../models/Servicio.js";
import fs from 'fs';
export const createCuarto = async (req, res) => {
  console.log(req.body);
  const { nombre,
    precio,
    descripcion,
    direccion,
    fotos,
    ubicacion,
    disponibilidad,
    servicios } = req.body;
    const userId = req.userId;

  try {
    let limitedFotos = fotos.slice(0, 5);
    const newCuarto = new Cuarto({
      nombre,
      precio,
      descripcion,
      direccion,
      fotos: limitedFotos,
      ubicacion,
      disponibilidad,
      usuario: userId,
    });
    if (servicios) {
        const foundServicios = await Servicio.find({ nombre: { $in: servicios } });
        newCuarto.servicios = foundServicios.map((servicio) => servicio._id);
      } else {
        const servicio = await Servicio.findOne({ nombre: "luz" });
        newCuarto.servicios = [servicio._id];
    }

    const cuartoSaved = await newCuarto.save();

    res.status(201).json(cuartoSaved);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};



export const getCuartos = async (req, res) => {
  const cuartos = await Cuarto.find();
  return res.json(cuartos);
};

// 88888
export const getCuartoPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const cuarto = await Cuarto.findById(id);
    if (!cuarto) {
      return res.status(404).json({ message: "Cuarto no encontrado" });
    }
    return res.json(cuarto);
  } catch (error) {
    console.error("Error al obtener el cuarto por ID:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

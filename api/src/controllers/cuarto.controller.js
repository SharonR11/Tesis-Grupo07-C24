import Cuarto from "../models/Cuarto.js";
import Servicio from "../models/Servicio.js";

export const createCuarto = async (req, res) => {
  const { nombre,
    precio,
    descripcion,
    direccion,
    foto,
    ubicacion,
    disponibilidad,
    servicios } = req.body;
    const userId = req.userId;

  try {
    const newCuarto = new Cuarto({
      nombre,
      precio,
      descripcion,
      direccion,
      foto,
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

// export const getProductById = async (req, res) => {
//   const { productId } = req.params;

//   const product = await Product.findById(productId);
//   res.status(200).json(product);
// };

export const getCuartos = async (req, res) => {
  const cuartos = await Cuarto.find();
  return res.json(cuartos);
};

// export const updateProductById = async (req, res) => {
//   const updatedProduct = await Product.findByIdAndUpdate(
//     req.params.productId,
//     req.body,
//     {
//       new: true,
//     }
//   );
//   res.status(204).json(updatedProduct);
// };

// export const deleteProductById = async (req, res) => {
//   const { productId } = req.params;

//   await Product.findByIdAndDelete(productId);

//   // code 200 is ok too
//   res.status(204).json();
// };

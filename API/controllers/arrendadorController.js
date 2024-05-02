
const db = require('../models')
const Usuario = db.usuarios;


const buscarPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const arrendador = await Usuario.findByPk(id);
      if (!arrendador) {
        return res.status(404).json({ mensaje: 'Arrendador no encontrado' });
      }
      return res.json(arrendador);
    } catch (error) {
      console.error('Error al buscar arrendador por ID:', error);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
  };
  
module.exports = { buscarPorId };





// export const createArrendador = async (req, res) => {
//     // Lógica para crear un nuevo arrendador
// };

// export const updateArrendador = async (req, res) => {
//     // Lógica para actualizar un arrendador existente
// };
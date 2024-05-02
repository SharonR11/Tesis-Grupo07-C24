const db = require('../models');
const Usuario = db.usuarios;

// Listar usuarios arrendadores
const listarArrendadores = async (req, res) => {
    try {
        const arrendadores = await Usuario.findAll({ where: { RolID: 2 } });
        res.status(200).json(arrendadores);
    } catch (error) {
        console.error('Error al listar arrendadores:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Listar usuarios estudiantes
const listarEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Usuario.findAll({ where: { RolID: 3 } });
        res.status(200).json(estudiantes);
    } catch (error) {
        console.error('Error al listar estudiantes:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// Listar usuarios arrendadores y estudiantes
const listarArrendadoresEstudiantes = async (req, res) => {
    try {
        const usuarios = await Usuario.findAll({ where: { RolID: [2, 3] } });
        res.status(200).json(usuarios);
    } catch (error) {
        console.error('Error al listar arrendadores y estudiantes:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = {
    listarArrendadores,
    listarEstudiantes,
    listarArrendadoresEstudiantes
};

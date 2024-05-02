const db = require('../models')

// image Upload
const multer = require('multer')
const path = require('path')
const Role = db.roles

// Controlador para obtener todos los roles
const getAllRoles = async (req, res) => {
    try {
        let roles = await Role.findAll({})
        res.status(200).send(roles)
    } catch (error) {
        console.error('Error al obtener todos los roles:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};

module.exports = {
    getAllRoles
};
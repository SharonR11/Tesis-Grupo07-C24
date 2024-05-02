const jwt = require('jsonwebtoken');
const db = require('../models')
const Usuario = db.usuarios;

const authMiddleware = async (req, res, next) => {
    try {
        // Extraer el token del encabezado de autorización
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
        }

        const token = authorizationHeader.split(' ')[1];

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decodificado:', decoded); // Agregar este console.log()

        if (!decoded || !decoded.usuarioID) {
            return res.status(401).json({ message: 'Acceso no autorizado. Token inválido.' });
        }

        // Verificar si el usuario existe en la base de datos
        const usuario = await Usuario.findByPk(decoded.usuarioID);
    if (!usuario) {
        return res.status(401).json({ message: 'Acceso no autorizado. Usuario no encontrado.' });
    }

        // Adjuntar el usuario al objeto de solicitud para su uso posterior
        req.usuario = usuario;
        next(); // Permitir que la solicitud continúe
    } catch (error) {
        console.error('Error de autenticación:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

// module.exports = authMiddleware;
module.exports = {
    authMiddleware
};

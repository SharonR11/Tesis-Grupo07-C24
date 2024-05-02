// middleware.js

const jwt = require('jsonwebtoken');
require('dotenv').config();

const verificarToken = (req, res, next) => {
    // Obtener el token de la cabecera de autorización
    const tokenValue = req.headers.authorization.split(' ')[1];

    console.log(process.env.JWT_SECRET);
    console.log('Token recibido:', tokenValue);
    console.log('Cabecera de autorización:', req.headers.authorization);
    if (!tokenValue) {
        return res.status(401).json({ message: 'Acceso no autorizado. Debes iniciar sesión para acceder a esta ruta.' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET); // El segundo elemento después del espacio es el token JWT

        // Establecer el usuario decodificado en el objeto de solicitud
        req.user = decoded;

        // Pasar al siguiente middleware
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error);
        return res.status(401).json({ message: 'Token inválido. Debes iniciar sesión para acceder a esta ruta.' });
    }
};

module.exports = { verificarToken };

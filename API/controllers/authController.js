const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../models')
const Usuario = db.usuarios;
const { validationResult } = require('express-validator');
const { generarYEnviarCodigoVerificacion } = require('./verificacionController'); // Importa la función de generación y envío de código de verificación

// Función para registrar arrendador
const signupArrendador = async (req, res) => {
    try {
        const {
            Nombres,
            Apellidos,
            DNI,
            Correo,
            Telefono,
            Direccion,
            Password,
            ContratoArrendamiento,
            DocumentacionLegal
        } = req.body;

        // Validación de entradas
        if (!Nombres || !Apellidos || !DNI || !Correo || !Telefono || !Direccion || !Password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });
        }
        // Validación de correo electrónico
        if (!/^[^\s@]+@gmail\.com$/.test(Correo)) {
            return res.status(400).json({ message: 'El correo electrónico debe ser de dominio @gmail.com.' });
        }
        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Crear nuevo arrendador
        const nuevoArrendador = await Usuario.create({
            Nombres,
            Apellidos,
            DNI,
            Correo,
            Telefono,
            Direccion,
            Password: hashedPassword, 
            RolID: 2, 
            ContratoArrendamiento,
            DocumentacionLegal,
            EstadoSesion: false, 
            CorreoVerificado: false, //vvv
            Estado: true
        });
        // Generar y enviar código de verificación
        await generarYEnviarCodigoVerificacion(nuevoArrendador.UsuarioID, nuevoArrendador.Correo);

        // Generar token JWT
        const token = jwt.sign({ usuarioID: nuevoArrendador.UsuarioID }, process.env.JWT_SECRET);

        res.status(201).json({ message: 'Arrendador registrado exitosamente.', usuario: nuevoArrendador, token });
    } catch (error) {
        console.error('Error al registrar arrendador:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const signupEstudiante = async (req, res) => {
    try {
        const {
            Nombres,
            Apellidos,
            DNI,
            Correo,
            Telefono,
            Direccion,
            Password
        } = req.body;

        // Validación de entradas
        if (!Nombres || !Apellidos || !DNI || !Correo || !Telefono || !Direccion || !Password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos.' });
        }

        if (!/^[\w-]+(\.[\w-]+)*@tecsup\.edu\.pe$/.test(Correo)) {
            return res.status(400).json({ message: 'El correo electrónico debe ser de dominio institucional.' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(Password, 10);

        // Crear nuevo estudiante
        const nuevoEstudiante = await Usuario.create({
            Nombres,
            Apellidos,
            DNI,
            Correo,
            Telefono,
            Direccion,
            Password: hashedPassword, 
            RolID: 3, 
            EstadoSesion: false, 
            CorreoVerificado: true, 
            Estado: true
        });
        // Generar y enviar código de verificación
        await generarYEnviarCodigoVerificacion(nuevoEstudiante.UsuarioID, nuevoEstudiante.Correo);

        // Generar token JWT
        const token = jwt.sign({ usuarioID: nuevoEstudiante.UsuarioID }, process.env.JWT_SECRET);

        res.status(201).json({ message: 'Estudiante registrado exitosamente.', usuario: nuevoEstudiante, token });
    } catch (error) {
        console.error('Error al registrar estudiante:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        // Buscar al usuario por su correo electrónico
        const user = await Usuario.findOne({ where: { Correo: email } });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Verificar si el usuario tiene el correo verificado
        if (!user.CorreoVerificado) {
            return res.status(400).json({ message: 'Correo no verificado. Verifica tu correo electrónico para poder iniciar sesión.' });
        }

        // Verificar la contraseña
        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        // Actualizar el campo EstadoSesion a true
        await user.update({ EstadoSesion: true });

        // Generar token de acceso
        const token = jwt.sign({ usuarioID: user.UsuarioID }, process.env.JWT_SECRET);

        res.json({ token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
const logout = async (req, res) => {
    try {
        // Verificar si se proporciona un token en el encabezado de autorización
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Acceso no autorizado. Token no proporcionado.' });
        }

        // Extraer el token del encabezado de autorización
        const token = authorizationHeader.split(' ')[1];

        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Token decodificado:', decoded);

        // Verificar si el token es válido
        if (!decoded || !decoded.usuarioID) {
            return res.status(401).json({ message: 'Acceso no autorizado. Token inválido.' });
        }

        // Buscar al usuario por su ID
        const user = await Usuario.findByPk(decoded.usuarioID);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar el campo EstadoSesion a false
        await user.update({ EstadoSesion: false });

        res.json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};


// const logout = async (req, res) => {
//     try {
//         // Obtener el usuario desde el token de autenticación
//         const usuarioID = req.usuario.usuarioID; // Corregir la extracción de usuarioID

//         // Buscar al usuario por su ID
//         const user = await Usuario.findByPk(usuarioID);
//         if (!user) {
//             return res.status(404).json({ message: 'Usuario no encontrado' });
//         }

//         // Actualizar el campo EstadoSesion a false
//         await user.update({ EstadoSesion: false });

//         res.json({ message: 'Sesión cerrada exitosamente' });
//     } catch (error) {
//         console.error(error.message);
//         res.status(500).json({ message: 'Error interno del servidor' });
//     }
// };


// Función para verificar la validez de un token
const verifyToken = async (req, res) => {
    // Lógica para verificar el token
};

// Función para actualizar el perfil del usuario
const updateProfile = async (req, res) => {
    // Lógica para actualizar el perfil del usuario
};

// Función para eliminar la cuenta de un usuario
const deleteAccount = async (req, res) => {
    // Lógica para eliminar la cuenta del usuario
};

// Función para solicitar un restablecimiento de contraseña
const forgotPassword = async (req, res) => {
    // Lógica para solicitar un restablecimiento de contraseña
};



module.exports = {
    verifyToken,
    updateProfile,
    deleteAccount,
    forgotPassword,
    login,
    logout,
    signupArrendador,
    signupEstudiante
};

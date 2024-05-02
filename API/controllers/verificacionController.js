const nodemailer = require('nodemailer');
const db = require('../models')
const VerificacionCorreo = db.verificacioncorreos;
const Usuario = db.usuarios;
const { Op } = require('sequelize');
const {buscarPorId  } = require('../controllers/arrendadorController');

// Función para generar un código de verificación de 6 dígitos
const generarCodigoVerificacion = () => {
    return Math.floor(100000 + Math.random() * 900000); // Genera un código de 6 dígitos
};

// Función para enviar un correo electrónico con el código de verificación
const enviarCorreoVerificacion = async (correoDestino, codigoVerificacion) => {
    try {
        

        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Error al enviar el correo electrónico de verificación:', error);
        throw error;
    }
};

// Función para generar y enviar un código de verificación
const generarYEnviarCodigoVerificacion = async (usuarioID, correoDestino) => {
    try {
        const codigoVerificacion = generarCodigoVerificacion();

        // Guarda el código de verificación en la base de datos
        await VerificacionCorreo.create({
            UsuarioID: usuarioID,
            Token: codigoVerificacion,
            FechaCreacion: new Date(),
            FechaExpiracion: new Date(Date.now() + 30 * 60000), // El código expira en 10 minutos
            EstadoToken: 'Pendiente',
            TipoToken: 'VerificacionCorreo'
        });

        // Envía el código de verificación por correo electrónico
        await enviarCorreoVerificacion(correoDestino, codigoVerificacion);

        return codigoVerificacion;
    } catch (error) {
        console.error('Error al generar y enviar el código de verificación:', error);
        throw error;
    }
};

// Función para verificar el código de verificación ingresado por el usuario
const verificarCodigoVerificacion = async (req, res) => {
    const { usuarioID, codigoVerificacion } = req.body; 
    try {
        //console.log("Verificando código de verificación para el usuario:", usuarioID);
        //console.log("Código de verificación a verificar:", codigoVerificacion);
        if (typeof usuarioID !== 'string') {
            throw new Error('El usuarioID debe ser un string.');
        }
        // Convertir codigoVerificacion a cadena de texto si no lo es
        if (typeof codigoVerificacion !== 'string') {
            codigoVerificacion = codigoVerificacion.toString();
            console.log("Código de verificación convertido a cadena de texto:", codigoVerificacion);
        }

        // Busca el código de verificación en la base de datos
        const token = await VerificacionCorreo.findOne({
            where: {
                UsuarioID: usuarioID,
                Token: codigoVerificacion,
                EstadoToken: 'Pendiente',
                TipoToken: 'VerificacionCorreo',
                FechaExpiracion: { [Op.gt]: new Date() } 
            }
        });

        if (token) {
            // Marca el token como utilizado
            await token.update({ EstadoToken: 'Utilizado' });

            // Actualiza el campo CorreoVerificado del usuario arrendador
            const usuario = await Usuario.findByPk(usuarioID);
            if (usuario) {
                await usuario.update({ CorreoVerificado: true });
            }
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error al verificar el código de verificación:', error);
        res.status(500).json({ error: 'Error al verificar el código de verificación' });
    }
};


module.exports = {
    generarYEnviarCodigoVerificacion,
    verificarCodigoVerificacion
};

export const createEstudiante = async (req, res) => {
    try {
        const { Nombres, Apellidos, DNI, Correo, Telefono, Password } = req.body;

        // Fecha de creación del estudiante
        const fechaCreacion = new Date();

        // Generar el token
        const tokenGenerado = generateToken(); // Función para generar token

        // Insertar el nuevo estudiante
        const nuevoUsuario = await Usuario.create({
            Nombres,
            Apellidos,
            DNI,
            Correo,
            Telefono,
            Password,
            RolID: 3, // ID de estudiante
            FechaCreacion: fechaCreacion,
            UltimaActividad: fechaCreacion,
            EstadoSesion: 0,
            CorreoVerificado: 0,
            Estado: 1
        });

        // Obtener el ID del estudiante insertado
        const usuarioID = nuevoUsuario.UsuarioID;

        // Insertar el token en la tabla VerificacionCorreo
        await VerificacionCorreo.create({
            UsuarioID: usuarioID,
            Token: tokenGenerado,
            FechaCreacion: fechaCreacion,
            FechaExpiracion: new Date(fechaCreacion.getTime() + 1 * 24 * 60 * 60 * 1000), // Agregar 1 día a la fecha de creación
            TipoToken: 'VerificacionCorreo',
            AsuntoCorreo: 'Verificación de correo electrónico',
            ContenidoCorreo: 'Por favor, haga clic en el siguiente enlace para verificar su correo electrónico.'
        });

        // Devolver el UsuarioID y el Token generados
        res.status(201).json({ UsuarioID: usuarioID, Token: tokenGenerado });
    } catch (error) {
        console.error('Error al crear el estudiante:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
};
const generateToken = () => {
    // Implementa tu lógica para generar un token único aquí (por ejemplo, UUID)
    return 'token_generado'; // Ejemplo de token generado
};

export const updateEstudiante = async (req, res) => {
    // Lógica para actualizar un estudiante existente
};
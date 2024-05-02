const db = require('../models');
const Cuarto = db.cuartos;
const Usuario = db.usuarios;
const CuartoServicios = db.cuartoservicio;

let cuartoCreado; // Declarar la variable cuartoCreado fuera de la función

const registrarCuarto = async (req, res) => {
    try {
        console.log('Ingresando al controlador registrarCuarto');
        console.log('req.user:', req.user);
        // Verificar si el usuario está autenticado y obtener su ID
        const usuarioID = req.user ? req.user.usuarioID : null;

        if (!usuarioID) {
            return res.status(401).json({ message: 'Acceso no autorizado. Debes iniciar sesión para registrar un cuarto.' });
        }

        // Verificar si el usuario es arrendador (RolID = 2) y tiene sesión activa
        const usuario = await Usuario.findOne({ where: { UsuarioID: usuarioID, RolID: 2, EstadoSesion: true } });
        if (!usuario) {
            return res.status(401).json({ message: 'Acceso no autorizado. Solo los arrendadores con sesión activa pueden registrar cuartos.' });
        }

        // Obtener los datos del cuarto desde el cuerpo de la solicitud
        const { Titulo, Descripcion, Direccion, Precio, Baño, ServicioID, InstitucionID, DistritoID } = req.body;

        // Verificar si se proporcionaron todos los campos necesarios
        if (!Titulo || !Descripcion || !Direccion || !Precio || !Baño || !ServicioID || !InstitucionID || !DistritoID) {
            return res.status(400).json({ message: 'Todos los campos son requeridos para registrar un cuarto.' });
        }

        // Verificar que el usuario haya ingresado hasta 5 servicios
        if (!Array.isArray(ServicioID) || ServicioID.length > 5) {
            return res.status(400).json({ message: 'Puedes seleccionar hasta 5 servicios.' });
        }

        // Verificar que los servicios ingresados sean válidos (1, 2, 3, 4, 5)
        const serviciosValidos = ServicioID.every(id => [1, 2, 3, 4, 5].includes(id));
        if (!serviciosValidos) {
            return res.status(400).json({ message: 'Los servicios deben ser números enteros del 1 al 5.' });
        }
        
        // Crear el cuarto con el ID del usuario autenticado
        const fechaCreacion = new Date();
        cuartoCreado = await Cuarto.create({
            UsuarioID: usuarioID, // ID del usuario que inició sesión
            Titulo,
            Descripcion,
            Direccion,
            Precio,
            Baño,
            InstitucionID,
            DistritoID,
            Visible: true,
            FechaCreacion: fechaCreacion
        });

        // Asociar los servicios al cuarto
        if (cuartoCreado && cuartoCreado.CuartoID) {
            // Asociar los servicios al cuarto
            if (Array.isArray(ServicioID) && ServicioID.length > 0) {
                for (const servicioID of ServicioID) {
                    await CuartoServicios.create({
                        CuartoID: cuartoCreado.CuartoID,
                        ServicioID: servicioID
                    });
                }
            }
        } else {
            // Manejar el caso donde cuartoCreado no está definido o no tiene CuartoID
            console.error('Error al obtener el ID del cuarto creado.');
            return res.status(500).json({ message: 'Error interno del servidor al obtener el ID del cuarto creado.' });
        }
        
        res.status(201).json({ message: 'Cuarto registrado exitosamente.' });
    } catch (error) {
        console.error('Error al registrar el cuarto:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const modificarCuarto = async (req, res) => {
    try {
        console.log('Ingresando al controlador modificarCuarto');
        console.log('req.user:', req.user);
        
        // Verificar si el usuario está autenticado y obtener su ID
        const usuarioID = req.user ? req.user.usuarioID : null;

        if (!usuarioID) {
            return res.status(401).json({ message: 'Acceso no autorizado. Debes iniciar sesión para modificar un cuarto.' });
        }

        // Verificar si el usuario es el propietario del cuarto
        const cuartoID = req.params.id; // Suponiendo que el ID del cuarto se pasa como parámetro en la URL
        const cuarto = await Cuarto.findByPk(cuartoID);
        
        if (!cuarto) {
            return res.status(404).json({ message: 'El cuarto no existe.' });
        }

        if (cuarto.UsuarioID !== usuarioID) {
            return res.status(403).json({ message: 'No tienes permiso para modificar este cuarto.' });
        }

        // Obtener los datos del cuarto desde el cuerpo de la solicitud
        const { Titulo, Descripcion, Direccion, Precio, Baño, ServicioID, InstitucionID, DistritoID } = req.body;

        // Verificar si se proporcionaron todos los campos necesarios
        if (!Titulo || !Descripcion || !Direccion || !Precio || !Baño || !ServicioID || !InstitucionID || !DistritoID) {
            return res.status(400).json({ message: 'Todos los campos son requeridos para modificar un cuarto.' });
        }
        
        // Actualizar el cuarto con los nuevos datos
        await cuarto.update({
            Titulo,
            Descripcion,
            Direccion,
            Precio,
            Baño,
            InstitucionID,
            DistritoID
        });

        // Eliminar todos los servicios asociados al cuarto
        await CuartoServicios.destroy({ where: { CuartoID: cuartoID } });

        // Asociar los nuevos servicios al cuarto
        if (Array.isArray(ServicioID) && ServicioID.length > 0) {
            for (const servicioID of ServicioID) {
                await CuartoServicios.create({
                    CuartoID: cuartoID,
                    ServicioID: servicioID
                });
            }
        }

        res.status(200).json({ message: 'Cuarto modificado exitosamente.' });
    } catch (error) {
        console.error('Error al modificar el cuarto:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const listarCuartos = async (req, res) => {
    try {
        console.log('Ingresando al controlador listarCuartos');

        // Obtener todos los cuartos de la base de datos
        const cuartos = await Cuarto.findAll();

        res.status(200).json(cuartos);
    } catch (error) {
        console.error('Error al listar los cuartos:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};
const listarCuartosPorUsuario = async (req, res) => {
    try {
        console.log('Ingresando al controlador listarCuartosPorUsuario');

        // Verificar si el usuario está autenticado y obtener su ID
        const usuarioID = req.user ? req.user.usuarioID : null;

        if (!usuarioID) {
            return res.status(401).json({ message: 'Acceso no autorizado. Debes iniciar sesión para ver tus cuartos.' });
        }

        // Obtener todos los cuartos del usuario con el UsuarioID proporcionado
        const cuartos = await Cuarto.findAll({ where: { UsuarioID: usuarioID } });

        res.status(200).json(cuartos);
    } catch (error) {
        console.error('Error al listar los cuartos por UsuarioID:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

const eliminarCuarto = async (req, res) => {
    try {
        console.log('Ingresando al controlador eliminarCuarto');
        console.log('req.user:', req.user);
        
        // Verificar si el usuario está autenticado y obtener su ID
        const usuarioID = req.user ? req.user.usuarioID : null;

        if (!usuarioID) {
            return res.status(401).json({ message: 'Acceso no autorizado. Debes iniciar sesión para eliminar un cuarto.' });
        }

        // Verificar si el usuario es el propietario del cuarto
        const cuartoID = req.params.id; // Obtener el ID del cuarto de los parámetros de la URL
        const cuarto = await Cuarto.findByPk(cuartoID);
        
        if (!cuarto) {
            return res.status(404).json({ message: 'El cuarto no existe.' });
        }

        if (cuarto.UsuarioID !== usuarioID) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar este cuarto.' });
        }

        // Eliminar el cuarto
        await cuarto.destroy();

        res.status(200).json({ message: 'Cuarto eliminado exitosamente.' });
    } catch (error) {
        console.error('Error al eliminar el cuarto:', error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};

module.exports = {
    registrarCuarto,
    modificarCuarto,
    listarCuartos,
    listarCuartosPorUsuario
};

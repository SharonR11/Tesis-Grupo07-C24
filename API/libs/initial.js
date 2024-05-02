const db = require('../models'); // Importa el objeto de la base de datos
const bcrypt = require('bcryptjs');

const Role = db.roles; // Importa el modelo Role
const Servicio = db.servicios; // Importa el modelo Servicio
const ColorFondo = db.colorfondos; // Importa el modelo ColorFondo
const Institucion = db.instituciones;
const Departamento = db.departamentos;
const TipoPago = db.tipopagos;
const Usuario = db.usuarios; 
const Provincia = db.provincias;
const Distrito = db.distritos;
const createInitialData = async () => {
    try {
        // Verifica si ya existen registros en la tabla Role
        const existingRoles = await Role.findAll();
        if (existingRoles.length === 0) {
            await Role.bulkCreate([
                { Nombre: 'admin' },
                { Nombre: 'arrendador' },
                { Nombre: 'estudiante' }
            ]);
            console.log('Los roles se han creado exitosamente.');
        } else {
            console.log('Los roles ya existen en la base de datos.');
        }

        // Crear usuario administrador
        const existingAdmin = await Usuario.findOne({ where: { RolID: 1 } });
        if (!existingAdmin) {
            const hashedPassword1  = await bcrypt.hash('010203', 10); // Reemplaza 'tu_contraseña' por la contraseña deseada
            await Usuario.create({
                Nombres: 'Sharon',
                Apellidos: 'Rudas',
                Correo: 'sharon.rudas@gmail.com',
                Password: hashedPassword1 ,
                RolID: 1, // ID del rol de administrador
                EstadoSesion: false, // Estado de sesión inactivo
                CorreoVerificado: true, // Correo verificado
                Estado: true // Usuario activo
            });
            const hashedPassword2 = await bcrypt.hash('123456', 10);
            await Usuario.create({
                Nombres: 'Deysi',
                Apellidos: 'Lloja',
                Correo: 'deysi.lloja@gmail.com',
                Password: hashedPassword2,
                RolID: 1,
                EstadoSesion: false,
                CorreoVerificado: true,
                Estado: true
            });

            console.log('Se han creado los usuarios administradores exitosamente.');
        } else {
            console.log('Ya existe un administrador en la base de datos.');
        }
      

        // Verifica si ya existen registros en la tabla Servicio
        const existingServicios = await Servicio.findAll();
        if (existingServicios.length === 0) {
            await Servicio.bulkCreate([
                { Nombre: 'Luz' },
                { Nombre: 'Agua' },
                { Nombre: 'Internet' },
                { Nombre: 'Limpieza' },
                { Nombre: 'Agua Caliente' },
                { Nombre: 'Cama' }
            ]);
            console.log('Los servicios se han creado exitosamente.');
        } else {
            console.log('Los servicios ya existen en la base de datos.');
        }

        // Verifica si ya existen registros en la tabla ColorFondo
        const existingColorFondos = await ColorFondo.findAll();
        if (existingColorFondos.length === 0) {
            await ColorFondo.bulkCreate([
                { NombreColor: 'Blanco', CodigoHexadecimal: '#FFFFFF' },
                { NombreColor: 'Negro', CodigoHexadecimal: '#000000' },
                { NombreColor: 'Rojo', CodigoHexadecimal: '#FF0000' },
                { NombreColor: 'Verde', CodigoHexadecimal: '#00FF00' },
                { NombreColor: 'Azul', CodigoHexadecimal: '#0000FF' },
                { NombreColor: 'Amarillo', CodigoHexadecimal: '#FFFF00' },
                { NombreColor: 'Cyan', CodigoHexadecimal: '#00FFFF' },
                { NombreColor: 'Magenta', CodigoHexadecimal: '#FF00FF' },
                { NombreColor: 'Gris', CodigoHexadecimal: '#808080' },
                { NombreColor: 'Gris Claro', CodigoHexadecimal: '#C0C0C0' },
                { NombreColor: 'Gris Oscuro', CodigoHexadecimal: '#808080' },
                { NombreColor: 'Naranja', CodigoHexadecimal: '#FFA500' },
                { NombreColor: 'Rosado', CodigoHexadecimal: '#FFC0CB' },
                { NombreColor: 'Violeta', CodigoHexadecimal: '#8A2BE2' },
                { NombreColor: 'Marrón', CodigoHexadecimal: '#A52A2A' },
                { NombreColor: 'Turquesa', CodigoHexadecimal: '#40E0D0' },
                { NombreColor: 'Plata', CodigoHexadecimal: '#C0C0C0' },
                { NombreColor: 'Oro', CodigoHexadecimal: '#FFD700' },
                { NombreColor: 'Verde Lima', CodigoHexadecimal: '#00FF00' },
                { NombreColor: 'Coral', CodigoHexadecimal: '#FF7F50' }
            ]);
            console.log('Los colores de fondo se han creado exitosamente.');
        } else {
            console.log('Los colores de fondo ya existen en la base de datos.');
        }

        const existingInstituciones = await Institucion.findAll();
        if (existingInstituciones.length === 0) {
            await Institucion.bulkCreate([
                { Nombre: 'Instituto Superior Daniel Alcides Carrión', Abreviacion: 'Instituto Carrión' },
                { Nombre: 'Instituto de Educación Superior Tecnológico Túpac Amaru', Abreviacion: 'ISTTA' },
                { Nombre: 'Instituto de Educación Superior Tecnológico Francisco de Paula Gonzales Vigil', Abreviacion: 'IESP VIGIL' },
                { Nombre: 'Instituto Superior Tecnológico Público Simón Bolívar', Abreviacion: 'ISTSB' },
                { Nombre: 'Instituto de Educación Superior Tecnológico Público San Marcos', Abreviacion: 'IESTP-SM' },
                { Nombre: 'Instituto de Educación Superior Tecnológico Público República Federal de Alemania', Abreviacion: 'I.E.S República Federal de Alemania' },
                { Nombre: 'Instituto Peruano de Administración de empresas', Abreviacion: 'IPAE' },
                { Nombre: 'Instituto de Educación Superior Tecnológico Privado CIBERTEC', Abreviacion: 'Cibertec' },
                { Nombre: 'Instituto San Ignacio de Loyola', Abreviacion: 'ISIL' },
                { Nombre: 'Insituto Técnico de Administración de Empresas', Abreviacion: 'ITAE' },
                { Nombre: 'Instituto de Educación Superior Tecnológico Privado CEPEA', Abreviacion: 'CEPEA' },
                { Nombre: 'Instituto Superior Tecnológico IDAT', Abreviacion: 'IDAT' },
                { Nombre: 'Instituto Continental', Abreviacion: 'Instituto Continental' },
                { Nombre: 'Instituto Superior Tecnológico Maria Montessori', Abreviacion: 'Instituto Maria Montessori' },
                { Nombre: 'Instituto de Educación Superior Privado KHIPU', Abreviacion: 'KHIPU' },
                { Nombre: 'Instituto de Educación Superior Privado Jhalebet', Abreviacion: 'Jhalebet' },
                { Nombre: 'Instituto de Educación Superior Privado EF', Abreviacion: 'EF' },
                { Nombre: 'Instituto de Educación Superior en Perú', Abreviacion: 'Tecsup' },
                { Nombre: 'Instituto TEC', Abreviacion: 'TEC' },
                { Nombre: 'Instituto Superior Tecnológico Clorinda Matto de Turner', Abreviacion: 'IES Clorinda Matto de Turner' },
                { Nombre: 'Instituto de Educación Superior María de Los Ángeles CIMA’S', Abreviacion: 'CIMA’S' },
                { Nombre: 'Instituto Superior Tecnológico Arzobispo Loayza', Abreviacion: 'IAL' },
                { Nombre: 'Instituto Superior Tecnológico Paul Muller', Abreviacion: 'Instituto Paul Muller' },
                { Nombre: 'Instituto de Educación Superior Tecnológico Privado de la Construcción CAPECO', Abreviacion: 'CAPECO' },
                { Nombre: 'Instituto De Educación Superior Tecnológico Privado Latino', Abreviacion: 'Latino' },
                { Nombre: 'Instituto de Educación Superior Wernher Von Braun', Abreviacion: 'Wernher Von Braun' },
                { Nombre: 'Instituto Superior Columbia', Abreviacion: 'Columbia' },
                { Nombre: 'Instituto Superior Tecnológico Privado Nina Design', Abreviacion: 'Nina Design' },
                { Nombre: 'Instituto de Educación Superior Ricardo Palma', Abreviacion: 'Instituto Ricardo Palma' },
                { Nombre: 'Instituto Superior de Comunicación y Diseño Toulouse Lautrec', Abreviacion: 'Toulouse Lautrec' },
            ]);
            
            console.log('Las instituciones se han creado exitosamente.');
        } else {
            console.log('Las instituciones ya existen en la base de datos.');
        }
        const existingDepartamentos = await Departamento.findAll();
        if (existingDepartamentos.length === 0) {
            await Departamento.bulkCreate([
                { Nombre: 'Amazonas' },
                { Nombre: 'Áncash' },
                { Nombre: 'Apurímac' },
                { Nombre: 'Arequipa' },
                { Nombre: 'Ayacucho' },
                { Nombre: 'Cajamarca' },
                { Nombre: 'Cusco' },
                { Nombre: 'Huancavelica' },
                { Nombre: 'Huánuco' },
                { Nombre: 'Ica' },
                { Nombre: 'Junín' },
                { Nombre: 'La Libertad' },
                { Nombre: 'Lambayeque' },
                { Nombre: 'Lima' },
                { Nombre: 'Loreto' },
                { Nombre: 'Madre de Dios' },
                { Nombre: 'Moquegua' },
                { Nombre: 'Pasco' },
                { Nombre: 'Piura' },
                { Nombre: 'Puno' },
                { Nombre: 'San Martín' },
                { Nombre: 'Tacna' },
                { Nombre: 'Tumbes' },
                { Nombre: 'Ucayali' }
            ]);            
            console.log('Los Departamentos se han creado exitosamente.');
        } else {
            console.log('Los Departamentos ya existen en la base de datos.');
        }
        const existingProvincias = await Provincia.findAll();
        if (existingProvincias.length === 0) {
            // Busca el ID del departamento de Lima
            const lima = await Departamento.findOne({ where: { Nombre: 'Lima' } });

            if (lima) {
                // Crea los registros de provincias para el departamento de Lima
                await Provincia.bulkCreate([
                    { Nombre: 'Lima', DepartamentoID: lima.DepartamentoID },
                    { Nombre: 'Callao', DepartamentoID: lima.DepartamentoID },
                    { Nombre: 'Barranca', DepartamentoID: lima.DepartamentoID },
                    { Nombre: 'Cajatambo', DepartamentoID: lima.DepartamentoID },
                    { Nombre: 'Cañete', DepartamentoID: lima.DepartamentoID },
                    { Nombre: 'Canta', DepartamentoID: lima.DepartamentoID },
                    { Nombre: 'Huaral', DepartamentoID: lima.DepartamentoID },
                    { Nombre: 'Huarochirí', DepartamentoID: lima.DepartamentoID },
                    { Nombre: 'Huaura', DepartamentoID: lima.DepartamentoID },
                    { Nombre: 'Oyón', DepartamentoID: lima.DepartamentoID },
                    { Nombre: 'Yauyos', DepartamentoID: lima.DepartamentoID }
                ]);

                console.log('Las provincias de Lima se han creado exitosamente.');
            } else {
                console.log('El departamento de Lima no se encontró en la base de datos.');
            }
        } else {
            console.log('Las provincias ya existen en la base de datos.');
        }

        const existingDistritos = await Distrito.findAll();
        if (existingDistritos.length === 0) {
            // Busca el ID de la provincia de Lima
            const lima = await Provincia.findOne({ where: { Nombre: 'Lima' } });

            if (lima) {
                // Crea los registros de distritos para la provincia de Lima
                await Distrito.bulkCreate([
                    { Nombre: 'Ancón', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Ate', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Barranco', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Breña', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Carabayllo', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Chaclacayo', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Chorrillos', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Cieneguilla', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Comas', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'El Agustino', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Independencia', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Jesús María', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'La Molina', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'La Victoria', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Lima', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Lince', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Los Olivos', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Lurigancho', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Lurín', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Magdalena del Mar', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Miraflores', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Pachacámac', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Pucusana', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Pueblo Libre', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Puente Piedra', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Punta Hermosa', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Punta Negra', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Rímac', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'San Bartolo', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'San Borja', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'San Isidro', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'San Juan de Lurigancho', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'San Juan de Miraflores', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'San Luis', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'San Martín de Porres', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'San Miguel', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Santa Anita', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Santa María del Mar', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Santa Rosa', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Santiago de Surco', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Surquillo', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Villa el Salvador', ProvinciaID: lima.ProvinciaID },
                    { Nombre: 'Villa María del Triunfo', ProvinciaID: lima.ProvinciaID }
                ]);
                

                console.log('Los distritos de Lima se han creado exitosamente.');
            } else {
                console.log('La provincia de Lima no se encontró en la base de datos.');
            }
        } else {
            console.log('Los distritos ya existen en la base de datos.');
        }


        const existingTiposPagos = await TipoPago.findAll();
        if (existingTiposPagos.length === 0) {
            await TipoPago.bulkCreate([
                { Nombre: 'Características Premium', Descripcion: 'Pago para obtener características premium que mejoran la visibilidad en las búsquedas y en el menú' },
                { Nombre: 'Visualización de la Oferta', Descripcion: 'Pago para activar la visualización de la oferta, que de lo contrario estaría oculta para los estudiantes hasta que se realice el pago' }
            ]);
            console.log('Los Tipo de Pagos se han creado exitosamente.');
        } else {
            console.log('Los Tipo de Pagos ya existen en la base de datos.');
        }

    } catch (error) {
        console.error('Error al crear los datos iniciales:', error);
    }
};

module.exports = createInitialData;

const dbConfig = require('../config/dbConfig.js');

const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        // operatorsAliases: false,

        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
);

sequelize.authenticate()
.then(() => {
    console.log('Conectado a la base de datos!');
})
.catch(err => {
    console.error('Error de conexión:', error);
})

const db = {}

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.roles = require('./roleModel.js')(sequelize, DataTypes)
db.colorfondos = require('./colorfondoModel.js')(sequelize, DataTypes)
db.usuarios = require('./usuarioModel.js')(sequelize, DataTypes)
db.verificacioncorreos = require('./verificacioncorreoModel.js')(sequelize, DataTypes)
db.servicios = require('./servicioModel.js')(sequelize, DataTypes)
db.cuartoservicio  = require('./cuartoservicioModel.js')(sequelize, DataTypes)
db.departamentos = require('./departamentoModel.js')(sequelize, DataTypes)
db.provincias = require('./provinciaModel.js')(sequelize, DataTypes)
db.distritos = require('./distritoModel.js')(sequelize, DataTypes)
db.instituciones = require('./institucionModel.js')(sequelize, DataTypes)
db.tipopagos = require('./tipopagoModel.js')(sequelize, DataTypes)
db.pagosadicionales = require('./pagosadicionalesModel.js')(sequelize, DataTypes)
db.cuartos = require('./cuartoModel.js')(sequelize, DataTypes)
db.fotos = require('./fotocuartoModel.js')(sequelize, DataTypes)
db.resenas = require('./resenaModel.js')(sequelize, DataTypes)
db.comentarioresenas = require('./comentarioresenaModel.js')(sequelize, DataTypes)
db.reservas = require('./reservaModel.js')(sequelize, DataTypes)
db.pagosreservas = require('./pagoreservaModel.js')(sequelize, DataTypes)
db.favoritos = require('./favoritoModel.js')(sequelize, DataTypes)

// Relación uno a muchos-----------------
//-------usuarios----
db.roles.hasMany(db.usuarios, {
    foreignKey: 'RolID', 
    as: 'RolUsuarios' 
});
db.colorfondos.hasMany(db.usuarios, {
    foreignKey: 'ColorID', 
    as: 'ColorUsuarios'
});
//------verificacioncorreos-----
db.usuarios.hasMany(db.verificacioncorreos, {
    foreignKey: 'UsuarioID',
    as: 'UsuarioVerificacion'
});
//------provincias-----
db.departamentos.hasMany(db.provincias, {
    foreignKey: 'DepartamentoID',
    as: 'DepartamentoProvincias'
});
//-----Distritos------
db.provincias.hasMany(db.distritos, {
    foreignKey: 'ProvinciaID',
    as: 'ProvinciaDistritos'
});
//-----pagoadicional------
db.usuarios.hasMany(db.pagosadicionales, {
    foreignKey: 'ArrendadorID',
    as: 'ArrendadorPagos'
});
db.tipopagos.hasMany(db.pagosadicionales, {
    foreignKey: 'TipoPagoID',
    as: 'TipoPagoAdicionales'
});
//-----Cuartos------
db.usuarios.hasMany(db.cuartos, {
    foreignKey: 'UsuarioID',
    as: 'UsuarioCuartos'
});
// db.servicios.hasMany(db.cuartos, {
//     foreignKey: 'ServicioID',
//     as: 'ServicioCuartos'
// });
db.instituciones.hasMany(db.cuartos, {
    foreignKey: 'InstitucionID',
    as: 'InstitucionCuartos'
});
db.distritos.hasMany(db.cuartos, {
    foreignKey: 'DistritoID',
    as: 'DistritoCuartos'
});
db.pagosadicionales.hasMany(db.cuartos, {
    foreignKey: 'PagoAdicionalID',
    as: 'PagosAdicionalesCuartos'
});
//-----fotoscuarto------
db.cuartos.hasMany(db.fotos, { 
    foreignKey: 'CuartoID', 
    as: 'CuartoFotos' });
//-----reseñas------
db.usuarios.hasMany(db.resenas, {
    foreignKey: 'UsuarioID',
    as: 'UsuarioReseñas'
});
db.cuartos.hasMany(db.resenas, {
    foreignKey: 'CuartoID',
    as: 'CuartoReseñas'
});
//-----comentariosreseñas------
db.usuarios.hasMany(db.comentarioresenas, {
    foreignKey: 'UsuarioID', // Nombre del campo de clave foránea en la tabla ComentariosReseñas
    as: 'UsuarioComentarios' // Alias para la relación
});
db.resenas.hasMany(db.comentarioresenas, { 
   foreignKey: 'ReseñaID', 
   as: 'ResenaComentario' 
}); 
//-----reservas------
db.usuarios.hasMany(db.reservas, {
    foreignKey: 'UsuarioID',
    as: 'UsuarioReserva'
});
db.cuartos.hasMany(db.reservas, {
    foreignKey: 'CuartoID',
    as: 'CuartoReserva'
});
//-----pagosreservas------
db.reservas.hasMany(db.pagosreservas, {
    foreignKey: 'ReservaID',
    as: 'ReservaPagos'
});
//-----favoritos------
db.usuarios.hasMany(db.favoritos, {
    foreignKey: 'UsuarioID',
    as: 'UsuarioFavoritos'
});
db.cuartos.hasMany(db.favoritos, {
    foreignKey: 'CuartoID',
    as: 'CuartoFavorito'
});


// Relación Muchos a uno----------------------------
//-----usuarios------
db.usuarios.belongsTo(db.roles, { 
    foreignKey: 'RolID', 
    as: 'UsuarioRol' 
}); 
db.usuarios.belongsTo(db.colorfondos, { 
    foreignKey: 'ColorID', 
    as: 'UsuarioColorFondo' 
});
//-------verificacioncorreos----
db.verificacioncorreos.belongsTo(db.usuarios, {
    foreignKey: 'UsuarioID',
    as: 'VerficacionUsuario'
});
//------provincias-----
db.provincias.belongsTo(db.departamentos, {
    foreignKey: 'DepartamentoID',
    as: 'provinciasDepartamento'
});
//-----Distritos------
db.distritos.belongsTo(db.provincias, {
    foreignKey: 'ProvinciaID',
    as: 'distritosProvincia'
});
//-----pagoadicional------
db.pagosadicionales.belongsTo(db.usuarios, {
    foreignKey: 'ArrendadorID',
    as: 'pagosadicionalesArrendador'
});
db.pagosadicionales.belongsTo(db.tipopagos, {
    foreignKey: 'TipoPagoID',
    as: 'pagosadicionalesTipoPago'
});
//-----Cuartos------
db.cuartos.belongsTo(db.usuarios, {
    foreignKey: 'UsuarioID',
    as: 'cuartosUsuario'
});
// db.cuartos.belongsTo(db.servicios, {
//     foreignKey: 'ServicioID',
//     as: 'cuartosServicio'
// });
db.cuartos.belongsTo(db.instituciones, {
    foreignKey: 'InstitucionID',
    as: 'cuartosInstitucion'
});
db.cuartos.belongsTo(db.distritos, {
    foreignKey: 'DistritoID',
    as: 'cuartosDistrito'
});
db.cuartos.belongsTo(db.pagosadicionales, {
    foreignKey: 'PagoAdicionalID',
    as: 'cuartosPagosAdicionales'
});
//-----fotoscuarto------
db.fotos.belongsTo(db.cuartos, { 
    foreignKey: 'CuartoID', 
    as: 'FotosCuarto' });
//-----reseñas------
db.resenas.belongsTo(db.usuarios, {
    foreignKey: 'UsuarioID',
    as: 'resenasUsuario'
});
db.resenas.belongsTo(db.usuarios, {
    foreignKey: 'CuartoID',
    as: 'resenasCuarto'
});
//-----comentariosreseñas------
db.comentarioresenas.belongsTo(db.usuarios, {
    foreignKey: 'UsuarioID', // Nombre del campo de clave foránea en la tabla ComentariosReseñas
    as: 'comentarioresenasUsuario' // Alias para la relación
});
db.comentarioresenas.belongsTo(db.resenas, { 
    foreignKey: 'ReseñaID', 
    as: 'comentarioresenasResena' 
}); 
//-----reservas------
db.reservas.belongsTo(db.usuarios, {
    foreignKey: 'UsuarioID',
    as: 'reservasUsuario'
});
db.reservas.belongsTo(db.cuartos, {
    foreignKey: 'CuartoID',
    as: 'reservasCuarto'
});
//-----pagosreservas------
db.pagosreservas.belongsTo(db.reservas, {
    foreignKey: 'ReservaID',
    as: 'pagosreservasReserva'
});
//-----favoritos------
db.favoritos.belongsTo(db.usuarios, {
    foreignKey: 'UsuarioID',
    as: 'favoritosUsuario'
});
db.favoritos.belongsTo(db.cuartos, {
    foreignKey: 'CuartoID',
    as: 'favoritosCuarto'
});

//-----Cuartos y Servicios------
db.cuartos.belongsToMany(db.servicios, {
    through: 'CuartoServicios', // Nombre de la tabla de unión
    foreignKey: 'CuartoID', // Nombre de la clave foránea en la tabla CuartoServicios que hace referencia a Cuartos
    otherKey: 'ServicioID', // Nombre de la clave foránea en la tabla CuartoServicios que hace referencia a Servicios
    as: 'servicios', // Alias para la relación
    timestamps: false // Desactiva el seguimiento de fecha de creación y actualización en la tabla de unión
});

db.servicios.belongsToMany(db.cuartos, {
    through: 'CuartoServicios', // Nombre de la tabla de unión
    foreignKey: 'ServicioID', // Nombre de la clave foránea en la tabla CuartoServicios que hace referencia a Servicios
    otherKey: 'CuartoID', // Nombre de la clave foránea en la tabla CuartoServicios que hace referencia a Cuartos
    as: 'cuartos', // Alias para la relación
    timestamps: false // Desactiva el seguimiento de fecha de creación y actualización en la tabla de unión
});

try {
     //db.cuartos.sync({ alter: true }),
     db.sequelize.sync({ force: false })
    .then(() => {
        console.log('yes re-sync done!')
    })
} catch (error) {
    console.error('Error al sincronizar los modelos:', error);
}


module.exports = db

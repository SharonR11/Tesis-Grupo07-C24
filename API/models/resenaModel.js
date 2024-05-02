// const Usuario = require('./usuarioModel'); 
// const Cuarto = require('./cuartoModel'); 

module.exports = (sequelize, DataTypes) => {

    const Resena = sequelize.define("Reseñas", {
        ReseñaID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Comentario: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        CuartoID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        UsuarioID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Puntuacion: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        FechaCreacion: {
            type: DataTypes.DATE,
            allowNull: true
        },
        FechaModificacion: {
            type: DataTypes.DATE,
            allowNull: true
        }
    
    }, {
        timestamps: false // Desactiva el seguimiento de fecha de creación y actualización
    });
    // Resena.belongsTo(Usuario, {
    //     foreignKey: 'UsuarioID',
    //     as: 'Usuario'
    // });
    
    // Resena.belongsTo(Cuarto, {
    //     foreignKey: 'CuartoID',
    //     as: 'Cuarto'
    // });

    return Resena

}

// const Usuario = require('./usuarioModel'); 
// const Cuarto = require('./cuartoModel');

module.exports = (sequelize, DataTypes) => {

    const Favorito = sequelize.define("Favoritos", {
        FavoritoID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UsuarioID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        CuartoID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    
    }, {
        timestamps: false // Desactiva el seguimiento de fecha de creación y actualización
    });
    // Favorito.belongsTo(Usuario, {
    //     foreignKey: 'UsuarioID',
    //     as: 'Usuario'
    // });
    
    // Favorito.belongsTo(Cuarto, {
    //     foreignKey: 'CuartoID',
    //     as: 'Cuarto'
    // });

    return Favorito

}

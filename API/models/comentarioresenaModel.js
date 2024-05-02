// const {Usuario,Resena} = require('../models'); 

module.exports = (sequelize, DataTypes) => {
    const ComentarioResena = sequelize.define('ComentariosReseñas', {
        ComentarioID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Comentario: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        ReseñaID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        UsuarioID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        FechaCreacion: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: false 
    });
    // ComentarioResena.belongsTo(Usuario, { 
    //     foreignKey: 'UsuarioID', as: 'Usuario' }); 
    // ComentarioResena.belongsTo(Resena, { 
    //     foreignKey: 'ReseñaID', as: 'Resena' }); 

    return ComentarioResena;
};


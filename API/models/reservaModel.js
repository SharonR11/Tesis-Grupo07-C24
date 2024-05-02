// const Reserva = require('./reservaModel'); 

module.exports = (sequelize, DataTypes) => {

    const Reserva = sequelize.define("Reservas", {
        ReservaID: {
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
            allowNull: true
        },
        Estado: {
            type: DataTypes.TINYINT,
            allowNull: true
        },
        FechaInicio: {
            type: DataTypes.DATE,
            allowNull: true
        },
        FechaFin: {
            type: DataTypes.DATE,
            allowNull: true
        },
        FechaSolicitud: {
            type: DataTypes.DATE,
            allowNull: true
        }
    
    }, {
        timestamps: false // Desactiva el seguimiento de fecha de creación y actualización
    });
    // Reserva.belongsTo(Usuario, {
    //     foreignKey: 'UsuarioID',
    //     as: 'Usuario'
    // });
    
    // Reserva.belongsTo(Cuarto, {
    //     foreignKey: 'CuartoID',
    //     as: 'Cuarto'
    // });

    return Reserva

}

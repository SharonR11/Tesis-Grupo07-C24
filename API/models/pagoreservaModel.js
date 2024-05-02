// const Reserva = require('./reservaModel'); 

module.exports = (sequelize, DataTypes) => {

    const PagoReserva = sequelize.define("PagoReservas", {
        PagoReservaID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ReservaID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Monto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        FechaHoraPago: {
            type: DataTypes.DATE,
            allowNull: false
        },
        EstadoPago: {
            type: DataTypes.ENUM('Pendiente', 'Completado', 'Cancelado'),
            allowNull: false,
            defaultValue: 'Pendiente'
        },
        IDTransaccionPayPal: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        EstadoTransaccionPayPal: {
            type: DataTypes.ENUM('Pendiente', 'Completado', 'Cancelado'),
            allowNull: true
        }
    
    }, {
        timestamps: false // Desactiva el seguimiento de fecha de creación y actualización
    });
    // PagoReserva.belongsTo(Reserva, {
    //     foreignKey: 'ReservaID',
    //     as: 'Reserva'
    // });

    return PagoReserva

}


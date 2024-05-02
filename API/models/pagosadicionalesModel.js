// const Usuario = require('./usuarioModel'); 
// const TipoPago = require('./tipopagoModel');

module.exports = (sequelize, DataTypes) => {

    const PagoAdicional = sequelize.define("PagosAdicionales", {
        PagoAdicionalID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ArrendadorID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        TipoPagoID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        FechaInicio: {
            type: DataTypes.DATE,
            allowNull: false
        },
        FechaVencimiento: {
            type: DataTypes.DATE,
            allowNull: false
        },
        Monto: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        FechaHoraPago: {
            type: DataTypes.DATE,
            allowNull: true
        },
        EstadoPago: {
            type: DataTypes.ENUM('Pendiente', 'Completado', 'Cancelado'),
            allowNull: true,
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

    return PagoAdicional
}

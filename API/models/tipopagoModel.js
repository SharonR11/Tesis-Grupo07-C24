module.exports = (sequelize, DataTypes) => {

    const TipoPago = sequelize.define("TipoPagos", {
        TipoPagoID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        Descripcion: DataTypes.STRING(255)
    
    }, {
        timestamps: false // Desactiva el seguimiento de fecha de creación y actualización
    });

    return TipoPago

}

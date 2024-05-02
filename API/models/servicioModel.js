module.exports = (sequelize, DataTypes) => {

    const Servicio = sequelize.define("Servicios", {
        ServicioID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: DataTypes.STRING(45),
            allowNull: false
        }
    
    }, {
        timestamps: false // Desactiva el seguimiento de fecha de creación y actualización
    });

    return Servicio

}

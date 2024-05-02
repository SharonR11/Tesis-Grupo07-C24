module.exports = (sequelize, DataTypes) => {

    const CuartoServicio = sequelize.define("CuartoServicio", {
        CuartoID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ServicioID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    
    }, {
        timestamps: false // Desactiva el seguimiento de fecha de creación y actualización
    });

    return CuartoServicio

}
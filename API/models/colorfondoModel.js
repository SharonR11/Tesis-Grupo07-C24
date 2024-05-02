module.exports = (sequelize, DataTypes) => {

    const ColorFondo = sequelize.define("ColorFondo", {
        ColorID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        NombreColor: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        CodigoHexadecimal: {
            type: DataTypes.STRING(7),
            allowNull: false
        }
    
    }, {
        timestamps: false // Desactiva el seguimiento de fecha de creación y actualización
    });

    return ColorFondo

}
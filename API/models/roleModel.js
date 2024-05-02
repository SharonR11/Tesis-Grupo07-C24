module.exports = (sequelize, DataTypes) => {

    const Role = sequelize.define("Roles", {
        RolID: {
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

    return Role

}
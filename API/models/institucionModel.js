module.exports = (sequelize, DataTypes) => {

    const Institucion = sequelize.define("Instituciones", {
        InstitucionID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        Abreviacion: {
            type: DataTypes.STRING(35),
            allowNull: false
        }
    
    }, {
        timestamps: false // Desactiva el seguimiento de fecha de creación y actualización
    });

    return Institucion

}

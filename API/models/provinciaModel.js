// const Departamento = require('./departamentoModel'); 

module.exports = (sequelize, DataTypes) => {

    const Provincia = sequelize.define("Provincias", {
        ProvinciaID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        DepartamentoID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    
    }, {
        timestamps: false 
    });
    return Provincia

}
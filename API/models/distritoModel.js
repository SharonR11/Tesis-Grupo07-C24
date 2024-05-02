// const Provincia = require('./provinciaModel'); 

module.exports = (sequelize, DataTypes) => {

    const Distrito = sequelize.define("Distritos", {
        DistritoID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        ProvinciaID: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    
    }, {
        timestamps: false // Desactiva el seguimiento de fecha de creación y actualización
    });
    
    return Distrito

};




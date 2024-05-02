module.exports = (sequelize, DataTypes) => {

    const Departamento = sequelize.define("Departamentos", {
        DepartamentoID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombre: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    
    }, {
        timestamps: false // Desactiva el seguimiento de fecha de creación y actualización
    });

    return Departamento

}

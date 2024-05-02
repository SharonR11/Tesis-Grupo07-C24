module.exports = (sequelize, DataTypes) => {

    const FotoCuarto = sequelize.define("FotosCuarto", {
        FotoID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        CuartoID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Foto: {
            type: DataTypes.STRING,
            allowNull: false
        }
    
    }, {
        timestamps: false 
    });
    
    return FotoCuarto

}

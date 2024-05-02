// const Usuario = require('./usuarioModel'); 

module.exports = (sequelize, DataTypes) => {
    const VerificacionCorreo = sequelize.define("VerificacionCorreo", {
        TokenID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        UsuarioID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Token: {
            type: DataTypes.STRING(100)
        },
        FechaCreacion: {
            type: DataTypes.DATE
        },
        FechaExpiracion: {
            type: DataTypes.DATE
        },
        EstadoToken: {
            type: DataTypes.ENUM('Pendiente', 'Utilizado')
        },
        NumeroIntentos: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        TipoToken: {
            type: DataTypes.ENUM('VerificacionCorreo', 'ResetPassword')
        },
        AsuntoCorreo: {
            type: DataTypes.STRING(255)
        },
        ContenidoCorreo: {
            type: DataTypes.TEXT
        }
    }, {
        timestamps: false // Desactiva el seguimiento de fecha de creación y actualización
    });

    return VerificacionCorreo;
};

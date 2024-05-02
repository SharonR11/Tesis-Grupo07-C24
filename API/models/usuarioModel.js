
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
        UsuarioID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Nombres: DataTypes.STRING(100),
        Apellidos: DataTypes.STRING(100),
        DNI: DataTypes.INTEGER(8),
        Correo: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true
        },
        Telefono: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        Direccion: {
            type: DataTypes.STRING(105),
            allowNull: true
        },
        Password: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        RolID: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        FechaCreacion: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW
        },
        UltimaActividad: {
            type: DataTypes.DATE,
            allowNull: true
        },
        ContratoArrendamiento: {
            type: DataTypes.STRING,
            allowNull: true
        },
        DocumentacionLegal: {
            type: DataTypes.STRING,
            allowNull: true
        },
        FotoUsuario: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ColorID: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        PremiumStatus: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        FechaInicioPremium: {
            type: DataTypes.DATE,
            allowNull: true
        },
        FechaVencimientoPremium: {
            type: DataTypes.DATE,
            allowNull: true
        },
        EstadoSesion: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        CorreoVerificado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        Estado: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        timestamps: false // Desactiva el seguimiento de fecha de creación y actualización
    });

    return Usuario;
};

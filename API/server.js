const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRouter.js');
const rolesRoutes = require('./routes/rolesRouter.js');
const verificacionCorreo = require('./routes/verificacionCorreoRouter.js');
const usuariosRouter = require('./routes/usuariosRouter.js');
const cuartosRouter = require('./routes/cuartosRouter.js');


require('dotenv').config();

const app = express();
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Llama a la función para crear Datos iniciales
const createInitialData = require('./libs/initial.js');

createInitialData()
    .then(() => {
        console.log('Datos iniciales creados exitosamente.');
    })
    .catch((error) => {
        console.error('Error al crear Datos iniciales:', error);
    });



// Rutas de autenticación
app.use('/api/auth', authRoutes);
// Rutas de roles
app.use('/api/roles', rolesRoutes);
// Rutas de Verificar Email
app.use('/api/correo', verificacionCorreo);
// Rutas de Usuarios
app.use('/api/users', usuariosRouter);
// Rutas de Usuarios
app.use('/api/cuartos', cuartosRouter);



// port
const PORT = process.env.PORT || 8080;

// server
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
    console.log(process.env.JWT_SECRET);

});
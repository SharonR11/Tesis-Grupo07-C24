// routes/verificacionCorreo.js
const router = require('express').Router()
const verificacionController = require('../controllers/verificacionController.js');


// Rutas de verificación de correo
router.post('/enviar-codigo-verificacion', verificacionController.generarYEnviarCodigoVerificacion);
//outer.post('/verificar-codigo', verificacionController.verificarCodigoVerificacion);
router.post('/verificar-codigo', verificacionController.verificarCodigoVerificacion);



module.exports = router

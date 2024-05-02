const authController = require('../controllers/authController.js')
//const authMiddleware = require('../middleware/authMiddleware.js');
const router = require('express').Router()

// Rutas de autenticación
router.post('/signup-arrendador', authController.signupArrendador);
router.post('/signup-estudiante', authController.signupEstudiante);

router.post('/login', authController.login);
router.post('/logout', authController.logout);



// router.post('/forgot-password', authController.forgotPassword);
// router.post('/reset-password', authController.resetPassword);

module.exports = router
// routes/usuarios.js
const usuarioController = require('../controllers/usuarioController.js')
//const authMiddleware = require('../middleware/authMiddleware.js');
const router = require('express').Router()


router.get('/arrendadores', usuarioController.listarArrendadores);
router.get('/estudiantes', usuarioController.listarEstudiantes);
router.get('/userariosAE', usuarioController.listarArrendadoresEstudiantes);


module.exports = router

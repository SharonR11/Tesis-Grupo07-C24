
const cuartoController = require('../controllers/cuartoController.js')
const router = require('express').Router()
const { verificarToken } = require('../middleware/middleware.js');


router.post('/crear-cuarto',verificarToken, cuartoController.registrarCuarto);

router.put('/modificar-cuarto/:id', verificarToken, cuartoController.modificarCuarto);

router.get('/listar-cuartos', cuartoController.listarCuartos);

module.exports = router
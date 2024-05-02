const roleController = require('../controllers/roleController.js')


const router = require('express').Router()

// Rutas para roles
router.get('/allroles', roleController.getAllRoles); // Aquí utilizamos getAllRoles directamente

module.exports = router
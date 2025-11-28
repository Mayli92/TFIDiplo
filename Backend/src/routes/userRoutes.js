const express = require('express');
const { getProfile, updateProfile } = require('../controllers/userController');
// Importar el middleware de protección (asumiendo que está en src/middlewares/authMiddleware.js)
const { protect } = require('../middlewares/authMiddleware'); 

const router = express.Router();

// ----------------------------------------------------------------------
// Rutas de Perfil
// Todas estas rutas usan el middleware 'protect' para requerir autenticación JWT
// ----------------------------------------------------------------------

// Endpoint: /api/users/profile

router.route('/profile')
    // GET: Obtener datos del perfil del usuario autenticado
    // Se ejecuta protect (verifica token, adjunta req.user), luego se ejecuta getProfile
    .get(protect, getProfile)
    
    // PUT: Actualizar datos del perfil del usuario autenticado
    // Se ejecuta protect, luego se ejecuta updateProfile
    .put(protect, updateProfile);

module.exports = router;
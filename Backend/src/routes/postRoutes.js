const express = require('express');
const { protect } = require('../middlewares/authMiddleware'); // Importamos el middleware de protección
const { 
    getPosts, 
    getPost, 
    createPost, 
    updatePost, 
    deletePost 
} = require('../controllers/postController');

const router = express.Router();

// Rutas Públicas: GET para listar y obtener detalles
router.get('/', getPosts);       // GET /api/posts
router.get('/:id', getPost);     // GET /api/posts/:id

// Rutas Privadas: POST, PUT, DELETE requieren autenticación (middleware 'protect')
router.post('/', protect, createPost);     // POST /api/posts - Protegida
router.put('/:id', protect, updatePost);   // PUT /api/posts/:id - Protegida
router.delete('/:id', protect, deletePost); // DELETE /api/posts/:id - Protegida

module.exports = router;
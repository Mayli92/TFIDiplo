const asyncHandler = require('express-async-handler');
const authService = require('../services/authService');

/**
 * @desc    Registrar un nuevo usuario
 * @route   POST /api/auth/register
 * @access  Público
 */
const register = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validación básica: asegura que los campos no estén vacíos.
    if (!username || !email || !password) {
        res.status(400); // 400 Bad Request
        throw new Error('Por favor, complete todos los campos requeridos (nombre de usuario, email, contraseña).');
    }

    // El servicio maneja la verificación de email existente, el hasheo de la contraseña y la creación del usuario.
    const result = await authService.registerUser({ username, email, password });

    // Respuesta exitosa: 201 Created. Retorna el usuario y el token JWT.
    res.status(201).json({
        message: 'Usuario registrado exitosamente.',
        user: result
    });
});
/**
 * @desc    Autenticar un usuario y obtener token (Login)
 * @route   POST /api/auth/login
 * @access  Público
 */
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
        res.status(400); // 400 Bad Request
        throw new Error('Por favor, ingrese email y contraseña.');
    }

    // El servicio maneja la verificación de credenciales y la generación del token.
    const result = await authService.loginUser(email, password);

    // Respuesta exitosa: 200 OK. Retorna el usuario y el token JWT.
    res.status(200).json({
        message: 'Login exitoso.',
        user: result
    });
});

module.exports = {
    register,
    login,
};
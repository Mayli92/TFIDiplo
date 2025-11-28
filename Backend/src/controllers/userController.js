const asyncHandler = require('express-async-handler');
const userService = require('../services/userService');

/**
 * @desc    Obtener el perfil del usuario actual
 * @route   GET /api/users/profile
 * @access  Privado
 */
const getProfile = asyncHandler(async (req, res) => {
    // req.user es inyectado por el middleware de autenticación (authMiddleware).
    // Si la autenticación es exitosa, req.user contiene los datos del usuario.
    const user = req.user; 

    if (user) {
        // Retornamos una copia limpia de los datos (sin contraseña ni token).
        res.status(200).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            // Nota: Aquí no se incluye la contraseña.
        });
    } else {
        // En teoría, el middleware debe atrapar esto antes, pero es una buena práctica.
        res.status(404);
        throw new Error('Usuario no autenticado o no encontrado.');
    }
});

/**
 * @desc    Actualizar el perfil del usuario actual
 * @route   PUT /api/users/profile
 * @access  Privado
 */
const updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user._id; 
    const updateData = req.body;

    // Delegamos al servicio la lógica de actualización, incluyendo el hasheo de la nueva contraseña (si se provee)
    const updatedUser = await userService.updateUserProfile(userId, updateData);

    res.status(200).json({
        message: 'Perfil actualizado exitosamente.',
        // Retornamos el nuevo estado del usuario.
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        token: updatedUser.token, // El servicio puede generar un nuevo token si se cambia info sensible como la contraseña.
    });
});

module.exports = {
    getProfile,
    updateProfile,
};
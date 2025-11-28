const { hashPassword } = require('../utils/hashPassword');
const generateToken = require('../utils/generateToken'); 

/**
 * @desc Busca un usuario por su ID y excluye el campo de la contraseña.
 * @param {string} userId - ID del usuario.
 * @returns {object} El objeto de usuario (sin el hash de la contraseña).
 */
const getUserById = async (userId) => {
    // Usar .select('-password') para excluir el campo de la contraseña de la respuesta.
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
        // NOTA: Es crucial que el controlador de Express maneje este error 404
        throw new Error('Usuario no encontrado.');
    }

    return user;
};


/**
 * @desc Actualiza el perfil de un usuario.
 * @param {string} userId - ID del usuario.
 * @param {object} updateData - Datos a actualizar ({username, email, newPassword}).
 * @returns {object} El objeto de usuario actualizado y un nuevo token.
 */
const updateUserProfile = async (userId, updateData) => {
    const user = await User.findById(userId);

    if (!user) {
        throw new Error('Usuario no encontrado.'); 
    }

    // 1. Actualizar campos simples
    user.username = updateData.username || user.username;
    
    // Solo actualizar el email si se proporciona
    if (updateData.email) {
        // En un caso real, aquí se debería verificar si el nuevo email ya existe
        user.email = updateData.email;
    }

    // 2. Manejo de Contraseña (si se proporciona)
    if (updateData.newPassword) {
        // Validación de longitud (Mongoose también lo hace, pero es una buena práctica aquí)
        if (updateData.newPassword.length < 6) {
             throw new Error('La contraseña debe tener al menos 6 caracteres.');
        }

        // Hashear la nueva contraseña antes de guardarla
        user.password = await hashPassword(updateData.newPassword);
    }
    
    // 3. Guardar el usuario en la base de datos
    const updatedUser = await user.save();

    // 4. Retornar los datos limpios y un nuevo token
    return {
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        // Generar un nuevo token, lo cual es importante si se cambió la contraseña
        token: generateToken(updatedUser._id), 
    };
};

module.exports = {
    getUserById,
    updateUserProfile,
};
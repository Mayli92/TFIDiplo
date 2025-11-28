const bcrypt = require('bcryptjs');

// Salto (salt) predeterminado: 10 es un valor seguro y recomendado para la mayoría de los casos.
const saltRounds = 10; 

/**
 * @desc Hashea una contraseña dada usando bcrypt.
 * @param {string} password - La contraseña en texto plano.
 * @returns {Promise<string>} La contraseña hasheada.
 */
const hashPassword = async (password) => {
    try {
        // Genera una "salt" (cadena aleatoria) que se combina con la contraseña.
        // El factor de costo (saltRounds) determina qué tan intensivo en CPU es el hasheo.
        const salt = await bcrypt.genSalt(saltRounds);
        
        // Hashea la contraseña combinando el texto plano y el salt generado.
        const hashedPassword = await bcrypt.hash(password, salt);
        
        return hashedPassword;
    } catch (error) {
        // Si hay un error, lo lanzamos para que sea capturado por el asyncHandler o el try/catch que llame a esta función.
        throw new Error('Error al hashear la contraseña.');
    }
};

/**
 * @desc Compara una contraseña en texto plano con un hash existente.
 * @param {string} password - La contraseña ingresada por el usuario (texto plano).
 * @param {string} hash - El hash almacenado en la base de datos.
 * @returns {Promise<boolean>} True si coinciden, False en caso contrario.
 */
const comparePassword = async (password, hash) => {
    // bcrypt.compare maneja el proceso de extraer el salt del hash 
    // y hashear la contraseña de texto plano para compararlas de forma segura.
    return await bcrypt.compare(password, hash);
};

module.exports = {
    hashPassword,
    comparePassword,
};
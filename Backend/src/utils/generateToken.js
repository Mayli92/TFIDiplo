const jwt = require('jsonwebtoken');

/**
 * Genera un JSON Web Token (JWT) para un usuario dado.
 * @param {string} userId - El ID del usuario para incluir en el token.
 * @returns {string} El token JWT generado.
 */
const generateToken = (userId) => {
    // La información que queremos almacenar en el payload del token (solo el ID en este caso)
    const payload = { id: userId };

    // Firmamos el token con la clave secreta y la expiración definidas en .env
    const token = jwt.sign(
        payload,
        process.env.JWT_SECRET, // Clave secreta (definida en .env)
        {
            expiresIn: process.env.JWT_EXPIRES_IN || '1d', // Tiempo de expiración (definido en .env)
        }
    );

    return token;
};

module.exports = { generateToken };
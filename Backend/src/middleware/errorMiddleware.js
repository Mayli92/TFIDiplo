const jwt = require('jsonwebtoken'); // Para verificar el token
const asyncHandler = require('express-async-handler'); // Para manejar errores asíncronos
const User = require('../models/UserModel'); // Para buscar al usuario por ID

/**
 * Middleware para proteger rutas que requieren autenticación (JWT).
 * * Verifica si el encabezado 'Authorization' contiene un token JWT válido.
 * Si es válido, adjunta el objeto 'user' a la petición (req.user) y pasa al siguiente middleware/controlador.
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Verificar si existe el token en el encabezado (Header)
    // El formato esperado es: "Authorization: Bearer <TOKEN>"
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // 2. Extraer el token: Se remueve "Bearer " del string
            token = req.headers.authorization.split(' ')[1];

            // 3. Verificar (Decodificar) el token con la clave secreta
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // 4. Buscar al usuario: Usamos el ID decodificado (payload: { id: userId })
            // Excluimos la contraseña (select('-password')) para mantener la seguridad.
            req.user = await User.findById(decoded.id).select('-password');

            // 5. Si no encuentra al usuario, lanzar error (token válido pero usuario no existe)
            if (!req.user) {
                res.status(401);
                throw new Error('Usuario no encontrado o token inválido.');
            }

            // 6. Continuar al siguiente middleware/controlador
            next();
            
        } catch (error) {
            // 7. Manejar errores de verificación (token expirado, inválido, malformado)
            console.error(error);
            res.status(401); // 401 Unauthorized
            throw new Error('No autorizado, token fallido o expirado.');
        }
    }

    // 8. Manejar el caso donde no se proporciona ningún token en el encabezado
    if (!token) {
        res.status(401); // 401 Unauthorized
        throw new Error('No autorizado, no hay token.');
    }
});

module.exports = { protect };
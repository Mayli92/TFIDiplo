//Middleware para manejar rutas no encontradas (404 Not Found).
//Esta función se debe colocar DESPUÉS de todas las rutas definidas en app.js.

const notFound = (req, res, next) => {
    // Crea un nuevo objeto Error indicando que la ruta no existe
    const error = new Error(`No Encontrado - ${req.originalUrl}`);
    // Establece el código de estado HTTP 404
    res.status(404);
    
    // Pasa el error al siguiente middleware (errorHandler)
    next(error);
};


/**
 * Middleware de manejo de errores centralizado.
 * Captura los errores lanzados por los controladores/servicios y los formatea.
 * * NOTA: Los middleware de manejo de errores siempre reciben 4 argumentos: (err, req, res, next)
 */
const errorHandler = (err, req, res, next) => {
    // Determinar el código de estado HTTP. 
    // Si res.statusCode ya fue establecido (ej: 404 en notFound o 400 en un controlador), lo usa.
    // Si no, por defecto usa 500 (Internal Server Error).
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    // Caso especial de errores de Mongoose (ej: CastError cuando un ID no es válido)
    // CastError indica que un ID no tiene el formato correcto de MongoDB (ObjectId)
    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        statusCode = 404; // Considerar 404 si el recurso no puede ser encontrado por ID malformado
        message = 'Recurso no encontrado. ID inválido.';
    }

    // Respuesta JSON final para el cliente (Frontend)
    res.status(statusCode).json({
        message: message,
        // En entorno de desarrollo, enviamos el stack trace para debugging.
        // En producción, es mejor ocultarlo por seguridad.
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = {
    notFound,
    errorHandler,
};
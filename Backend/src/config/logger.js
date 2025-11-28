const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, errors } = format;

// 1. Definición del Formato Personalizado (para la consola en desarrollo)
const logFormat = printf(({ level, message, timestamp, stack }) => {
    // Si hay un stack (error), lo incluimos
    if (stack) {
        return `${timestamp} ${level}: ${message} \n ${stack}`;
    }
    return `${timestamp} ${level}: ${message}`;
});

// 2. Creación de la instancia del Logger
const logger = createLogger({
    // Nivel base: info, warn, error, debug, etc.
    // En desarrollo/producción, generalmente se inicia en 'info' para capturar todo lo importante.
    level: process.env.NODE_ENV === 'development' ? 'debug' : 'info', 
    
    // Si el entorno no es 'development', usaremos formato JSON para logs estructurados
    format: combine(
        // Asegura que los errores tengan el stack trace capturado
        errors({ stack: true }), 
        // Agrega la marca de tiempo a cada log
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        // Formato para logs en archivos (útil en producción)
        format.json() 
    ),
    
    // 3. Definición de los Transportes (dónde se enviarán los logs)
    transports: [
        // a) Log a archivos de error (Solo errores)
        new transports.File({ filename: 'logs/error.log', level: 'error' }),
        
        // b) Log a archivos combinados (info, warn, error, etc.)
        new transports.File({ filename: 'logs/combined.log' }),
    ],
});

// 4. Agregar Transporte de Consola (Solo si no es entorno de producción)
if (process.env.NODE_ENV !== 'production') {
    logger.add(
        new transports.Console({
            format: combine(
                // Aplica color al nivel del log (ej: 'error' rojo, 'info' verde)
                colorize(), 
                // Utiliza el formato personalizado definido arriba
                logFormat 
            ),
        })
    );
}

module.exports = logger;
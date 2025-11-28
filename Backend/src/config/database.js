const mongoose = require('mongoose');

/**
 * Función para establecer la conexión a la base de datos MongoDB.
 * La URI de conexión se obtiene de las variables de entorno (.env)
 */
const connectDB = async () => {
    try {
        // Obtenemos la URI de la base de datos de las variables de entorno
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            console.error("🔴 ERROR: MONGO_URI no está definida en el archivo .env.");
            // Salimos del proceso si no hay URI para evitar errores de conexión
            process.exit(1);
        }

        // Conexión a la base de datos usando la URI
        const conn = await mongoose.connect(mongoURI);

        // Mensaje de éxito en la consola
        console.log(`✅ MongoDB conectado: ${conn.connection.host}`);

    } catch (error) {
        // Mensaje de error si la conexión falla
        console.error(`❌ Error de conexión a MongoDB: ${error.message}`);
        // Salimos del proceso con un código de error
        process.exit(1);
    }
};

// Exportamos la función para poder llamarla desde app.js
module.exports = { connectDB };
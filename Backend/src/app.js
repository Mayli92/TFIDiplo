const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

// Importar la configuración de la base de datos (se creará en el siguiente paso)
// const { connectDB } = require('./config/database');

// 2. CONFIGURACIÓN INICIAL
const app = express();
const PORT = process.env.PORT || 3000;

// 3. MIDDLEWARES GLOBALES
// Middleware para permitir CORS (Comunicación con el Frontend)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Ajustar al puerto de React
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
}));

// Middleware para parsear el cuerpo de las peticiones en formato JSON
app.use(express.json());

// Middleware para parsear datos de formularios (si se usa)
app.use(express.urlencoded({ extended: true }));


// 4. CONEXIÓN A LA BASE DE DATOS (Descomentar en el siguiente paso)
// connectDB();

// 5. RUTAS (Endpoints)
// Ruta de prueba
app.get('/', (req, res) => {
    res.send('API del Trabajo Práctico Integrador funcionando.');
});

// Ejemplo de cómo se importarían las rutas de las entidades:
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/users', userRoutes);


// 6. MANEJO DE ERRORES (Middleware para capturar errores 404 y generales)
// app.use(errorHandler); // Se implementará en src/middlewares/errorMiddleware.js

// 7. INICIO DEL SERVIDOR
app.listen(PORT, () => {
    console.log(`🚀 Servidor Express.js corriendo en el puerto ${PORT}`);
    console.log(`Accede a: http://localhost:${PORT}`);
});
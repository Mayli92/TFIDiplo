Proyecto de Programación Web - Plataforma de Gestión MERN

📄 Descripción

Este proyecto es una Plataforma de Gestión de E-commerce desarrollada como Trabajo Práctico Integrador en el marco de la asignatura de Programación Web.

La solución está dividida en dos partes:

-Frontend (Aplicación SPA con React): Una Single Page Application (SPA) construida en React que consume la API para realizar todas las operaciones de ABMC (Alta, Baja, Modificación, Consulta).

-Backend (API RESTful con Node.js/Express): Una API RESTful que gestiona la lógica de negocio, la conexión a la base de datos (MongoDB) y la autenticación de usuarios.

El objetivo es proveer un CRUD completo sobre dos entidades principales y de soporte para simular un sistema transaccional.
---------------------------------------------°°°°----------------------------------------------
🛠️ Entidades del Sistema

El proyecto implementa la gestión de las siguientes entidades (ejemplo):

Entidad
Tipo
Propiedades Clave
Relación
Producto
Principal
Nombre, Descripción, Precio, Stock
Compra
Soporte
---------------------------------------------------°°°°----------------------------------------
🚀 Funcionalidades Principales

Backend (API RESTful)

Autenticación y Autorización (JWT):

Endpoints de /auth/login y /auth/register.
Uso de JSON Web Tokens (JWT) para asegurar todas las rutas del CRUD, garantizando que solo usuarios autenticados puedan realizar operaciones.

Módulo de ABMC (CRUD completo):
Endpoints HTTP (GET, POST, PUT, DELETE) para gestionar la Entidad Principal (Producto) y la Entidad de Soporte (Compra).

Listado con paginación en las consultas (GET /api/productos).

Validación:
Implementación de validación de datos de entrada (e.g., usando express-validator) en los endpoints de registro, login y creación/modificación de entidades.

Logger:
Inclusión de un sistema de logging básico (e.g., con Winston o similar) para el registro de errores en archivos.

Frontend (SPA React)
Autenticación (Login/Registro):
Interfaces para el inicio de sesión y la creación de nuevas cuentas de usuario, consumiendo los endpoints del backend.

Módulo de ABMC:
Vistas dedicadas para la consulta (con paginado), alta, edición y eliminación de registros de la Entidad Principal (Producto).

Navegación SPA:
Uso de react-router-dom para una navegación fluida entre las pantallas sin recargas de página.

Uso de Hooks:
Utilización obligatoria de useState, useEffect y useContext para la gestión de estado, ciclo de vida y estado global de autenticación.
-------------------------------------------°°°°----------------------------------------------
💻 Tecnologías Utilizadas

Categoría: Tecnología
Base de Datos: MongoDB (a través de Mongoose)
Backend: Node.js, Express.js
Frontend: React, Tailwind CSS
Autenticación: JWT (JSON Web Tokens)
Validación: Express-validator (o similar)
Routing: react-router-dom
Otros:
Hosting gratuito: Despliegue en Vercel/Netlify/Render para acceso en línea.
Git: Uso de Git para el control de versiones y colaboración (se evaluará el flujo de ramas y merges).
------------------------------------------°°°°°---------------------------------------------
📁 Estructura del Proyecto

El proyecto sigue una arquitectura de capas clara, separando responsabilidades:

/
├── backend/
│   ├── src/
│   │   ├── controllers/   # Lógica de manejo de peticiones
│   │   ├── models/        # Esquemas de la base de datos (Mongoose)
│   │   ├── routes/        # Definición de endpoints
│   │   ├── services/      # Lógica de negocio pura
│   │   ├── middlewares/   # JWT, errores, validación
│   │   ├── config/        # Configuración de DB y Logger
│   │   └── app.js         # Configuración principal de Express
│   └── package.json
└── frontend/
    ├── src/
    │   ├── assets/        # Archivos estáticos
    │   ├── components/    # Componentes React reutilizables
    │   ├── hooks/         # Custom Hooks (useAuth, useFetch, etc.)
    │   ├── pages/         # Componentes para cada ruta/pantalla
    │   ├── services/      # Lógica de conexión a APIs (e.g., apiService.js)
    │   ├── utils/         # Funciones auxiliares
    │   ├── App.jsx        # Componente principal
    │   └── main.jsx       # Punto de entrada
    └── package.json

---------------------------------------°°°°--------------------------------------------------
⚙️ Instrucciones de Uso

Para ejecutar el proyecto en su entorno local, siga los siguientes pasos:

1. Clonar el Repositorio

git clone https://github.com/Mayli92/TFIDiplo.git
cd [TFIDiplo]


2. Configurar el Backend

cd backend
npm install
# Crear un archivo .env con las variables de entorno (PORT, MONGO_URI, JWT_SECRET, etc.)
npm start # O el script de inicio definido (e.g., npm run dev)


3. Configurar el Frontend

cd ../frontend
npm install
# Asegurarse de configurar la URL del backend si es necesario (ej: en el archivo .env o config)
npm start # O el script de inicio definido (e.g., npm run dev)


4. Acceder

API: La API estará disponible en http://localhost:3000 (o el puerto configurado).

Aplicación Web: El frontend estará disponible en http://localhost:5173 (o el puerto que asigne Vite/React).

👤 Contribuidores

Nombre de los Integrantes

Niripil, Mailen. 

Olmedo, Nadia.

---------------------------------------------°°°°°----------------------------------------------
🔗 Enlaces Importantes

URL de Despliegue (Frontend): [https://diplowebmern.vercel.app/]

URL de Despliegue (Backend API): [en render o versel]
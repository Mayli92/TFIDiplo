const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Necesitas instalarlo: npm install bcryptjs

const userSchema = new mongoose.Schema({
    // Nombre del usuario (se usará en el frontend)
    username: {
        type: String,
        required: [true, 'El nombre de usuario es obligatorio'],
        unique: true,
        trim: true,
        minlength: 3
    },
    // Email (servirá para el login)
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/.+\@.+\..+/, 'Por favor, introduce un email válido'] // Validación de formato
    },
    // Contraseña (se almacenará hasheada)
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
        select: false // No se enviará la contraseña en las consultas GET por defecto
    },
    // Rol (para futura autorización, ej: 'user', 'admin')
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true // Añade campos createdAt y updatedAt automáticamente
});

/**
 * Middleware de Mongoose: Hashear la contraseña antes de guardar (pre-save hook)
 * Esto asegura que la contraseña siempre se almacene encriptada.
 */
userSchema.pre('save', async function(next) {
    // Solo hashear si la contraseña ha sido modificada o es nueva
    if (!this.isModified('password')) {
        return next();
    }
    try {
        // Generar un salt (factor de complejidad)
        const salt = await bcrypt.genSalt(10);
        // Hashear la contraseña con el salt
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error); // Pasar el error al manejador de Express
    }
});

/**
 * Método de instancia: Comparar la contraseña ingresada con la hasheada
 * Se usará en el proceso de Login.
 */
userSchema.methods.matchPassword = async function(enteredPassword) {
    // Compara la contraseña en texto plano con el hash almacenado
    return await bcrypt.compare(enteredPassword, this.password);
};

// Exportamos el modelo
const User = mongoose.model('User', userSchema);
module.exports = User;
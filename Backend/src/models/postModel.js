const mongoose = require('mongoose');

// El Post debe tener al menos 4 propiedades, además de las relaciones.
const postSchema = new mongoose.Schema({
    // Propiedad 1: Título de la publicación
    title: {
        type: String,
        required: [true, 'El título es obligatorio'],
        trim: true,
        minlength: 5
    },
    // Propiedad 2: Contenido completo de la publicación
    content: {
        type: String,
        required: [true, 'El contenido es obligatorio'],
        minlength: 20
    },
    // Propiedad 3: Autor (Relación con la entidad User)
    // Esto es crucial para la autorización (solo el autor puede editar/borrar)
    author: {
        type: mongoose.Schema.Types.ObjectId, // Tipo de dato para ID de otra entidad
        ref: 'User', // Nombre del modelo al que hace referencia
        required: true
    },
    // Propiedad 4: Categoría (Relación con la entidad de soporte Category)
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: [true, 'La categoría es obligatoria']
    },
    // Propiedad 5: Estado de publicación (opcional pero útil)
    isPublished: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Añade createdAt y updatedAt
});

// Implementamos un índice para búsquedas rápidas por título
postSchema.index({ title: 'text' });

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
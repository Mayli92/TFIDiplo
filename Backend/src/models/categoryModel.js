const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    // Nombre de la categoría (ej: 'Tecnología', 'Viajes', 'Deportes')
    name: {
        type: String,
        required: [true, 'El nombre de la categoría es obligatorio'],
        unique: true,
        trim: true
    },
    // Descripción de la categoría (opcional)
    description: {
        type: String,
        default: 'Categoría sin descripción.'
    }
}, {
    timestamps: true
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
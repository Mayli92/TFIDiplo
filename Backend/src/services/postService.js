const Post = require('../models/postModel');
// No es necesario importar UserModel o CategoryModel ya que Mongoose los maneja
// con 'ref' y populate.

// --- CONFIGURACIÓN DE PAGINACIÓN ---
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

/**
 * Servicio para obtener todas las publicaciones con paginación.
 * @param {number} page - Número de página actual (base 1).
 * @param {number} limit - Cantidad de posts por página.
 * @param {string} filter - Criterios de búsqueda (ej: por título).
 * @returns {object} Objeto con la data (posts) y metadatos de paginación.
 */
const getAllPosts = async (page = 1, limit = DEFAULT_LIMIT, filter = '') => {
    // Aseguramos que el límite no exceda un máximo
    const pageSize = Math.min(parseInt(limit, 10) || DEFAULT_LIMIT, MAX_LIMIT);
    const currentPage = parseInt(page, 10) || 1;
    const skip = (currentPage - 1) * pageSize;

    // Criterios de búsqueda (filtro opcional por título)
    const query = filter ? { title: { $regex: new RegExp(filter, 'i') } } : {};

    // 1. Obtener la cantidad total de documentos que coinciden con el filtro
    const totalItems = await Post.countDocuments(query);

    // 2. Ejecutar la consulta con paginación y popular referencias
    const posts = await Post.find(query)
        .sort({ createdAt: -1 }) // Ordenar por más reciente
        .skip(skip)
        .limit(pageSize)
        .populate('author', 'username email') // Solo username y email del autor
        .populate('category', 'name') // Solo el nombre de la categoría
        .exec(); // Ejecutar la consulta

    // 3. Calcular metadatos de paginación
    const totalPages = Math.ceil(totalItems / pageSize);
    
    return {
        posts,
        pagination: {
            totalItems,
            totalPages,
            currentPage,
            pageSize,
            hasNextPage: currentPage < totalPages,
            hasPrevPage: currentPage > 1,
        }
    };
};

/**
 * Servicio para obtener una publicación por su ID.
 * @param {string} id - ID de la publicación.
 * @returns {Post} El objeto Post encontrado.
 */
const getPostById = async (id) => {
    const post = await Post.findById(id)
        .populate('author', 'username email')
        .populate('category', 'name');

    if (!post) {
        throw new Error('Publicación no encontrada.');
    }
    return post;
};

/**
 * Servicio para crear una nueva publicación.
 * @param {object} postData - Datos del post (title, content, category, etc.).
 * @param {string} authorId - ID del usuario autenticado (req.user._id).
 * @returns {Post} El objeto Post creado.
 */
const createPost = async (postData, authorId) => {
    // Creamos la publicación asegurando que el ID del autor se incluya
    const post = await Post.create({
        ...postData,
        author: authorId,
    });

    // Opcional: Popular las referencias para la respuesta inmediata
    const createdPost = await Post.findById(post._id)
        .populate('author', 'username email')
        .populate('category', 'name');

    return createdPost;
};

/**
 * Servicio para actualizar una publicación.
 * @param {string} id - ID de la publicación a actualizar.
 * @param {object} updateData - Datos a actualizar.
 * @param {string} userId - ID del usuario que intenta actualizar (para autorización).
 * @returns {Post} El objeto Post actualizado.
 */
const updatePost = async (id, updateData, userId) => {
    // 1. Encontrar la publicación
    const post = await Post.findById(id);

    if (!post) {
        throw new Error('Publicación no encontrada.');
    }

    // 2. Verificar la autorización: Solo el autor puede modificar el post
    // Compara el ID del autor del post con el ID del usuario logueado
    if (post.author.toString() !== userId.toString()) {
        throw new Error('No autorizado. Solo el autor puede modificar esta publicación.');
    }

    // 3. Actualizar los campos
    const updatedPost = await Post.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true } // new: true devuelve el doc actualizado, runValidators: true aplica validaciones del Schema
    )
        .populate('author', 'username email')
        .populate('category', 'name');

    return updatedPost;
};

/**
 * Servicio para eliminar una publicación.
 * @param {string} id - ID de la publicación a eliminar.
 * @param {string} userId - ID del usuario que intenta eliminar (para autorización).
 */
const deletePost = async (id, userId) => {
    // 1. Encontrar la publicación
    const post = await Post.findById(id);

    if (!post) {
        throw new Error('Publicación no encontrada.');
    }

    // 2. Verificar la autorización: Solo el autor puede eliminar el post
    if (post.author.toString() !== userId.toString()) {
        throw new Error('No autorizado. Solo el autor puede eliminar esta publicación.');
    }

    // 3. Eliminar la publicación
    await Post.findByIdAndDelete(id);

    // No retorna nada, solo confirma la eliminación
    return { message: 'Publicación eliminada exitosamente.' };
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost,
};
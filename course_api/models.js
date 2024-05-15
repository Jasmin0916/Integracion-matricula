const mongoose = require('mongoose');
const { courseSchema } = require('./schemas');  // Asegúrate de que el nombre del esquema sea el correcto

const courseModel = mongoose.model('Course', courseSchema);  // Nombre correcto del modelo

module.exports = { courseModel };

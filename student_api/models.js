const mongoose = require('mongoose');
const { studentSchema } = require('./schemas');  // Corregir el nombre del esquema importado

const studentModel = mongoose.model('Student', studentSchema);  // Correcto nombre del modelo

module.exports = { studentModel };

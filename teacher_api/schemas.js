const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }] // Referencia a los cursos que enseña
});

module.exports = { teacherSchema };

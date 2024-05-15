const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  credits: { type: Number, required: true },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }, // Referencia al docente que imparte el curso
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }], // Lista de estudiantes matriculados
  notes: [{ student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }, note: { type: Number, required: true } }] // Notas de los estudiantes en el curso
});

module.exports = { courseSchema };

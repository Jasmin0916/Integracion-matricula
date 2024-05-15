const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  courses: [{
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    note: { type: Number, required: true } // Nota del estudiante en ese curso
  }]
});

module.exports = { studentSchema };

const mongoose = require('mongoose');
const { teacherSchema } = require('./schemas');  

const teacherModel = mongoose.model('Teacher', teacherSchema); 

module.exports = { teacherModel };

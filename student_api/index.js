const express = require("express");
const mongoose = require('mongoose');
const { studentModel } = require('./models');
const { studentCourseServices } = require('./services/courseServices');

const uri = 'mongodb+srv://Integracion:integracion123@cluster0.mppyz97.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri);
const app = express();
app.use(express.json());
const port = 8081;

// Endpoint para crear un nuevo alumno en el sistema
app.post('/students', async (req, res) => {
    try {
        const newStudent = new studentModel(req.body);
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint para obtener la información de un alumno específico por su código
app.get('/students/:code', async (req, res) => {
    try {
        const student = await studentModel.findOne({ code: req.params.code });
        if (!student) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        res.json(student);
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint para que los alumnos vean los cursos en los que están matriculados y sus notas
app.get('/students/:code/courses', async (req, res) => {
    try {
        const student = await studentModel.findOne({ code: req.params.code });
        if (!student) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        const courses = await studentCourseServices.getStudentCourses(student.code);
        res.json(courses);
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint para que los alumnos se matriculen en un curso
app.post('/students/:code/enroll', async (req, res) => {
    try {
        const student = await studentModel.findOne({ code: req.params.code });
        if (!student) {
            return res.status(404).json({ message: 'Estudiante no encontrado' });
        }
        const { courseCode } = req.body;
        const result = await studentCourseServices.enrollStudent(courseCode, student.code);
        res.json(result);
    } catch (error) {
        console.log('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Servicio de Alumnos escuchando en el puerto ${port}`);
});

const express = require("express");
const mongoose = require('mongoose');
const { teacherModel } = require('./models');
const { teacherCourseServices } = require('./services/courseServices');

const uri = 'mongodb+srv://Integracion:integracion123@cluster0.mppyz97.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri);
const app = express();
app.use(express.json());
const port = 8081;

// Endpoint para obtener todos los docentes
app.get('/teachers', async(req, res)=>{
    const list = await teacherModel.find({});
    res.json( list );
});

// Endpoint para ingresar un nuevo docente al sistema
app.post('/teachers', async (req, res) => {
    try {
        const newTeacher = new teacherModel(req.body);
        await newTeacher.save();
        res.status(201).json(newTeacher);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint para obtener la información de un docente específico por su código
app.get('/teachers/:code', async (req, res) => {
    try {
        const teacher = await teacherModel.findOne({ code: req.params.code });
        if (!teacher) {
            return res.status(404).json({ message: 'Docente no encontrado' });
        }
        res.json(teacher);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint para que los docentes vean los cursos en los que están asignados y la cantidad de alumnos matriculados
app.get('/teachers/:code/courses', async (req, res) => {
    try {
        const teacher = await teacherModel.findOne({ code: req.params.code });
        if (!teacher) {
            return res.status(404).json({ message: 'Docente no encontrado' });
        }
        const courses = await teacherCourseServices.getTeacherCourses(teacher.code);
        res.json(courses);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint para que los docentes registren las notas de los alumnos en sus cursos
app.put('/teachers/:code/courses/:courseCode/grades', async (req, res) => {
    try {
        const { studentId, grade } = req.body;
        const teacher = await teacherModel.findOne({ code: req.params.code });
        if (!teacher) {
            return res.status(404).json({ message: 'Docente no encontrado' });
        }
        const result = await teacherCourseServices.assignGrade(req.params.courseCode, studentId, grade);
        res.json(result);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Servicio de Docentes escuchando en el puerto ${port}`);
});

module.exports = app;

const express = require("express");
const mongoose = require('mongoose');
const { courseModel } = require('./models');

const uri = 'mongodb+srv://Integracion:integracion123@cluster0.mppyz97.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri);
const app = express();
app.use(express.json());
const port = 8080;

app.get('/', (req, res) => { 
    res.send("I am alive Course"); 
});
// Endpoint para crear un nuevo curso
app.post('/courses', async (req, res) => {
    try {
        const { code, name, credits, teacher } = req.body;

        // Verificar si el código del curso ya existe
        const existingCourse = await courseModel.findOne({ code });
        if (existingCourse) {
            return res.status(400).json({ message: 'El código del curso ya existe' });
        }

        // Crear un nuevo curso
        const newCourse = new courseModel({ code, name, credits, teacher });
        await newCourse.save();

        res.status(201).json(newCourse);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint para obtener todos los cursos
app.get('/courses', async (req, res) => {
    try {
        const courses = await courseModel.find({});
        res.json(courses);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint para obtener un curso por su código
app.get('/courses/:code', async (req, res) => {
    try {
        const course = await courseModel.findOne({ code: req.params.code });
        if (!course) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        res.json(course);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint para que los docentes vean los cursos en los que están asignados y la cantidad de alumnos matriculados
app.get('/courses/teachers/:teacherId', async (req, res) => {
    try {
        const courses = await teacherCourseServices.getTeacherCourses(req.params.teacherId);
        res.json(courses);
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint para que los docentes pongan las notas de los alumnos en un curso específico
app.put('/courses/:courseCode/grades', async (req, res) => {
    try {
        const { studentId, grade } = req.body;
        const course = await courseModel.findOne({ code: req.params.courseCode });
        if (!course) {
            return res.status(404).json({ message: 'Curso no encontrado' });
        }
        const studentIndex = course.students.findIndex(student => student.toString() === studentId);
        if (studentIndex === -1) {
            return res.status(404).json({ message: 'Estudiante no encontrado en el curso' });
        }
        course.notes.push({ student: studentId, grade });
        await course.save();
        res.status(200).json({ message: 'Nota asignada exitosamente al estudiante' });
    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Servicio de Cursos escuchando en el puerto ${port}`);
});

module.exports = app;

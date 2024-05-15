const axios = require("axios");

// Funciones para estudiantes
const studentCourseServices = {
    getCourses: async function () {
        try {
            const response = await axios.get("http://localhost:8080/courses");
            return response.data;
        } catch (error) {
            console.error("Error al obtener los cursos para estudiantes:", error);
            throw error;
        }
    },

    enrollStudent: async function (courseCode, studentCode) {
        try {
            const response = await axios.post(`http://localhost:8080/courses/${courseCode}/enroll`, { studentCode });
            return response.data;
        } catch (error) {
            console.error(`Error al matricular al estudiante ${studentCode} en el curso ${courseCode}:`, error);
            throw error;
        }
    },

    getStudentCourses: async function (studentCode) {
        try {
            const response = await axios.get(`http://localhost:8080/students/${studentCode}/courses`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener los cursos del estudiante ${studentCode}:`, error);
            throw error;
        }
    }
};

module.exports = { studentCourseServices };

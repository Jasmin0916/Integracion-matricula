const axios = require("axios");

const teacherCourseServices = {
    // Función para obtener todos los cursos disponibles
    getCourses: async function () {
        try {
            const response = await axios.get("http://localhost:8080/courses");
            return response.data;
        } catch (error) {
            console.error("Error al obtener los cursos para docentes:", error);
            throw error;
        }
    },

    // Función para obtener los cursos asignados a un docente específico
    getTeacherCourses: async function (teacherCode) {
        try {
            const response = await axios.get(`http://localhost:8080/teachers/${teacherCode}/courses`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener los cursos del docente ${teacherCode}:`, error);
            throw error;
        }
    }
};

module.exports = { teacherCourseServices };

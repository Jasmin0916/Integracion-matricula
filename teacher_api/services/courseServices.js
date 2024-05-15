const axios = require("axios");

const teacherCourseServices = {
    getCourses: async function () {
        try {
            const response = await axios.get("http://localhost:8080/courses");
            return response.data;
        } catch (error) {
            console.error("Error al obtener los cursos para docentes:", error);
            throw error;
        }
    },

    getTeacherCourses: async function (teacherId) {
        try {
            const response = await axios.get(`http://localhost:8080/teachers/${teacherId}/courses`);
            return response.data;
        } catch (error) {
            console.error(`Error al obtener los cursos del docente ${teacherId}:`, error);
            throw error;
        }
    }
};

module.exports = {teacherCourseServices };
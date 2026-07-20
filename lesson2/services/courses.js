// Service for courses
const courses = require('../data/courses');

function getCourses() {
  return courses;
}

function getCourseById(id) {
  return courses.find((course) => course.idCourse === id);
}

function createCourse(data) {
  const newCourse = {
    idCourse: courses.length ? Math.max(...courses.map((course) => course.idCourse)) + 1 : 1,
    nameCourse: data.nameCourse || data.name || '',
    description: data.description || data.des || ''
  };

  courses.push(newCourse);
  return newCourse;
}

function updateCourse(id, updates) {
  const course = getCourseById(id);
  if (!course) return null;

  if (updates.nameCourse || updates.name) {
    course.nameCourse = updates.nameCourse || updates.name;
  }

  if (updates.description || updates.des) {
    course.description = updates.description || updates.des;
  }

  return course;
}

function deleteCourse(id) {
  const index = courses.findIndex((course) => course.idCourse === id);
  if (index === -1) return null;

  const [deletedCourse] = courses.splice(index, 1);
  return deletedCourse;
}

module.exports = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
};

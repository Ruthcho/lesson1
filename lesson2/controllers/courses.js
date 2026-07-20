// Controller for courses
const {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse
} = require('../services/courses');

function getCoursesController(req, res) {
  res.json(getCourses());
}

function getCourseByIdController(req, res) {
  const courseId = parseInt(req.params.id);
  const course = getCourseById(courseId);

  if (!course) return res.status(404).json({ message: 'הקורס לא נמצא' });

  res.json(course);
}

function createCourseController(req, res) {
  const newCourse = createCourse(req.body);
  res.status(201).json(newCourse);
}

function updateCourseController(req, res) {
  const courseId = parseInt(req.params.id);
  const updatedCourse = updateCourse(courseId, req.body);

  if (!updatedCourse) return res.status(404).json({ message: 'הקורס לא נמצא' });

  res.json(updatedCourse);
}

function deleteCourseController(req, res) {
  const courseId = parseInt(req.params.id);
  const deletedCourse = deleteCourse(courseId);

  if (!deletedCourse) return res.status(404).json({ message: 'הקורס לא נמצא' });

  res.json({ message: 'הקורס נמחק בהצלחה' });
}

module.exports = {
  getCoursesController,
  getCourseByIdController,
  createCourseController,
  updateCourseController,
  deleteCourseController
};

// Routes for courses
const express = require('express');
const router = express.Router();
const {
  getCoursesController,
  getCourseByIdController,
  createCourseController,
  updateCourseController,
  deleteCourseController
} = require('../controllers/courses');

router.get('/', getCoursesController);
router.get('/:id', getCourseByIdController);
router.post('/', createCourseController);
router.put('/:id', updateCourseController);
router.delete('/:id', deleteCourseController);

module.exports = router;

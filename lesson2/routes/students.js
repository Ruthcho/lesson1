// Routes for students
const express = require('express');
const router = express.Router();
const {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController
} = require('../controllers/students');

router.get('/', getStudentsController);
router.get('/:id', getStudentByIdController);
router.post('/', createStudentController);
router.put('/:id', updateStudentController);
router.delete('/:id', deleteStudentController);

module.exports = router;

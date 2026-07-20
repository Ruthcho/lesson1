// Controller for students
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent
} = require('../services/students');

function getStudentsController(req, res) {
  res.json(getStudents());
}

function getStudentByIdController(req, res) {
  const studentId = parseInt(req.params.id);
  const student = getStudentById(studentId);

  if (!student) return res.status(404).json({ message: 'התלמיד לא נמצא' });

  res.json(student);
}

function createStudentController(req, res) {
  const { name } = req.body;
  const newStudent = createStudent(name);

  res.status(201).json(newStudent);
}

function updateStudentController(req, res) {
  const studentId = parseInt(req.params.id);
  const updatedStudent = updateStudent(studentId, req.body);

  if (!updatedStudent) return res.status(404).json({ message: 'התלמיד לא נמצא' });

  res.json(updatedStudent);
}

function deleteStudentController(req, res) {
  const studentId = parseInt(req.params.id);
  const deletedStudent = deleteStudent(studentId);

  if (!deletedStudent) return res.status(404).json({ message: 'התלמיד לא נמצא' });

  res.json({ message: 'התלמיד נמחק מהמערכת בהצלחה' });
}

module.exports = {
  getStudentsController,
  getStudentByIdController,
  createStudentController,
  updateStudentController,
  deleteStudentController
};

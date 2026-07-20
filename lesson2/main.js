// 1. ייבוא ספריית express לתוך הקובץ
const express = require('express');

// 2. יצירת מופע (Instance) של אפליקציית אקספרס
const app = express();

// 3. הגדרת פורט (Port) שעליו יאזין השרת
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

const authMiddleware = require('./middleware/auth');

app.use(authMiddleware);

const {
  getCoursesController
} = require('./controllers/courses');

const {
  getStudentsController
} = require('./controllers/students');

const coursesRouter = require('./routes/courses');
const studentsRouter = require('./routes/students');
const registrationRouter = require('./routes/registration');

// ---------------- נתיבים (Routes) ----------------

app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'השרת עובד בהצלחה!',
    description: 'זהו שרת אקספרס בסיסי המציג נתוני קורסים וסטודנטים'
  });
});

app.get('/courses', getCoursesController);
app.get('/students', getStudentsController);

app.use('/api/courses', coursesRouter);
app.use('/api/students', studentsRouter);
app.use('/api/enrollments', registrationRouter);

app.listen(PORT, () => {
  console.log(`השרת רץ בהצלחה בכתובת: http://localhost:${PORT}`);
});

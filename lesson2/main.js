

// 1. ייבוא ספריית express לתוך הקובץ
const express = require('express');

// 2. יצירת מופע (Instance) של אפליקציית אקספרס
const app = express();

// 3. הגדרת פורט (Port) שעליו יאזין השרת
const PORT = 3000;

// 4. ייבוא נתוני הקורסים והסטודנטים מהקבצים שיצרנו
const coursesData = require('./courses');
const studentsData = require('./students');

// Middleware to parse JSON bodies
app.use(express.json());

// Local aliases that match the data files
const courses = coursesData;
const students = studentsData;
// enrollments stored in-memory for now
const enrollments = [];

// ---------------- נתיבים (Routes) ----------------

// נתיב 1: דף הבית הבסיסי (http://localhost:3000)
app.get('/', (req, res) => {
    // החזרת אובייקט JSON פשוט עם מידע קצר על השרת
    res.json({
        status: "success",
        message: "השרת עובד בהצלחה!",
        description: "זהו שרת אקספרס בסיסי המציג נתוני קורסים וסטודנטים"
    });
});

// נתיב 2: רשימת הקורסים (http://localhost:3000/courses)
app.get('/courses', (req, res) => {
    // החזרת מערך הקורסים שייבאנו מהקובץ החיצוני בפורמט JSON
  res.json(courses);
});

// נתיב 3: רשימת הסטודנטים (http://localhost:3000/students)
app.get('/students', (req, res) => {
    // החזרת מערך הסטודנטים שייבאנו מהקובץ החיצוני בפורמט JSON
    res.json(students);
});
// הגדרת ראוט מסוג GET שמצפה לקבל פרמטר משתנה בשם id
app.get('/api/courses/:id', (req, res) => {
  // חילוץ ה-id מתוך הכתובת והמרתו למספר שלם
  const courseId = parseInt(req.params.id);
  // חיפוש הקורס המתאים במערך לפי המזהה שלו
  const course = courses.find(c => c.idCourse === courseId);
  
  // אם הקורס לא נמצא, מחזירים סטטוס שגיאה 404 והודעה מתאימה
  if (!course) return res.status(404).json({ message: "הקורס לא נמצא" });
  
  // אם נמצא, מחזירים את אובייקט הקורס הבודד ללקוח
  res.json(course);
});
// הגדרת ראוט מסוג POST ליצירת קורס חדש
app.post('/api/courses', (req, res) => {
  // חילוץ הנתונים שנשלחו בגוף הבקשה מה-HTML/Fetch
  const { name, des } = req.body;
  
  // יצירת אובייקט קורס חדש עם מזהה ייחודי אוטומטי
  const newCourse = {
    idCourse: courses.length + 1,
    nameCourse: name,
    description: des
  };
  
  courses.push(newCourse);
  res.status(201).json(newCourse);
});
app.put('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const { name, des } = req.body;
  
  const course = courses.find(c => c.idCourse === courseId);
  if (!course) return res.status(404).json({ message: "הקורס לא נמצא" });
  
  course.nameCourse = name || course.nameCourse;
  course.description = des || course.description;
  
  res.json(course);
});
app.delete('/api/courses/:id', (req, res) => {
  const courseId = parseInt(req.params.id);
  const courseIndex = courses.findIndex(c => c.idCourse === courseId);
  

  if (courseIndex === -1) return res.status(404).json({ message: "הקורס לא נמצא" });
  
 
  courses.splice(courseIndex, 1);
 
  res.json({ message: "הקורס נמחק בהצלחה" });
});

app.get('/api/students/:id', (req, res) => {

  const studentId = parseInt(req.params.id);

  const student = students.find(s => s.id === studentId);
  

  if (!student) return res.status(404).json({ message: "התלמיד לא נמצא" });
  
 
  res.json(student);
});

app.post('/api/students', (req, res) => {

  const { name } = req.body;


  const newStudent = {
    id: students.length ? Math.max(...students.map(s => s.id)) + 1 : 1,
    name: name
  };

  // דחיפת התלמיד החדש לתוך מערך התלמידים בשרת
  students.push(newStudent);
  // החזרת סטטוס 201 יחד עם פרטי התלמיד שנוצר
  res.status(201).json(newStudent);
});
// הגדרת ראוט מסוג PUT לעדכון תלמיד לפי מזהה
app.put('/api/students/:id', (req, res) => {
  // חילוץ המזהה של התלמיד מה-URL
  const studentId = parseInt(req.params.id);
  // חילוץ הפרטים החדשים שרוצים לעדכן מתוך גוף הבקשה
  const { name } = req.body;

  // חיפוש התלמיד הקיים במערכת
  const student = students.find(s => s.id === studentId);
  // אם לא נמצא, נחזיר שגיאה 404 ונפסיק את הריצה
  if (!student) return res.status(404).json({ message: "התלמיד לא נמצא" });

  // עדכון השם אם סופק
  if (name) student.name = name;

  // שליחת האובייקט המעודכן חזרה ללקוח
  res.json(student);
});
// הגדרת ראוט מסוג DELETE למחיקת תלמיד
app.delete('/api/students/:id', (req, res) => {
  // חילוץ המזהה מתוך הכתובת
  const studentId = parseInt(req.params.id);
  // מציאת המיקום של התלמיד בתוך המערך
  const studentIndex = students.findIndex(s => s.id === studentId);
  
  // אם התלמיד לא נמצא במערך, נחזיר שגיאה 404
  if (studentIndex === -1) return res.status(404).json({ message: "התלמיד לא נמצא" });
  
  // מחיקת התלמיד מהמערך על פי האינדקס שלו
  students.splice(studentIndex, 1);
  // החזרת הודעת הצלחה
  res.json({ message: "התלמיד נמחק מהמערכת בהצלחה" });
});
// הגדרת ראוט מסוג GET לקבלת כל הרישומים לקורסים
app.get('/api/enrollments', (req, res) => {
  // החזרת המערך המלא של כל הרישומים
  res.json(enrollments);
});
// הגדרת ראוט מסוג GET לקבלת רישום ספציפי
app.get('/api/enrollments/:id', (req, res) => {
  // חילוץ המזהה מהכתובת
  const enrollmentId = parseInt(req.params.id);
  // חיפוש הרישום הספציפי במערך
  const enrollment = enrollments.find(e => e.id === enrollmentId);
  
  // אם לא קיים רישום כזה, נחזיר שגיאה 404
  if (!enrollment) return res.status(404).json({ message: "הרישום לא נמצא" });
  
  // החזרת פרטי הרישום שנמצא
  res.json(enrollment);
});
// הגדרת ראוט מסוג POST לרישום תלמיד לקורס
app.post('/api/enrollments', (req, res) => {
  // חילוץ מזהה התלמיד ומזהה הקורס מתוך גוף הבקשה (req.body)
  const { studentId, courseId } = req.body;
  
  // בניית אובייקט רישום חדש עם תאריך נוכחי
  const newEnrollment = {
    id: enrollments.length + 1,
    studentId: parseInt(studentId),
    courseId: parseInt(courseId),
    date: new Date().toISOString().split('T')[0] // מפיק תאריך בפורמט YYYY-MM-DD
  };
  
  // הוספת הרישום החדש למערך הרישומים בשרת
  enrollments.push(newEnrollment);
  // החזרת סטטוס הצלחה 210 והאובייקט שנוצר
  res.status(201).json(newEnrollment);
});
// הגדרת ראוט מסוג PUT לעדכון רישום לפי מזהה הרישום
app.put('/api/enrollments/:id', (req, res) => {
  // חילוץ מזהה הרישום מהכתובת
  const enrollmentId = parseInt(req.params.id);
  // חילוץ מזהה הקורס החדש או התלמיד החדש מתוך req.body
  const { studentId, courseId } = req.body;
  
  // חיפוש הרישום הקיים במערך
  const enrollment = enrollments.find(e => e.id === enrollmentId);
  // הגנה: אם הרישום לא נמצא, נחזיר שגיאה 404
  if (!enrollment) return res.status(404).json({ message: "הרישום לא נמצא" });
  
  // עדכון מזהי התלמיד והקורס ברישום הקיים
  enrollment.studentId = parseInt(studentId);
  enrollment.courseId = parseInt(courseId);
  
  // החזרת אובייקט הרישום המעודכן
  res.json(enrollment);
});
// הגדרת ראוט מסוג DELETE לביטול רישום
app.delete('/api/enrollments/:id', (req, res) => {
  // חילוץ מזהה הרישום מהכתובת
  const enrollmentId = parseInt(req.params.id);
  // מציאת המיקום של הרישום במערך
  const enrollmentIndex = enrollments.findIndex(e => e.id === enrollmentId);
  
  // אם לא נמצא רישום כזה, נחזיר שגיאה 404
  if (enrollmentIndex === -1) return res.status(404).json({ message: "הרישום לא נמצא" });
  
  // הסרת הרישום מהמערך (ביטול הרישום בפועל)
  enrollments.splice(enrollmentIndex, 1);
  // החזרת הודעת אישור על ביטול הרישום בהצלחה
  res.json({ message: "הרישום בוטל בהצלחה" });
});
// 5. הפעלת השרת והאזנה לפורט שהגדרנו
app.listen(PORT, () => {
    console.log(`השרת רץ בהצלחה בכתובת: http://localhost:${PORT}`);
});

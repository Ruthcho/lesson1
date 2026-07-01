

// 1. ייבוא ספריית express לתוך הקובץ
const express = require('express');

// 2. יצירת מופע (Instance) של אפליקציית אקספרס
const app = express();

// 3. הגדרת פורט (Port) שעליו יאזין השרת
const PORT = 3000;

// 4. ייבוא נתוני הקורסים והסטודנטים מהקבצים שיצרנו
const coursesData = require('./courses');
const studentsData = require('./students');

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
    res.json(coursesData);
});

// נתיב 3: רשימת הסטודנטים (http://localhost:3000/students)
app.get('/students', (req, res) => {
    // החזרת מערך הסטודנטים שייבאנו מהקובץ החיצוני בפורמט JSON
    res.json(studentsData);
});

// 5. הפעלת השרת והאזנה לפורט שהגדרנו
app.listen(PORT, () => {
    console.log(`השרת רץ בהצלחה בכתובת: http://localhost:${PORT}`);
});
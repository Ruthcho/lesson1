
 const courses=[{
"idCourse":1,
"nameCourse":"math",
"description":"Discover the practical power of mathematics through real-world applications, logical reasoning, and essential quantitative skills."
 },
 {"idCourse":2,
    "nameCourse":"english",
    "description":"learning busines english,small talk tosecced in the world"
 },
 {"idCourse":3,
    "nameCourse":"js",
    "description":"to be a perfect fronted developer"
 }
]
import chalk from 'chalk';


courses.forEach(e => {
    console.log(chalk.green.bold(e.idCourse),
    chalk.blue(e.nameCourse),
chalk.yellow(e.description))
});
import http from 'http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
res.end(JSON.stringify(courses));
});

server.listen(3000, () => {
  console.log('השרת רץ ומקשיב בכתובת ');
});


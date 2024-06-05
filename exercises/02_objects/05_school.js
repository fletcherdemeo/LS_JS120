// Examples of created student objects with grades; methods
// on the objects are not shown here for brevity. The
// following are only showing the properties that aren't
// methods for the three objects

function createStudent(name, year) {
  return {
    name, 
    year,
    courses: [],

    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    listCourses() {
      return this.courses;
    },

    addNote(code, note) {
      this.courses.forEach(course => {
        if (course["code"] === code) {
          course["notes"] = course["notes"] || [];
          course["notes"].push(note);
        }
      })
    },

    updateNote(code, note) {
      this.courses.forEach(course => {
        if (course["code"] === code) {
          course["notes"] = [note];
        }
      })
    },
    
    viewNotes() {
      this.courses.forEach(course => {
        if (course.hasOwnProperty("notes")) {
          console.log(`${course['name']}: ${course['notes'].join('; ')}`);
        }
      })
    }
  }
}

let school = {
  students: [],
  courses: {},

  addStudent(name, year) {
    if (!['1st', '2nd', '3rd', '4th', '5th'].includes(year)) {
      console.log('Invalid Year');
    } else {
      let student = createStudent(name, year);
      this.students.push(student);
    }
  },

  enrollStudent(course, student) {
    this.courses[course] = this.courses[course] || [];
    this.courses[course].push(student);
  },

  getReportCard(student) {
    student.courses.forEach(course => {
      let grade = course.hasOwnProperty("grade") ? course.grade : 'In progress';
      console.log(`${course.name}: ${grade}`);
    })
  },

  getEnrolledStudentGrades(courseName) {
    let enrolledStudents = this.courses[courseName];

    return enrolledStudents.map(student => {
      let relCourse = student.courses.filter(course => course.name === courseName)[0];
      return {'name': student.name, 'grade': relCourse.grade};
    })
  },

  logCourseReport(courseName, studentGrades, averageGrade) {
    console.log(`=${courseName} Grades=`);
    studentGrades.forEach(studentGrade => {
      console.log(`${studentGrade.name}: ${studentGrade.grade}`);
    })
    console.log(`---`);
    console.log(`Course Average: ${averageGrade}`);
  },

  courseReport(courseName) {
    let studentGrades = this.getEnrolledStudentGrades(courseName);
    let courseGrades = studentGrades.filter(student => {
      return student.grade;
    })

    if (!this.courses[courseName] || courseGrades.length === 0) {
      console.log(undefined);
      return;
    }
    
    let averageGrade = courseGrades.reduce((acc, curr) => {
      return acc + curr.grade
    }, 0) / courseGrades.length;

    this.logCourseReport(courseName, courseGrades, averageGrade);
  }
}

let paul = {
  name: 'Paul',
  year: '3rd',
  courses: [
    { name: 'Math', code: 101, grade: 95, },
    { name: 'Advanced Math', code: 102, grade: 90, },
    { name: 'Physics', code: 202, }
  ],
}

let mary = {
  name: 'Mary',
  year: '1st',
  courses: [
    { name: 'Math', code: 101, grade: 91, },
  ],
}

let kim = {
  name: 'Kim',
  year: '2nd',
  courses: [
    { name: 'Math', code: 101, grade: 93, },
    { name: 'Advanced Math', code: 102, grade: 90, },
  ],
}

school.enrollStudent('Math', paul);
school.enrollStudent('Advanced Math', paul);
school.enrollStudent('Physics', paul);

school.enrollStudent('Math', mary);

school.enrollStudent('Math', kim);
school.enrollStudent('Advanced Math', kim);

school.getReportCard(paul);
console.log('\n');
// = Math: 95
// = Advanced Math: 90
// = Physics: In progress

school.courseReport('Math');
console.log('\n');
// = =Math Grades=
// = Paul: 95
// = Mary: 91
// = Kim: 93
// = ---
// = Course Average: 93

school.courseReport('Advanced Math');
console.log('\n');
// = =Advanced Math Grades=
// = Paul: 90
// = Kim: 90
// = ---
// = Course Average: 90

school.courseReport('Physics');
// console.log('\n');
// = undefined
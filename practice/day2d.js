const student = {
    name: "Vedant",
    age: 21,
    course: "Computer Engineering",
    isEnrolled: true
};

console.log(student);
console.log(student.name);
console.log(student.course);
console.log(`${student.name} is studying ${student.course}`);


// Without destructuring - repetitive
console.log(student.name);
console.log(student.age);

// With destructuring - clean and short
const { name, age, course } = student;
console.log(name);
console.log(age);
console.log(course);
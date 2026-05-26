function greetStudent(name, course) {
    return `Hello ${name}! Welcome to ${course}.`;
}

console.log(greetStudent("Vedant", "Full Stack Web Dev"));
console.log(greetStudent("Rahul", "Data Science"));



const addNumbers = (a, b) => a + b;
const multiplyNumbers = (a, b) => a * b;

console.log(`Sum: ${addNumbers(10, 5)}`);
console.log(`Product: ${multiplyNumbers(10, 5)}`);
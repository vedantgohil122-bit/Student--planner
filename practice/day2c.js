const subjects = ["Maths", "Physics", "Web Dev", "DBMS"];

console.log(subjects);
console.log(subjects[0]);
console.log(subjects[2]);
console.log(`Total subjects: ${subjects.length}`);





// forEach - do something with each item
subjects.forEach(subject => {
    console.log(`I am studying ${subject}`);
});

// map - transform each item into something new
const upperSubjects = subjects.map(subject => subject.toUpperCase());
console.log(upperSubjects);

// filter - keep only items that match a condition
const shortSubjects = subjects.filter(subject => subject.length <= 6);
console.log(shortSubjects);
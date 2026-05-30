const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Temporary data - we will replace this with MongoDB later
let tasks = [
    { id: 1, title: 'Complete React Assignment', subject: 'Web Dev', status: 'Pending' },
    { id: 2, title: 'Study for Maths Exam', subject: 'Maths', status: 'Completed' },
    { id: 3, title: 'Submit Physics Lab Report', subject: 'Physics', status: 'Urgent' }
];

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// GET /api/tasks - get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// POST /api/tasks - create a new task
app.post('/api/tasks', (req, res) => {
    const { title, subject, status } = req.body;
    const newTask = {
        id: tasks.length + 1,
        title,
        subject,
        status
    };
    tasks.push(newTask);
    res.json({ message: 'Task created!', task: newTask });
});

// DELETE /api/tasks/:id - delete a task
app.delete('/api/tasks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== id);
    res.json({ message: 'Task deleted!' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
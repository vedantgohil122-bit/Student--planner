const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

// Import the Task model
const Task = require('./models/Task');

const app = express();
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// GET /api/tasks - get all tasks from MongoDB
app.get('/api/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/tasks - create a new task in MongoDB
app.post('/api/tasks', async (req, res) => {
    try {
        const { title, subject, status, deadline, notes } = req.body;
        const newTask = new Task({ title, subject, status, deadline, notes });
        await newTask.save();
        res.json({ message: 'Task created!', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/tasks/:id - delete a task from MongoDB
app.delete('/api/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Connect to MongoDB then start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB!');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log('MongoDB connection failed:', error.message);
    });
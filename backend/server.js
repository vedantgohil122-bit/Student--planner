const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const Task = require('./models/Task');
const authRoutes = require('./routes/auth');
const authMiddleware = require('./middleware/auth');

const app = express();

// Security middleware
app.use(helmet());
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// Rate limiter for auth routes
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: 'Too many attempts. Please try again after 15 minutes.' }
});

// Auth routes with rate limiting
app.use('/api/auth', authLimiter, authRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ message: 'Server is running!' });
});

// GET /api/tasks - protected
app.get('/api/tasks', authMiddleware, async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.userId });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// POST /api/tasks - protected
app.post('/api/tasks', authMiddleware, async (req, res) => {
    try {
        const { title, subject, status, deadline, notes } = req.body;

        // Input validation
        if (!title || !subject) {
            return res.status(400).json({ message: 'Title and subject are required' });
        }

        if (title.length > 200) {
            return res.status(400).json({ message: 'Title is too long' });
        }

        const newTask = new Task({
            title,
            subject,
            status,
            deadline,
            notes,
            user: req.user.userId
        });

        await newTask.save();
        res.json({ message: 'Task created!', task: newTask });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// DELETE /api/tasks/:id - protected
app.delete('/api/tasks/:id', authMiddleware, async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.deleteOne();
        res.json({ message: 'Task deleted!' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Connect to MongoDB
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
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed', 'Urgent'],
        default: 'Pending'
    },
    deadline: {
        type: Date
    },
    notes: {
        type: String
    }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
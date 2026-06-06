import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, deleteTask } from '../api';

function Dashboard() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newTask, setNewTask] = useState({
        title: '',
        subject: '',
        status: 'Pending',
        notes: ''
    });

    // Get user from localStorage
    const user = JSON.parse(localStorage.getItem('user'));

    // Fetch tasks when component loads
    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(data);
        setLoading(false);
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    const handleCreateTask = async (e) => {
        e.preventDefault();
        await createTask(newTask);
        setNewTask({ title: '', subject: '', status: 'Pending', notes: '' });
        setShowForm(false);
        fetchTasks();
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };

    const getStatusColor = (status) => {
        if (status === 'Completed') return 'border-green-500';
        if (status === 'Urgent') return 'border-red-500';
        return 'border-blue-500';
    };

    const getStatusBadge = (status) => {
        if (status === 'Completed') return 'bg-green-100 text-green-800';
        if (status === 'Urgent') return 'bg-red-100 text-red-800';
        return 'bg-yellow-100 text-yellow-800';
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">
            <h2 className="text-xl text-gray-600">Loading tasks...</h2>
        </div>;
    }

    return (
        <div className="min-h-screen bg-gray-100">

            {/* Navbar */}
            <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
                <h1 className="text-xl font-bold">Student Planner</h1>
                <div className="flex items-center gap-4">
                    <span>Welcome, {user?.name}!</span>
                    <button
                        onClick={handleLogout}
                        className="bg-white text-blue-600 px-4 py-1 rounded-lg hover:bg-gray-100"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto p-6">

                {/* Add Task Button */}
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-6"
                >
                    {showForm ? 'Cancel' : '+ Add New Task'}
                </button>

                {/* Add Task Form */}
                {showForm && (
                    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
                        <h3 className="font-bold text-gray-800 mb-4">New Task</h3>
                        <form onSubmit={handleCreateTask}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Task title"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    placeholder="Subject"
                                    value={newTask.subject}
                                    onChange={(e) => setNewTask({...newTask, subject: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <select
                                    value={newTask.status}
                                    onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                >
                                    <option>Pending</option>
                                    <option>Completed</option>
                                    <option>Urgent</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <textarea
                                    placeholder="Notes (optional)"
                                    value={newTask.notes}
                                    onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Save Task
                            </button>
                        </form>
                    </div>
                )}

                {/* Task List */}
                {tasks.length === 0 ? (
                    <div className="text-center text-gray-500 mt-10">
                        <p>No tasks yet. Add your first task!</p>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {tasks.map(task => (
                            <div
                                key={task._id}
                                className={`bg-white p-4 rounded-lg shadow-sm border-l-4 ${getStatusColor(task.status)}`}
                            >
                                <div className="flex justify-between items-center">
                                    <h3 className="font-bold text-gray-800">{task.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-sm px-2 py-1 rounded ${getStatusBadge(task.status)}`}>
                                            {task.status}
                                        </span>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="text-red-500 hover:text-red-700 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-600 text-sm mt-1">Subject: {task.subject}</p>
                                {task.notes && <p className="text-gray-500 text-sm mt-1">Notes: {task.notes}</p>}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
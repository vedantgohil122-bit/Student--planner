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

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        const data = await getTasks();
        setTasks(Array.isArray(data) ? data : []);
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

    const getStatusStyle = (status) => {
        if (status === 'Completed') return {
            border: '1px solid rgba(0,212,170,0.4)',
            glow: 'rgba(0,212,170,0.08)',
            badge: { background: 'rgba(0,212,170,0.15)', color: '#00D4AA' },
            dot: '#00D4AA'
        };
        if (status === 'Urgent') return {
            border: '1px solid rgba(255,71,87,0.4)',
            glow: 'rgba(255,71,87,0.08)',
            badge: { background: 'rgba(255,71,87,0.15)', color: '#FF4757' },
            dot: '#FF4757'
        };
        return {
            border: '1px solid rgba(108,99,255,0.4)',
            glow: 'rgba(108,99,255,0.08)',
            badge: { background: 'rgba(108,99,255,0.15)', color: '#6C63FF' },
            dot: '#6C63FF'
        };
    };

    const pending = tasks.filter(t => t.status === 'Pending').length;
    const completed = tasks.filter(t => t.status === 'Completed').length;
    const urgent = tasks.filter(t => t.status === 'Urgent').length;

    const inputStyle = {
        width: '100%',
        background: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: '10px',
        padding: '12px 16px',
        color: '#F0F0FF',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: 'Inter, sans-serif'
    };

    const labelStyle = {
        display: 'block',
        color: '#8888AA',
        fontSize: '12px',
        fontWeight: '500',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.05em'
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#0A0A0F',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#8888AA',
                fontFamily: 'Inter, sans-serif'
            }}>
                Loading your tasks...
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0A0A0F 0%, #13131A 100%)',
            fontFamily: 'Inter, sans-serif',
            color: '#F0F0FF'
        }}>
            {/* Navbar */}
            <nav style={{
                background: 'rgba(19,19,26,0.95)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                padding: '0 32px',
                height: '64px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backdropFilter: 'blur(20px)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        background: 'linear-gradient(135deg, #6C63FF, #00D4AA)',
                        borderRadius: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px'
                    }}>📚</div>
                    <span style={{ fontWeight: '700', fontSize: '18px' }}>Student Planner</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: '#8888AA', fontSize: '14px' }}>
                        Hey, <span style={{ color: '#F0F0FF', fontWeight: '600' }}>{user?.name}</span>!
                    </span>
                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'rgba(255,71,87,0.1)',
                            border: '1px solid rgba(255,71,87,0.3)',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            color: '#FF4757',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >Logout</button>
                </div>
            </nav>

            {/* Main Content */}
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '40px 24px' }}>

                {/* Stats Row */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    marginBottom: '32px'
                }}>
                    {[
                        { label: 'Pending', value: pending, color: '#6C63FF' },
                        { label: 'Completed', value: completed, color: '#00D4AA' },
                        { label: 'Urgent', value: urgent, color: '#FF4757' }
                    ].map(stat => (
                        <div key={stat.label} style={{
                            background: 'rgba(19,19,26,0.8)',
                            border: `1px solid ${stat.color}33`,
                            borderRadius: '16px',
                            padding: '20px 24px',
                            textAlign: 'center'
                        }}>
                            <div style={{
                                fontSize: '36px',
                                fontWeight: '700',
                                color: stat.color,
                                lineHeight: 1
                            }}>{stat.value}</div>
                            <div style={{
                                color: '#8888AA',
                                fontSize: '13px',
                                marginTop: '6px',
                                fontWeight: '500'
                            }}>{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Header Row */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h2 style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        margin: 0,
                        color: '#F0F0FF'
                    }}>Your Tasks</h2>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        style={{
                            background: showForm
                                ? 'rgba(255,255,255,0.05)'
                                : 'linear-gradient(135deg, #6C63FF, #00D4AA)',
                            border: showForm ? '1px solid rgba(255,255,255,0.1)' : 'none',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        {showForm ? 'Cancel' : '+ New Task'}
                    </button>
                </div>

                {/* Add Task Form */}
                {showForm && (
                    <div style={{
                        background: 'rgba(19,19,26,0.9)',
                        border: '1px solid rgba(108,99,255,0.3)',
                        borderRadius: '16px',
                        padding: '24px',
                        marginBottom: '24px'
                    }}>
                        <h3 style={{
                            margin: '0 0 20px',
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#F0F0FF'
                        }}>New Task</h3>
                        <form onSubmit={handleCreateTask}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                                <div>
                                    <label style={labelStyle}>Title</label>
                                    <input
                                        type="text"
                                        placeholder="Task title"
                                        value={newTask.title}
                                        onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Subject</label>
                                    <input
                                        type="text"
                                        placeholder="Subject"
                                        value={newTask.subject}
                                        onChange={(e) => setNewTask({...newTask, subject: e.target.value})}
                                        style={inputStyle}
                                        required
                                    />
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                                <div>
                                    <label style={labelStyle}>Status</label>
                                    <select
                                        value={newTask.status}
                                        onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                                        style={{...inputStyle, cursor: 'pointer'}}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Urgent">Urgent</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={labelStyle}>Notes</label>
                                    <input
                                        type="text"
                                        placeholder="Optional notes"
                                        value={newTask.notes}
                                        onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                                        style={inputStyle}
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                style={{
                                    background: 'linear-gradient(135deg, #6C63FF, #00D4AA)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '12px 28px',
                                    color: '#fff',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    cursor: 'pointer'
                                }}
                            >Save Task</button>
                        </form>
                    </div>
                )}

                {/* Task List */}
                {tasks.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '60px 20px',
                        color: '#8888AA'
                    }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📝</div>
                        <p style={{ fontSize: '16px', margin: 0 }}>No tasks yet. Add your first task!</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '12px' }}>
                        {tasks.map(task => {
                            const style = getStatusStyle(task.status);
                            return (
                                <div key={task._id} style={{
                                    background: `rgba(19,19,26,0.9)`,
                                    border: style.border,
                                    borderRadius: '14px',
                                    padding: '20px 24px',
                                    boxShadow: `0 4px 24px ${style.glow}`,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start'
                                }}>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                                            <div style={{
                                                width: '8px',
                                                height: '8px',
                                                borderRadius: '50%',
                                                background: style.dot,
                                                flexShrink: 0
                                            }} />
                                            <h3 style={{
                                                margin: 0,
                                                fontSize: '15px',
                                                fontWeight: '600',
                                                color: '#F0F0FF'
                                            }}>{task.title}</h3>
                                        </div>
                                        <p style={{
                                            margin: '0 0 4px 18px',
                                            fontSize: '13px',
                                            color: '#8888AA'
                                        }}>📖 {task.subject}</p>
                                        {task.notes && (
                                            <p style={{
                                                margin: '0 0 0 18px',
                                                fontSize: '13px',
                                                color: '#6666AA'
                                            }}>💬 {task.notes}</p>
                                        )}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '10px',
                                        flexShrink: 0,
                                        marginLeft: '16px'
                                    }}>
                                        <span style={{
                                            ...style.badge,
                                            padding: '4px 12px',
                                            borderRadius: '99px',
                                            fontSize: '12px',
                                            fontWeight: '600'
                                        }}>{task.status}</span>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            style={{
                                                background: 'rgba(255,71,87,0.1)',
                                                border: '1px solid rgba(255,71,87,0.2)',
                                                borderRadius: '8px',
                                                padding: '6px 12px',
                                                color: '#FF4757',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                cursor: 'pointer'
                                            }}
                                        >Delete</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;
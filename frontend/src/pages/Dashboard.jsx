import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTasks, createTask, deleteTask } from '../api';

function Dashboard() {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [activeFilter, setActiveFilter] = useState('All');
    const [newTask, setNewTask] = useState({ title: '', subject: '', status: 'Pending', notes: '' });
    const [creating, setCreating] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => { fetchTasks(); }, []);

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
        setCreating(true);
        await createTask(newTask);
        setNewTask({ title: '', subject: '', status: 'Pending', notes: '' });
        setShowModal(false);
        setCreating(false);
        fetchTasks();
    };

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        fetchTasks();
    };

    const getStatusConfig = (status) => {
        const configs = {
            Completed: {
                border: '1px solid rgba(6,214,160,0.3)',
                shadow: '0 4px 24px rgba(6,214,160,0.06)',
                badge: { background: 'rgba(6,214,160,0.12)', color: '#06D6A0', border: '1px solid rgba(6,214,160,0.2)' },
                dot: '#06D6A0',
                icon: '✅'
            },
            Urgent: {
                border: '1px solid rgba(255,64,96,0.3)',
                shadow: '0 4px 24px rgba(255,64,96,0.06)',
                badge: { background: 'rgba(255,64,96,0.12)', color: '#FF4060', border: '1px solid rgba(255,64,96,0.2)' },
                dot: '#FF4060',
                icon: '🔴'
            },
            Pending: {
                border: '1px solid rgba(124,110,245,0.3)',
                shadow: '0 4px 24px rgba(124,110,245,0.06)',
                badge: { background: 'rgba(124,110,245,0.12)', color: '#7C6EF5', border: '1px solid rgba(124,110,245,0.2)' },
                dot: '#7C6EF5',
                icon: '⏳'
            }
        };
        return configs[status] || configs.Pending;
    };

    const stats = [
        { label: 'Total Tasks', value: tasks.length, color: '#E8E8FF', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.08)', icon: '📋' },
        { label: 'Pending', value: tasks.filter(t => t.status === 'Pending').length, color: '#7C6EF5', bg: 'rgba(124,110,245,0.06)', border: 'rgba(124,110,245,0.15)', icon: '⏳' },
        { label: 'Completed', value: tasks.filter(t => t.status === 'Completed').length, color: '#06D6A0', bg: 'rgba(6,214,160,0.06)', border: 'rgba(6,214,160,0.15)', icon: '✅' },
        { label: 'Urgent', value: tasks.filter(t => t.status === 'Urgent').length, color: '#FF4060', bg: 'rgba(255,64,96,0.06)', border: 'rgba(255,64,96,0.15)', icon: '🔴' }
    ];

    const filters = ['All', 'Pending', 'Completed', 'Urgent'];
    const filteredTasks = activeFilter === 'All' ? tasks : tasks.filter(t => t.status === activeFilter);

    const inputStyle = {
        width: '100%',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '10px',
        padding: '12px 14px',
        color: '#E8E8FF',
        fontSize: '14px',
        outline: 'none',
        boxSizing: 'border-box',
        fontFamily: 'inherit',
        transition: 'all 0.2s'
    };

    const labelStyle = {
        display: 'block',
        color: '#6B6B8A',
        fontSize: '11px',
        fontWeight: '600',
        marginBottom: '6px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em'
    };

    if (loading) {
        return (
            <div style={{
                minHeight: '100vh',
                background: '#080810',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6B6B8A',
                fontFamily: 'Inter, sans-serif',
                flexDirection: 'column',
                gap: '16px'
            }}>
                <div style={{ fontSize: '32px' }}>📚</div>
                <p>Loading your workspace...</p>
            </div>
        );
    }

    return (
        <div style={{
            minHeight: '100vh',
            background: '#080810',
            fontFamily: "'Inter', -apple-system, sans-serif",
            color: '#E8E8FF'
        }}>
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundImage: `linear-gradient(rgba(124,110,245,0.02) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(124,110,245,0.02) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <nav style={{
                background: 'rgba(8,8,16,0.9)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                padding: '0 40px',
                height: '68px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backdropFilter: 'blur(20px)',
                position: 'sticky',
                top: 0,
                zIndex: 100
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    <div style={{
                        width: '38px',
                        height: '38px',
                        background: 'linear-gradient(135deg, #7C6EF5, #06D6A0)',
                        borderRadius: '11px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '17px',
                        boxShadow: '0 4px 16px rgba(124,110,245,0.3)'
                    }}>📚</div>
                    <div>
                        <div style={{ fontWeight: '700', fontSize: '16px', letterSpacing: '-0.3px' }}>
                            Student Planner
                        </div>
                        <div style={{ color: '#6B6B8A', fontSize: '11px', marginTop: '1px' }}>
                            Your academic workspace
                        </div>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'rgba(6,214,160,0.08)',
                        border: '1px solid rgba(6,214,160,0.15)',
                        borderRadius: '99px',
                        padding: '6px 14px'
                    }}>
                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#06D6A0' }} />
                        <span style={{ color: '#06D6A0', fontSize: '12px', fontWeight: '600' }}>
                            {tasks.filter(t => t.status === 'Completed').length}/{tasks.length} done
                        </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                            width: '34px',
                            height: '34px',
                            background: 'linear-gradient(135deg, #7C6EF5, #06D6A0)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '14px',
                            fontWeight: '700',
                            color: '#fff'
                        }}>
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <div style={{ fontSize: '13px', fontWeight: '600', color: '#E8E8FF' }}>{user?.name}</div>
                            <div style={{ fontSize: '11px', color: '#6B6B8A' }}>Student</div>
                        </div>
                    </div>

                    <button
                        onClick={handleLogout}
                        style={{
                            background: 'rgba(255,64,96,0.08)',
                            border: '1px solid rgba(255,64,96,0.2)',
                            borderRadius: '8px',
                            padding: '8px 16px',
                            color: '#FF4060',
                            fontSize: '13px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit'
                        }}
                        onMouseEnter={(e) => {
                            e.target.style.background = 'rgba(255,64,96,0.15)';
                            e.target.style.borderColor = 'rgba(255,64,96,0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.background = 'rgba(255,64,96,0.08)';
                            e.target.style.borderColor = 'rgba(255,64,96,0.2)';
                        }}
                    >Sign out</button>
                </div>
            </nav>

            <div style={{ maxWidth: '960px', margin: '0 auto', padding: '40px 24px', position: 'relative', zIndex: 1 }}>

                <div style={{ marginBottom: '32px' }}>
                    <h1 style={{
                        fontSize: '32px',
                        fontWeight: '800',
                        margin: '0 0 6px',
                        letterSpacing: '-0.8px',
                        background: 'linear-gradient(135deg, #E8E8FF 0%, #7C6EF5 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        Good day, {user?.name?.split(' ')[0]}! 👋
                    </h1>
                    <p style={{ color: '#6B6B8A', fontSize: '15px', margin: 0 }}>
                        {tasks.length === 0
                            ? "You're all clear — add your first task to get started."
                            : `You have ${tasks.filter(t => t.status === 'Pending').length} pending and ${tasks.filter(t => t.status === 'Urgent').length} urgent tasks today.`
                        }
                    </p>
                </div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '14px',
                    marginBottom: '32px'
                }}>
                    {stats.map(stat => (
                        <div key={stat.label} style={{
                            background: stat.bg,
                            border: `1px solid ${stat.border}`,
                            borderRadius: '16px',
                            padding: '20px',
                            transition: 'transform 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                        >
                            <div style={{ fontSize: '20px', marginBottom: '8px' }}>{stat.icon}</div>
                            <div style={{
                                fontSize: '32px',
                                fontWeight: '800',
                                color: stat.color,
                                lineHeight: 1,
                                letterSpacing: '-1px'
                            }}>{stat.value}</div>
                            <div style={{ color: '#6B6B8A', fontSize: '12px', marginTop: '6px', fontWeight: '500' }}>
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        {filters.map(filter => (
                            <button
                                key={filter}
                                onClick={() => setActiveFilter(filter)}
                                style={{
                                    background: activeFilter === filter
                                        ? 'rgba(124,110,245,0.15)'
                                        : 'rgba(255,255,255,0.04)',
                                    border: activeFilter === filter
                                        ? '1px solid rgba(124,110,245,0.4)'
                                        : '1px solid rgba(255,255,255,0.08)',
                                    borderRadius: '8px',
                                    padding: '7px 14px',
                                    color: activeFilter === filter ? '#7C6EF5' : '#6B6B8A',
                                    fontSize: '13px',
                                    fontWeight: '600',
                                    cursor: 'pointer',
                                    transition: 'all 0.2s',
                                    fontFamily: 'inherit'
                                }}
                            >{filter}</button>
                        ))}
                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        style={{
                            background: 'linear-gradient(135deg, #7C6EF5, #06D6A0)',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            color: '#fff',
                            fontSize: '14px',
                            fontWeight: '700',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                            boxShadow: '0 4px 20px rgba(124,110,245,0.3)',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'translateY(-1px)';
                            e.currentTarget.style.boxShadow = '0 8px 28px rgba(124,110,245,0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = '0 4px 20px rgba(124,110,245,0.3)';
                        }}
                    >
                        <span style={{ fontSize: '16px' }}>+</span> New Task
                    </button>
                </div>

                {filteredTasks.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        background: 'rgba(15,15,26,0.5)',
                        border: '1px solid rgba(255,255,255,0.06)',
                        borderRadius: '20px'
                    }}>
                        <div style={{ fontSize: '56px', marginBottom: '16px' }}>
                            {activeFilter === 'All' ? '📝' : activeFilter === 'Completed' ? '🎉' : activeFilter === 'Urgent' ? '🔥' : '⏳'}
                        </div>
                        <h3 style={{ color: '#E8E8FF', fontSize: '18px', fontWeight: '600', margin: '0 0 8px' }}>
                            {activeFilter === 'All' ? 'No tasks yet' : `No ${activeFilter} tasks`}
                        </h3>
                        <p style={{ color: '#6B6B8A', fontSize: '14px', margin: '0 0 24px' }}>
                            {activeFilter === 'All'
                                ? 'Add your first task to start planning your studies.'
                                : `You have no ${activeFilter.toLowerCase()} tasks right now.`
                            }
                        </p>
                        {activeFilter === 'All' && (
                            <button
                                onClick={() => setShowModal(true)}
                                style={{
                                    background: 'linear-gradient(135deg, #7C6EF5, #06D6A0)',
                                    border: 'none',
                                    borderRadius: '10px',
                                    padding: '12px 24px',
                                    color: '#fff',
                                    fontSize: '14px',
                                    fontWeight: '700',
                                    cursor: 'pointer',
                                    fontFamily: 'inherit'
                                }}
                            >+ Add your first task</button>
                        )}
                    </div>
                ) : (
                    <div style={{ display: 'grid', gap: '10px' }}>
                        {filteredTasks.map(task => {
                            const config = getStatusConfig(task.status);
                            return (
                                <div
                                    key={task._id}
                                    style={{
                                        background: 'rgba(15,15,26,0.8)',
                                        border: config.border,
                                        borderRadius: '14px',
                                        padding: '18px 20px',
                                        boxShadow: config.shadow,
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        transition: 'all 0.2s',
                                        backdropFilter: 'blur(10px)'
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateX(4px)';
                                        e.currentTarget.style.background = 'rgba(20,20,35,0.9)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateX(0)';
                                        e.currentTarget.style.background = 'rgba(15,15,26,0.8)';
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                                        <div style={{
                                            width: '10px',
                                            height: '10px',
                                            borderRadius: '50%',
                                            background: config.dot,
                                            flexShrink: 0,
                                            boxShadow: `0 0 8px ${config.dot}`
                                        }} />

                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                fontSize: '15px',
                                                fontWeight: '600',
                                                color: '#E8E8FF',
                                                marginBottom: '4px',
                                                letterSpacing: '-0.2px'
                                            }}>{task.title}</div>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ color: '#6B6B8A', fontSize: '13px' }}>
                                                    📖 {task.subject}
                                                </span>
                                                {task.notes && (
                                                    <span style={{ color: '#4A4A6A', fontSize: '12px' }}>
                                                        · {task.notes}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                                        <span style={{
                                            ...config.badge,
                                            padding: '4px 12px',
                                            borderRadius: '99px',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            letterSpacing: '0.02em'
                                        }}>{config.icon} {task.status}</span>

                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            style={{
                                                background: 'rgba(255,64,96,0.06)',
                                                border: '1px solid rgba(255,64,96,0.15)',
                                                borderRadius: '8px',
                                                padding: '6px 12px',
                                                color: '#FF4060',
                                                fontSize: '12px',
                                                fontWeight: '600',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s',
                                                fontFamily: 'inherit'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.target.style.background = 'rgba(255,64,96,0.15)';
                                                e.target.style.borderColor = 'rgba(255,64,96,0.3)';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.target.style.background = 'rgba(255,64,96,0.06)';
                                                e.target.style.borderColor = 'rgba(255,64,96,0.15)';
                                            }}
                                        >Delete</button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {showModal && (
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0,0,0,0.7)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}
                onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
                >
                    <div style={{
                        background: '#0F0F1A',
                        border: '1px solid rgba(124,110,245,0.25)',
                        borderRadius: '20px',
                        padding: '36px 32px',
                        width: '100%',
                        maxWidth: '480px',
                        boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 60px rgba(124,110,245,0.08)',
                        position: 'relative'
                    }}>
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '25%',
                            right: '25%',
                            height: '1px',
                            background: 'linear-gradient(90deg, transparent, rgba(124,110,245,0.8), transparent)'
                        }} />

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                            <div>
                                <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '700', letterSpacing: '-0.4px' }}>
                                    Add New Task
                                </h2>
                                <p style={{ margin: 0, color: '#6B6B8A', fontSize: '13px' }}>
                                    Fill in the details for your task
                                </p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                style={{
                                    background: 'rgba(255,255,255,0.06)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: '8px',
                                    width: '32px',
                                    height: '32px',
                                    color: '#6B6B8A',
                                    fontSize: '16px',
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontFamily: 'inherit'
                                }}
                            >✕</button>
                        </div>

                        <form onSubmit={handleCreateTask}>
                            <div style={{ marginBottom: '16px' }}>
                                <label style={labelStyle}>Task Title *</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Complete React assignment"
                                    value={newTask.title}
                                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                                    required
                                    style={inputStyle}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'rgba(124,110,245,0.5)';
                                        e.target.style.background = 'rgba(124,110,245,0.06)';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(124,110,245,0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                                        e.target.style.background = 'rgba(255,255,255,0.04)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
                                <div>
                                    <label style={labelStyle}>Subject *</label>
                                    <input
                                        type="text"
                                        placeholder="e.g. Web Development"
                                        value={newTask.subject}
                                        onChange={(e) => setNewTask({...newTask, subject: e.target.value})}
                                        required
                                        style={inputStyle}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'rgba(124,110,245,0.5)';
                                            e.target.style.background = 'rgba(124,110,245,0.06)';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(124,110,245,0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                                            e.target.style.background = 'rgba(255,255,255,0.04)';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                </div>
                                <div>
                                    <label style={labelStyle}>Priority</label>
                                    <select
                                        value={newTask.status}
                                        onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                                        style={{ ...inputStyle, cursor: 'pointer' }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = 'rgba(124,110,245,0.5)';
                                            e.target.style.background = 'rgba(124,110,245,0.06)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                                            e.target.style.background = 'rgba(255,255,255,0.04)';
                                        }}
                                    >
                                        <option value="Pending" style={{ background: '#0F0F1A' }}>⏳ Pending</option>
                                        <option value="Completed" style={{ background: '#0F0F1A' }}>✅ Completed</option>
                                        <option value="Urgent" style={{ background: '#0F0F1A' }}>🔴 Urgent</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ marginBottom: '24px' }}>
                                <label style={labelStyle}>Notes (optional)</label>
                                <textarea
                                    placeholder="Any additional notes or details..."
                                    value={newTask.notes}
                                    onChange={(e) => setNewTask({...newTask, notes: e.target.value})}
                                    rows={3}
                                    style={{ ...inputStyle, resize: 'none', lineHeight: '1.5' }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'rgba(124,110,245,0.5)';
                                        e.target.style.background = 'rgba(124,110,245,0.06)';
                                        e.target.style.boxShadow = '0 0 0 3px rgba(124,110,245,0.1)';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                                        e.target.style.background = 'rgba(255,255,255,0.04)';
                                        e.target.style.boxShadow = 'none';
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '10px' }}>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    style={{
                                        flex: 1,
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: '10px',
                                        padding: '13px',
                                        color: '#6B6B8A',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: 'pointer',
                                        fontFamily: 'inherit'
                                    }}
                                >Cancel</button>
                                <button
                                    type="submit"
                                    disabled={creating}
                                    style={{
                                        flex: 2,
                                        background: creating
                                            ? 'rgba(124,110,245,0.4)'
                                            : 'linear-gradient(135deg, #7C6EF5, #06D6A0)',
                                        border: 'none',
                                        borderRadius: '10px',
                                        padding: '13px',
                                        color: '#fff',
                                        fontSize: '14px',
                                        fontWeight: '700',
                                        cursor: creating ? 'not-allowed' : 'pointer',
                                        boxShadow: creating ? 'none' : '0 4px 20px rgba(124,110,245,0.3)',
                                        fontFamily: 'inherit'
                                    }}
                                >
                                    {creating ? '⏳ Saving...' : '+ Save Task'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
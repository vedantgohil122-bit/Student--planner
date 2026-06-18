import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        const data = await registerUser(name, email, password);
        if (data.message === 'Registration successful!') {
            navigate('/');
        } else {
            setError(data.message);
        }
        setLoading(false);
    };

    const inputStyle = {
        width: '100%',
        background: 'rgba(255,255,255,0.04)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '12px',
        padding: '14px 16px',
        color: '#E8E8FF',
        fontSize: '15px',
        outline: 'none',
        boxSizing: 'border-box',
        transition: 'all 0.2s',
        fontFamily: 'inherit'
    };

    const labelStyle = {
        display: 'block',
        color: '#6B6B8A',
        fontSize: '12px',
        fontWeight: '600',
        marginBottom: '8px',
        textTransform: 'uppercase',
        letterSpacing: '0.08em'
    };

    return (
        <div style={{
            minHeight: '100vh',
            background: '#080810',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Inter', -apple-system, sans-serif",
            padding: '20px',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <div style={{
                position: 'fixed',
                width: '600px',
                height: '600px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(6,214,160,0.1) 0%, transparent 70%)',
                left: mousePos.x - 300,
                top: mousePos.y - 300,
                pointerEvents: 'none',
                transition: 'left 0.8s ease, top 0.8s ease',
                zIndex: 0
            }} />
            <div style={{
                position: 'fixed',
                width: '400px',
                height: '400px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(124,110,245,0.1) 0%, transparent 70%)',
                right: '15%',
                bottom: '15%',
                pointerEvents: 'none',
                zIndex: 0
            }} />
            <div style={{
                position: 'fixed',
                inset: 0,
                backgroundImage: `linear-gradient(rgba(6,214,160,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(6,214,160,0.03) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                pointerEvents: 'none',
                zIndex: 0
            }} />

            <div style={{
                background: 'rgba(15,15,26,0.85)',
                border: '1px solid rgba(6,214,160,0.2)',
                borderRadius: '24px',
                padding: '52px 44px',
                width: '100%',
                maxWidth: '440px',
                backdropFilter: 'blur(40px)',
                boxShadow: '0 0 0 1px rgba(6,214,160,0.05), 0 32px 80px rgba(0,0,0,0.4), 0 0 80px rgba(6,214,160,0.05)',
                position: 'relative',
                zIndex: 1
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: '20%',
                    right: '20%',
                    height: '1px',
                    background: 'linear-gradient(90deg, transparent, rgba(6,214,160,0.8), transparent)',
                    borderRadius: '1px'
                }} />

                <div style={{ textAlign: 'center', marginBottom: '36px' }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        background: 'linear-gradient(135deg, #06D6A0 0%, #7C6EF5 100%)',
                        borderRadius: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 20px',
                        fontSize: '26px',
                        boxShadow: '0 8px 32px rgba(6,214,160,0.3)'
                    }}>🎓</div>
                    <h1 style={{
                        color: '#E8E8FF',
                        fontSize: '28px',
                        fontWeight: '700',
                        margin: '0 0 8px',
                        letterSpacing: '-0.5px'
                    }}>Create account</h1>
                    <p style={{ color: '#6B6B8A', fontSize: '15px', margin: 0, lineHeight: 1.5 }}>
                        Join thousands of students staying organised
                    </p>
                </div>

                {error && (
                    <div style={{
                        background: 'rgba(255,64,96,0.08)',
                        border: '1px solid rgba(255,64,96,0.25)',
                        borderRadius: '12px',
                        padding: '14px 16px',
                        color: '#FF4060',
                        fontSize: '14px',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span>⚠️</span> {error}
                    </div>
                )}

                <form onSubmit={handleRegister}>
                    <div style={{ marginBottom: '18px' }}>
                        <label style={labelStyle}>Full Name</label>
                        <input
                            type="text"
                            placeholder="Vedant Gohil"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'rgba(6,214,160,0.5)';
                                e.target.style.background = 'rgba(6,214,160,0.05)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(6,214,160,0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                                e.target.style.background = 'rgba(255,255,255,0.04)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '18px' }}>
                        <label style={labelStyle}>Email address</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'rgba(6,214,160,0.5)';
                                e.target.style.background = 'rgba(6,214,160,0.05)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(6,214,160,0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                                e.target.style.background = 'rgba(255,255,255,0.04)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '28px' }}>
                        <label style={labelStyle}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={inputStyle}
                            onFocus={(e) => {
                                e.target.style.borderColor = 'rgba(6,214,160,0.5)';
                                e.target.style.background = 'rgba(6,214,160,0.05)';
                                e.target.style.boxShadow = '0 0 0 3px rgba(6,214,160,0.1)';
                            }}
                            onBlur={(e) => {
                                e.target.style.borderColor = 'rgba(255,255,255,0.08)';
                                e.target.style.background = 'rgba(255,255,255,0.04)';
                                e.target.style.boxShadow = 'none';
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            background: loading
                                ? 'rgba(6,214,160,0.4)'
                                : 'linear-gradient(135deg, #06D6A0 0%, #7C6EF5 100%)',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '15px',
                            color: '#fff',
                            fontSize: '15px',
                            fontWeight: '700',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            letterSpacing: '0.02em',
                            boxShadow: loading ? 'none' : '0 8px 32px rgba(6,214,160,0.25)',
                            transition: 'all 0.2s',
                            fontFamily: 'inherit'
                        }}
                        onMouseEnter={(e) => { if (!loading) e.target.style.transform = 'translateY(-1px)'; }}
                        onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; }}
                    >
                        {loading ? '⏳ Creating account...' : 'Create Account →'}
                    </button>
                </form>

                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                    <span style={{ color: '#6B6B8A', fontSize: '12px' }}>OR</span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.06)' }} />
                </div>

                <p style={{ textAlign: 'center', color: '#6B6B8A', fontSize: '14px', margin: 0 }}>
                    Already have an account?{' '}
                    <a href="/" style={{ color: '#06D6A0', textDecoration: 'none', fontWeight: '600' }}
                        onMouseEnter={(e) => e.target.style.color = '#7C6EF5'}
                        onMouseLeave={(e) => e.target.style.color = '#06D6A0'}
                    >Sign in →</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
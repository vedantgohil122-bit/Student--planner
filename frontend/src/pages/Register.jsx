import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api';

function Register() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

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

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #0A0A0F 0%, #13131A 50%, #0D0D18 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Inter, sans-serif',
            padding: '20px'
        }}>
            {/* Glow effect */}
            <div style={{
                position: 'fixed',
                top: '20%',
                right: '30%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 70%)',
                pointerEvents: 'none'
            }} />

            <div style={{
                background: 'rgba(19,19,26,0.9)',
                border: '1px solid rgba(0,212,170,0.3)',
                borderRadius: '20px',
                padding: '48px 40px',
                width: '100%',
                maxWidth: '420px',
                backdropFilter: 'blur(20px)',
                boxShadow: '0 0 60px rgba(0,212,170,0.08)',
                position: 'relative',
                zIndex: 1
            }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '56px',
                        height: '56px',
                        background: 'linear-gradient(135deg, #00D4AA, #6C63FF)',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 16px',
                        fontSize: '24px'
                    }}>🎓</div>
                    <h1 style={{
                        color: '#F0F0FF',
                        fontSize: '26px',
                        fontWeight: '700',
                        margin: '0 0 8px'
                    }}>Create account</h1>
                    <p style={{ color: '#8888AA', fontSize: '14px', margin: 0 }}>
                        Join Student Planner today
                    </p>
                </div>

                {/* Error */}
                {error && (
                    <div style={{
                        background: 'rgba(255,71,87,0.1)',
                        border: '1px solid rgba(255,71,87,0.3)',
                        borderRadius: '10px',
                        padding: '12px 16px',
                        color: '#FF4757',
                        fontSize: '14px',
                        marginBottom: '20px'
                    }}>{error}</div>
                )}

                <form onSubmit={handleRegister}>
                    {/* Name */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{
                            display: 'block',
                            color: '#8888AA',
                            fontSize: '13px',
                            fontWeight: '500',
                            marginBottom: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>Full Name</label>
                        <input
                            type="text"
                            placeholder="Vedant Gohil"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px',
                                padding: '12px 16px',
                                color: '#F0F0FF',
                                fontSize: '15px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#00D4AA'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    {/* Email */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{
                            display: 'block',
                            color: '#8888AA',
                            fontSize: '13px',
                            fontWeight: '500',
                            marginBottom: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>Email</label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px',
                                padding: '12px 16px',
                                color: '#F0F0FF',
                                fontSize: '15px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#00D4AA'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            color: '#8888AA',
                            fontSize: '13px',
                            fontWeight: '500',
                            marginBottom: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                        }}>Password</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{
                                width: '100%',
                                background: 'rgba(255,255,255,0.05)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '10px',
                                padding: '12px 16px',
                                color: '#F0F0FF',
                                fontSize: '15px',
                                outline: 'none',
                                boxSizing: 'border-box'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#00D4AA'}
                            onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            background: loading
                                ? 'rgba(0,212,170,0.5)'
                                : 'linear-gradient(135deg, #00D4AA, #6C63FF)',
                            border: 'none',
                            borderRadius: '10px',
                            padding: '14px',
                            color: '#fff',
                            fontSize: '15px',
                            fontWeight: '600',
                            cursor: loading ? 'not-allowed' : 'pointer',
                            letterSpacing: '0.02em'
                        }}
                    >
                        {loading ? 'Creating account...' : 'Create Account'}
                    </button>
                </form>

                <p style={{
                    textAlign: 'center',
                    color: '#8888AA',
                    fontSize: '14px',
                    marginTop: '24px',
                    marginBottom: 0
                }}>
                    Already have an account?{' '}
                    <a href="/" style={{
                        color: '#00D4AA',
                        textDecoration: 'none',
                        fontWeight: '600'
                    }}>Sign in</a>
                </p>
            </div>
        </div>
    );
}

export default Register;
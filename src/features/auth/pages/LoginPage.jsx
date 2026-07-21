import React, { useState } from 'react';
import { LogIn, ShieldCheck, Sun, Moon, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { loading, error, login } = useAuth();
  
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--pf-bg-gradient)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: "'Inter', system-ui, sans-serif",
      position: 'relative',
    }}>
      {/* Floating Theme Toggle */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'absolute',
          top: '24px',
          right: '24px',
          background: 'var(--pf-card)',
          border: '1px solid var(--pf-border)',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          color: 'var(--pf-text)',
          boxShadow: 'var(--pf-shadow)',
          transition: 'all 0.2s',
          zIndex: 1000
        }}
        onMouseOver={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.borderColor = 'var(--pf-border2)'; }}
        onMouseOut={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.borderColor = 'var(--pf-border)'; }}
      >
        {theme === 'dark' ? <Sun style={{ width: '20px', height: '20px' }} /> : <Moon style={{ width: '20px', height: '20px' }} />}
      </button>

      {/* Background glow effect */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 80% 50% at 50% -20%, var(--pf-accent-glow), transparent)',
      }} />

      <div style={{
        width: '100%', maxWidth: '440px',
        background: 'var(--pf-card)',
        border: '1px solid var(--pf-border)',
        borderRadius: '24px',
        padding: '48px 40px',
        boxShadow: 'var(--pf-shadow)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Subtle top glow */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: '200px', height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--pf-accent), transparent)',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '72px', height: '72px',
            background: 'linear-gradient(135deg, var(--pf-accent-glow), transparent)',
            border: '1px solid var(--pf-border)',
            borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{
              width: '48px', height: '48px',
              background: 'linear-gradient(135deg, var(--pf-accent), var(--pf-accent2))',
              borderRadius: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 20px var(--pf-accent-glow)',
            }}>
              <ShieldCheck style={{ color: '#fff', width: '26px', height: '26px' }} strokeWidth={2.5} />
            </div>
          </div>
        </div>

        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <h1 style={{
            fontSize: '28px', fontWeight: '800',
            color: 'var(--pf-text)', letterSpacing: '-0.5px', margin: 0,
          }}>ParkFinder</h1>
          <p style={{
            color: 'var(--pf-accent)', fontWeight: '500', marginTop: '6px', fontSize: '14px',
          }}>Akses Gerbang Parkir</p>
        </div>

        {/* Error */}
        {error && (
          <div style={{
            marginBottom: '20px', padding: '12px 16px',
            background: 'var(--pf-red-glow)',
            border: '1px solid var(--pf-red)',
            borderRadius: '10px', color: 'var(--pf-red)',
            fontSize: '14px', fontWeight: '500',
          }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{
              display: 'block', marginBottom: '8px',
              color: 'var(--pf-text2)', fontSize: '13px', fontWeight: '600',
            }}>Alamat Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@parkfinder.id"
              required
              style={{
                width: '100%', padding: '14px 16px',
                background: 'var(--pf-card2)',
                border: '1.5px solid var(--pf-border)',
                borderRadius: '12px',
                color: 'var(--pf-text)',
                fontSize: '15px', fontWeight: '500',
                outline: 'none',
                fontFamily: "'Inter', sans-serif",
                boxSizing: 'border-box',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onFocus={e => {
                e.target.style.borderColor = 'var(--pf-border2)';
                e.target.style.boxShadow = '0 0 0 3px var(--pf-accent-glow)';
              }}
              onBlur={e => {
                e.target.style.borderColor = 'var(--pf-border)';
                e.target.style.boxShadow = 'none';
              }}
            />
          </div>

          <div>
            <label style={{
              display: 'block', marginBottom: '8px',
              color: 'var(--pf-text2)', fontSize: '13px', fontWeight: '600',
            }}>Kata Sandi</label>
            <div style={{ position: 'relative', width: '100%' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '14px 48px 14px 16px',
                  background: 'var(--pf-card2)',
                  border: '1.5px solid var(--pf-border)',
                  borderRadius: '12px',
                  color: 'var(--pf-text)',
                  fontSize: '15px', fontWeight: '500',
                  outline: 'none',
                  fontFamily: "'Inter', sans-serif",
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onFocus={e => {
                  e.target.style.borderColor = 'var(--pf-border2)';
                  e.target.style.boxShadow = '0 0 0 3px var(--pf-accent-glow)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = 'var(--pf-border)';
                  e.target.style.boxShadow = 'none';
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => !prev)}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--pf-text3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 0,
                }}
              >
                {showPassword ? <EyeOff style={{ width: '20px', height: '20px' }} /> : <Eye style={{ width: '20px', height: '20px' }} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: '8px',
              width: '100%', padding: '15px',
              background: loading ? 'var(--pf-accent2)' : 'linear-gradient(135deg, var(--pf-accent), var(--pf-accent2))',
              border: 'none',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '15px', fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              boxShadow: '0 8px 20px var(--pf-accent-glow)',
              transition: 'all 0.2s',
              fontFamily: "'Inter', sans-serif",
              opacity: loading ? 0.75 : 1,
            }}
            onMouseOver={e => { if (!loading) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 28px var(--pf-accent-glow)'; } }}
            onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 20px var(--pf-accent-glow)'; }}
          >
            {loading ? (
              <div style={{
                width: '20px', height: '20px',
                border: '2px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }} />
            ) : (
              <>
                Masuk
                <LogIn style={{ width: '18px', height: '18px' }} />
              </>
            )}
          </button>
        </form>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default LoginPage;

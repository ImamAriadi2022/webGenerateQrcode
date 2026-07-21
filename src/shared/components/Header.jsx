import React, { useState } from 'react';
import { QrCode, LogOut, Sun, Moon } from 'lucide-react';

const Header = ({
  user,
  adminAreas,
  selectedAreaId,
  loadingAreas,
  handleSelectArea,
  handleLogout
}) => {
  const [theme, setTheme] = useState(() => document.documentElement.getAttribute('data-theme') || 'dark');

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    setTheme(nextTheme);
  };

  const S = {
    header: {
      position: 'sticky', top: 0, zIndex: 100,
      background: 'var(--pf-header-bg)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid var(--pf-border)',
      padding: '0 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '68px',
    },
    logoBox: {
      width: '38px', height: '38px',
      background: 'linear-gradient(135deg, var(--pf-accent), var(--pf-accent2))',
      borderRadius: '10px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 12px var(--pf-accent-glow)',
    },
    logoTitle: { fontSize: '18px', fontWeight: '800', color: 'var(--pf-text)', marginLeft: '10px' },
    select: {
      background: 'var(--pf-card2)',
      border: '1px solid var(--pf-border)',
      color: 'var(--pf-accent)',
      borderRadius: '8px',
      padding: '4px 10px',
      fontSize: '13px', fontWeight: '600',
      cursor: 'pointer', outline: 'none',
      fontFamily: "'Inter', sans-serif",
      marginTop: '4px',
    },
    userInfo: { textAlign: 'right' },
    userName: { color: 'var(--pf-text)', fontWeight: '700', fontSize: '14px', margin: 0 },
    userRole: { color: 'var(--pf-text2)', fontSize: '12px', textTransform: 'capitalize', margin: 0 },
    logoutBtn: {
      background: 'var(--pf-red-glow)',
      border: '1px solid var(--pf-red-glow)',
      borderRadius: '10px', padding: '8px 10px',
      color: 'var(--pf-red)', cursor: 'pointer',
      display: 'flex', alignItems: 'center',
      transition: 'all 0.2s',
      marginLeft: '12px',
    },
    themeToggleBtn: {
      background: 'transparent',
      border: '1px solid var(--pf-border)',
      borderRadius: '10px', padding: '8px 10px',
      color: 'var(--pf-text)', cursor: 'pointer',
      display: 'flex', alignItems: 'center',
      transition: 'all 0.2s',
      marginLeft: '16px',
    }
  };

  return (
    <header style={S.header}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={S.logoBox}>
          <QrCode style={{ color: '#fff', width: '20px', height: '20px' }} />
        </div>
        <div style={{ marginLeft: '12px' }}>
          <div style={S.logoTitle}>ParkFinder</div>
          <div>
            {loadingAreas ? (
              <span style={{ color: 'var(--pf-text3)', fontSize: '12px' }}>Memuat area...</span>
            ) : adminAreas.length > 0 ? (
              <select
                value={selectedAreaId}
                onChange={e => handleSelectArea(e.target.value)}
                style={S.select}
              >
                <option value="">Pilih Area...</option>
                {adminAreas.map(area => (
                  <option key={area.id} value={area.id}>{area.name || area.id}</option>
                ))}
              </select>
            ) : (
              <span style={{ color: 'var(--pf-red)', fontSize: '12px', fontWeight: '600' }}>Tidak ada area</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={S.userInfo}>
          <p style={S.userName}>{user?.name}</p>
          <p style={S.userRole}>{user?.role}</p>
        </div>
        
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          style={S.themeToggleBtn}
          title={theme === 'dark' ? 'Mode Terang' : 'Mode Gelap'}
          onMouseOver={e => { e.currentTarget.style.borderColor = 'var(--pf-border2)'; e.currentTarget.style.background = 'var(--pf-card2)'; }}
          onMouseOut={e => { e.currentTarget.style.borderColor = 'var(--pf-border)'; e.currentTarget.style.background = 'transparent'; }}
        >
          {theme === 'dark' ? <Sun style={{ width: '18px', height: '18px' }} /> : <Moon style={{ width: '18px', height: '18px' }} />}
        </button>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          style={S.logoutBtn}
          title="Keluar"
          onMouseOver={e => { e.currentTarget.style.background = 'var(--pf-red)'; e.currentTarget.style.borderColor = 'var(--pf-red)'; e.currentTarget.style.color = '#fff'; }}
          onMouseOut={e => { e.currentTarget.style.background = 'var(--pf-red-glow)'; e.currentTarget.style.borderColor = 'var(--pf-red-glow)'; e.currentTarget.style.color = 'var(--pf-red)'; }}
        >
          <LogOut style={{ width: '18px', height: '18px' }} />
        </button>
      </div>
    </header>
  );
};

export default Header;

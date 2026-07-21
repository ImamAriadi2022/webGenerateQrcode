import React from 'react';
import { QrCode, LogOut } from 'lucide-react';

const Header = ({
  user,
  adminAreas,
  selectedAreaId,
  loadingAreas,
  handleSelectArea,
  handleLogout
}) => {
  const S = {
    header: {
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(19,33,54,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #1E3A5F',
      padding: '0 24px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      height: '68px',
    },
    logoBox: {
      width: '38px', height: '38px',
      background: 'linear-gradient(135deg, #00D2FF, #0066AA)',
      borderRadius: '10px',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: '0 4px 12px rgba(0,210,255,0.3)',
    },
    logoTitle: { fontSize: '18px', fontWeight: '800', color: '#fff', marginLeft: '10px' },
    select: {
      background: '#1A2D47',
      border: '1px solid #1E3A5F',
      color: '#00D2FF',
      borderRadius: '8px',
      padding: '4px 10px',
      fontSize: '13px', fontWeight: '600',
      cursor: 'pointer', outline: 'none',
      fontFamily: "'Inter', sans-serif",
      marginTop: '4px',
    },
    userInfo: { textAlign: 'right' },
    userName: { color: '#fff', fontWeight: '700', fontSize: '14px', margin: 0 },
    userRole: { color: '#8BA3BC', fontSize: '12px', textTransform: 'capitalize', margin: 0 },
    logoutBtn: {
      background: 'rgba(239,83,80,0.1)',
      border: '1px solid rgba(239,83,80,0.3)',
      borderRadius: '10px', padding: '8px 10px',
      color: '#EF5350', cursor: 'pointer',
      display: 'flex', alignItems: 'center',
      transition: 'all 0.2s',
      marginLeft: '16px',
    },
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
              <span style={{ color: '#4A6080', fontSize: '12px' }}>Memuat area...</span>
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
              <span style={{ color: '#EF5350', fontSize: '12px', fontWeight: '600' }}>Tidak ada area</span>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={S.userInfo}>
          <p style={S.userName}>{user?.name}</p>
          <p style={S.userRole}>{user?.role}</p>
        </div>
        <button
          onClick={handleLogout}
          style={S.logoutBtn}
          title="Keluar"
          onMouseOver={e => { e.currentTarget.style.background = 'rgba(239,83,80,0.2)'; e.currentTarget.style.borderColor = '#EF5350'; }}
          onMouseOut={e => { e.currentTarget.style.background = 'rgba(239,83,80,0.1)'; e.currentTarget.style.borderColor = 'rgba(239,83,80,0.3)'; }}
        >
          <LogOut style={{ width: '18px', height: '18px' }} />
        </button>
      </div>
    </header>
  );
};

export default Header;

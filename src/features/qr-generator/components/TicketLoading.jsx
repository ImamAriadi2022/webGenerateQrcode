import React from 'react';

const TicketLoading = () => {
  return (
    <div className="section-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px' }}>
      <div style={{
        width: '56px', height: '56px',
        border: '3px solid var(--pf-border)',
        borderTopColor: 'var(--pf-accent)',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        marginBottom: '20px',
      }} />
      <p style={{ color: 'var(--pf-text2)', fontWeight: '600' }}>Menghasilkan Tiket...</p>
    </div>
  );
};

export default TicketLoading;

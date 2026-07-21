import React from 'react';
import { CheckCircle } from 'lucide-react';

const ClaimedSuccess = () => {
  return (
    <div className="section-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '48px 24px', animation: 'fadeUp 0.4s ease' }}>
      <div style={{
        width: '96px', height: '96px', borderRadius: '50%',
        background: 'rgba(76,175,80,0.1)',
        border: '2px solid rgba(76,175,80,0.3)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '24px',
        boxShadow: '0 0 30px rgba(76,175,80,0.2)',
      }}>
        <CheckCircle style={{ width: '48px', height: '48px', color: '#4CAF50' }} />
      </div>
      <h2 style={{ color: '#fff', fontWeight: '900', fontSize: '28px', marginBottom: '8px' }}>Sukses!</h2>
      <div style={{
        background: 'rgba(76,175,80,0.1)',
        border: '1px solid rgba(76,175,80,0.2)',
        borderRadius: '24px', padding: '8px 24px',
        color: '#4CAF50', fontWeight: '700', fontSize: '14px',
      }}>
        Gerbang Terbuka
      </div>
    </div>
  );
};

export default ClaimedSuccess;

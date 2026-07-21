import React from 'react';
import { CheckCircle } from 'lucide-react';

const ClaimedSuccess = () => {
  return (
    <div className="section-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '48px 24px', animation: 'fadeUp 0.4s ease' }}>
      <div style={{
        width: '96px', height: '96px', borderRadius: '50%',
        background: 'var(--pf-green-glow)',
        border: '2px solid var(--pf-green)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '24px',
        boxShadow: '0 0 30px var(--pf-green-glow)',
      }}>
        <CheckCircle style={{ width: '48px', height: '48px', color: 'var(--pf-green)' }} />
      </div>
      <h2 style={{ color: 'var(--pf-text)', fontWeight: '900', fontSize: '28px', marginBottom: '8px' }}>Sukses!</h2>
      <div style={{
        background: 'var(--pf-green-glow)',
        border: '1px solid var(--pf-green)',
        borderRadius: '24px', padding: '8px 24px',
        color: 'var(--pf-green)', fontWeight: '700', fontSize: '14px',
      }}>
        Gerbang Terbuka
      </div>
    </div>
  );
};

export default ClaimedSuccess;

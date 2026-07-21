import React from 'react';
import { CarFront } from 'lucide-react';

const TicketForm = ({ handleGenerateTicket }) => {
  return (
    <div className="section-card" style={{ position: 'relative', overflow: 'hidden' }}>
      <div style={{
        position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
        width: '240px', height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(0,210,255,0.5), transparent)',
      }} />
      
      <h2 style={{ color: '#fff', fontWeight: '800', fontSize: '22px', marginBottom: '6px', textAlign: 'center' }}>
        Generate QR Tiket
      </h2>
      <p style={{ color: '#8BA3BC', fontSize: '13px', marginBottom: '24px', textAlign: 'center' }}>
        Klik tombol di bawah untuk menghasilkan tiket masuk mobil secara instan.
      </p>

      <button
        onClick={handleGenerateTicket}
        style={{
          width: '100%', padding: '16px',
          background: 'linear-gradient(135deg, #00D2FF, #0066AA)',
          border: 'none', borderRadius: '12px',
          color: '#fff', fontSize: '15px', fontWeight: '700',
          cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(0,210,255,0.3)',
          fontFamily: "'Inter', sans-serif",
          transition: 'all 0.2s',
          marginTop: '10px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
        onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,210,255,0.45)'; }}
        onMouseOut={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,210,255,0.3)'; }}
      >
        <CarFront style={{ width: '18px', height: '18px' }} />
        Generate Tiket Mobil
      </button>
    </div>
  );
};

export default TicketForm;

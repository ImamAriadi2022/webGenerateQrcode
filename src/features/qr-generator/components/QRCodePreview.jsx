import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Check, Copy, AlertCircle } from 'lucide-react';

const QRCodePreview = ({
  ticketData,
  vehicleType,
  copied,
  timeLeft,
  formatTime,
  isTimeRunningOut,
  selectedAreaName,
  handleCopyTicketCode,
  handleCancelTicket,
  handleResetTicket
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', animation: 'fadeUp 0.4s ease' }}>
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '24px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: '1px solid #E2E8F0',
      }}>
        <div style={{
          position: 'absolute', top: '-1px', left: '50%', transform: 'translateX(-50%)',
          background: '#132136', width: '40px', height: '12px', borderRadius: '0 0 10px 10px',
        }} />

        <div style={{ textAlign: 'center', marginBottom: '16px', width: '100%' }}>
          <h4 style={{ color: '#0066AA', fontWeight: '800', fontSize: '16px', margin: 0, letterSpacing: '1px' }}>
            PARKFINDER E-TICKET
          </h4>
          <span style={{ color: '#64748B', fontSize: '11px', fontWeight: '600', textTransform: 'uppercase' }}>
            {selectedAreaName || 'Gate Area'}
          </span>
        </div>

        <div style={{
          background: '#F8FAFC',
          borderRadius: '16px',
          padding: '16px',
          border: '1px solid #E2E8F0',
          marginBottom: '16px',
        }}>
          <QRCodeSVG
            value={ticketData.qrCode || ticketData.ticketId}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>

        <div style={{
          width: '100%', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0',
          padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: '#64748B', fontWeight: '500' }}>Kendaraan</span>
            <span style={{ color: '#1E293B', fontWeight: '700', textTransform: 'capitalize' }}>
              {ticketData.vehicleType || vehicleType}
            </span>
          </div>
          {ticketData.plateNumber && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: '#64748B', fontWeight: '500' }}>Plat Nomor</span>
              <span style={{ color: '#1E293B', fontWeight: '700' }}>{ticketData.plateNumber}</span>
            </div>
          )}
          {ticketData.visitorName && (
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
              <span style={{ color: '#64748B', fontWeight: '500' }}>Pengunjung</span>
              <span style={{ color: '#1E293B', fontWeight: '700' }}>{ticketData.visitorName}</span>
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
            <span style={{ color: '#64748B', fontWeight: '500' }}>Dibuat Pada</span>
            <span style={{ color: '#1E293B', fontWeight: '700' }}>
              {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </span>
          </div>
        </div>

        <div style={{
          width: '100%',
          height: '1px',
          borderTop: '1px dashed #CBD5E1',
          margin: '8px 0 16px 0',
        }} />

        <div style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
        }}>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            KODE TIKET (TAP UNTUK SALIN)
          </span>
          <div
            onClick={handleCopyTicketCode}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: copied ? '#DCFCE7' : '#F1F5F9',
              border: `1px solid ${copied ? '#4CAF50' : '#E2E8F0'}`,
              borderRadius: '12px',
              padding: '10px 14px',
              width: '100%',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            <span style={{
              fontFamily: 'monospace',
              fontSize: '14px',
              fontWeight: '700',
              color: copied ? '#15803D' : '#1E293B',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>
              {ticketData.qrCode || ticketData.ticketId}
            </span>
            {copied ? (
              <Check style={{ width: '16px', height: '16px', color: '#16A34A' }} />
            ) : (
              <Copy style={{ width: '16px', height: '16px', color: '#475569' }} />
            )}
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        padding: '10px 24px',
        background: isTimeRunningOut ? 'rgba(239,83,80,0.12)' : 'rgba(0,210,255,0.08)',
        border: `1px solid ${isTimeRunningOut ? 'rgba(239,83,80,0.3)' : 'rgba(0,210,255,0.2)'}`,
        borderRadius: '24px',
        marginBottom: '20px',
        color: isTimeRunningOut ? '#EF5350' : '#00D2FF',
        fontWeight: '700', fontSize: '15px',
      }}>
        {isTimeRunningOut && <AlertCircle style={{ width: '16px', height: '16px' }} />}
        Sisa Waktu: {formatTime(timeLeft)}
      </div>

      <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
        <button
          onClick={handleCancelTicket}
          style={{
            background: 'transparent', border: 'none',
            color: '#EF5350', fontSize: '14px', fontWeight: '600',
            cursor: 'pointer', textDecoration: 'underline',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Batalkan Tiket
        </button>
        <span style={{ color: '#4A6080' }}>|</span>
        <button
          onClick={handleResetTicket}
          style={{
            background: 'transparent', border: 'none',
            color: '#4A6080', fontSize: '14px', fontWeight: '600',
            cursor: 'pointer', textDecoration: 'underline',
            fontFamily: "'Inter', sans-serif",
          }}
        >
          Selesai &amp; Buat Baru
        </button>
      </div>
    </div>
  );
};

export default QRCodePreview;

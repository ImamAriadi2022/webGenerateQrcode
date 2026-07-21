import React from 'react';
import Header from '../../../shared/components/Header';
import TicketGenerator from '../components/TicketGenerator';
import { useTicketGenerator } from '../hooks/useTicketGenerator';
import { useAuth } from '../../auth/hooks/useAuth';
import { AlertCircle } from 'lucide-react';
import { formatTime } from '../utils/time';

const GenerateTicketPage = () => {
  const { user, logout } = useAuth();
  const {
    appState,
    ticketData,
    vehicleType,
    timeLeft,
    copied,
    adminAreas,
    selectedAreaId,
    loadingAreas,
    selectedAreaName,
    isTimeRunningOut,
    handleGenerateTicket,
    handleCopyTicketCode,
    handleCancelTicket,
    handleResetTicket,
    handleSelectArea
  } = useTicketGenerator(user);

  if (!user) return null;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0D1628',
      display: 'flex', flexDirection: 'column',
      fontFamily: "'Inter', sans-serif",
    }}>
      {/* Header */}
      <Header
        user={user}
        adminAreas={adminAreas}
        selectedAreaId={selectedAreaId}
        loadingAreas={loadingAreas}
        handleSelectArea={handleSelectArea}
        handleLogout={logout}
      />

      {/* Main Layout */}
      <div className="layout-container" style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>
        <main className="main-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px' }}>
          
          {/* Warn if no area selected */}
          {!selectedAreaId && !loadingAreas && adminAreas.length > 0 && (
            <div style={{
              width: '100%', marginBottom: '24px',
              padding: '16px 20px',
              background: 'rgba(0,210,255,0.06)',
              border: '1px solid rgba(0,210,255,0.2)',
              borderRadius: '12px', color: '#8BA3BC',
              fontSize: '14px',
              textAlign: 'center'
            }}>
              Silahkan pilih area dari dropdown di header untuk mengaktifkan fitur kontrol.
            </div>
          )}

          {/* Loading areas */}
          {loadingAreas && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 0', flex: 1 }}>
              <div style={{
                width: '56px', height: '56px',
                border: '3px solid #1E3A5F',
                borderTopColor: '#00D2FF',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                marginBottom: '20px',
              }} />
              <p style={{ color: '#8BA3BC', fontWeight: '600' }}>Memuat data area...</p>
            </div>
          )}

          {/* No areas warning */}
          {!loadingAreas && adminAreas.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '64px 0', flex: 1 }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'rgba(239,83,80,0.1)',
                border: '1px solid rgba(239,83,80,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <AlertCircle style={{ width: '36px', height: '36px', color: '#EF5350' }} />
              </div>
              <h2 style={{ color: '#fff', fontWeight: '800', fontSize: '22px', marginBottom: '8px' }}>Tidak ada area</h2>
              <p style={{ color: '#8BA3BC', marginBottom: '24px', fontSize: '14px', maxWidth: '360px' }}>
                Akun admin Anda belum terasosiasi dengan area gerbang parkir. Silahkan hubungi administrator utama.
              </p>
              <button onClick={logout} style={{
                padding: '10px 24px', background: '#1A2D47',
                border: '1px solid #1E3A5F', borderRadius: '10px',
                color: '#8BA3BC', fontWeight: '600', cursor: 'pointer',
                fontFamily: "'Inter', sans-serif",
              }}>Logout</button>
            </div>
          )}

          {/* Render Generator Component directly */}
          {!loadingAreas && selectedAreaId && (
            <div style={{ width: '100%' }}>
              <TicketGenerator
                appState={appState}
                ticketData={ticketData}
                vehicleType={vehicleType}
                copied={copied}
                timeLeft={timeLeft}
                formatTime={formatTime}
                isTimeRunningOut={isTimeRunningOut}
                selectedAreaName={selectedAreaName}
                handleGenerateTicket={handleGenerateTicket}
                handleCopyTicketCode={handleCopyTicketCode}
                handleCancelTicket={handleCancelTicket}
                handleResetTicket={handleResetTicket}
              />
            </div>
          )}
        </main>
      </div>

      <style>{`
        .layout-container {
          display: flex;
          flex-direction: row;
          min-height: calc(100vh - 68px);
        }

        .main-content {
          flex: 1;
          padding: 32px;
          background: #0D1628;
          overflow-y: auto;
        }

        .section-card {
          background: #132136;
          border: 1px solid #1E3A5F;
          border-radius: 18px;
          padding: 24px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }

        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

        @media (max-width: 768px) {
          .main-content {
            padding: 20px 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default GenerateTicketPage;

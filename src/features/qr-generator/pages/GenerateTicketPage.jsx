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
      background: 'var(--pf-bg)',
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
              background: 'var(--pf-accent-glow)',
              border: '1px solid var(--pf-border)',
              borderRadius: '12px', color: 'var(--pf-text2)',
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
                border: '3px solid var(--pf-border)',
                borderTopColor: 'var(--pf-accent)',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
                marginBottom: '20px',
              }} />
              <p style={{ color: 'var(--pf-text2)', fontWeight: '600' }}>Memuat data area...</p>
            </div>
          )}

          {/* No areas warning */}
          {!loadingAreas && adminAreas.length === 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '64px 0', flex: 1 }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%',
                background: 'var(--pf-red-glow)',
                border: '1px solid var(--pf-red)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <AlertCircle style={{ width: '36px', height: '36px', color: 'var(--pf-red)' }} />
              </div>
              <h2 style={{ color: 'var(--pf-text)', fontWeight: '800', fontSize: '22px', marginBottom: '8px' }}>Tidak ada area</h2>
              <p style={{ color: 'var(--pf-text2)', marginBottom: '24px', fontSize: '14px', maxWidth: '360px' }}>
                Akun admin Anda belum terasosiasi dengan area gerbang parkir. Silahkan hubungi administrator utama.
              </p>
              <button onClick={logout} style={{
                padding: '10px 24px', background: 'var(--pf-card2)',
                border: '1px solid var(--pf-border)', borderRadius: '10px',
                color: 'var(--pf-text2)', fontWeight: '600', cursor: 'pointer',
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
          background: var(--pf-bg);
          overflow-y: auto;
        }

        .section-card {
          background: var(--pf-card);
          border: 1px solid var(--pf-border);
          border-radius: 18px;
          padding: 24px;
          box-shadow: var(--pf-shadow);
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

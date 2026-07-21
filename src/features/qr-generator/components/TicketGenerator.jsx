import React from 'react';
import TicketForm from './TicketForm';
import TicketLoading from './TicketLoading';
import QRCodePreview from './QRCodePreview';
import ClaimedSuccess from './ClaimedSuccess';

const TicketGenerator = ({
  appState,
  ticketData,
  vehicleType,
  copied,
  timeLeft,
  formatTime,
  isTimeRunningOut,
  selectedAreaName,
  handleGenerateTicket,
  handleCopyTicketCode,
  handleCancelTicket,
  handleResetTicket
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
      <div style={{ width: '100%', maxWidth: '480px', position: 'relative' }}>
        {appState === 'idle' && (
          <TicketForm handleGenerateTicket={handleGenerateTicket} />
        )}

        {appState === 'loading' && (
          <TicketLoading />
        )}

        {appState === 'generated' && ticketData && (
          <QRCodePreview
            ticketData={ticketData}
            vehicleType={vehicleType}
            copied={copied}
            timeLeft={timeLeft}
            formatTime={formatTime}
            isTimeRunningOut={isTimeRunningOut}
            selectedAreaName={selectedAreaName}
            handleCopyTicketCode={handleCopyTicketCode}
            handleCancelTicket={handleCancelTicket}
            handleResetTicket={handleResetTicket}
          />
        )}

        {appState === 'claimed' && (
          <ClaimedSuccess />
        )}
      </div>
    </div>
  );
};

export default TicketGenerator;

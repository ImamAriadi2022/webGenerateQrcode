import { useState, useEffect } from 'react';
import { getAreas, generateTicket, cancelTicket } from '../api';
import { useTicketListener } from './useTicketListener';

export const useTicketGenerator = (user) => {
  const [appState, setAppState] = useState('idle');
  const [ticketData, setTicketData] = useState(null);
  const [vehicleType] = useState('mobil');
  const [timeLeft, setTimeLeft] = useState(600);
  const [copied, setCopied] = useState(false);

  const [adminAreas, setAdminAreas] = useState([]);
  const [selectedAreaId, setSelectedAreaId] = useState(localStorage.getItem('selectedAreaId') || '');
  const [loadingAreas, setLoadingAreas] = useState(false);

  const ticketId = ticketData?.ticketId || null;
  const { status: firestoreStatus } = useTicketListener(ticketId);

  useEffect(() => {
    if (!user) return;
    const savedAreas = localStorage.getItem('adminAreas');
    if (savedAreas) {
      const areas = JSON.parse(savedAreas);
      setAdminAreas(areas);
      if (!selectedAreaId && areas.length > 0) {
        setSelectedAreaId(areas[0].id);
        localStorage.setItem('selectedAreaId', areas[0].id);
      }
    } else {
      setLoadingAreas(true);
      getAreas()
        .then(res => {
          if (res.data?.data) {
            setAdminAreas(res.data.data);
            if (res.data.data.length > 0 && !selectedAreaId) {
              const defaultArea = res.data.data[0].id;
              setSelectedAreaId(defaultArea);
              localStorage.setItem('selectedAreaId', defaultArea);
            }
          }
        })
        .catch(err => console.error('Gagal fetch areas:', err))
        .finally(() => setLoadingAreas(false));
    }
  }, [user]);

  useEffect(() => {
    if (appState === 'generated' && firestoreStatus === 'claimed') {
      const t0 = setTimeout(() => setAppState('claimed'), 0);
      const t1 = setTimeout(() => { setAppState('idle'); setTicketData(null); }, 3000);
      return () => { clearTimeout(t0); clearTimeout(t1); };
    }
  }, [appState, firestoreStatus]);

  useEffect(() => {
    let interval = null, timeout0 = null;
    if (appState === 'generated' && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    } else if (appState === 'generated' && timeLeft === 0) {
      timeout0 = setTimeout(() => { setAppState('idle'); setTicketData(null); }, 0);
    }
    return () => { if (interval) clearInterval(interval); if (timeout0) clearTimeout(timeout0); };
  }, [appState, timeLeft]);

  const handleGenerateTicket = async () => {
    if (!selectedAreaId) { alert('Silahkan pilih area terlebih dahulu.'); return; }
    setAppState('loading'); setTimeLeft(600); setCopied(false);
    try {
      const response = await generateTicket(selectedAreaId, vehicleType);
      if (response.data?.data) {
        const generated = response.data.data;
        setTicketData(generated);
        setAppState('generated');
      }
      else throw new Error('Format respons tidak valid');
    } catch (err) {
      console.error('Gagal generate tiket:', err);
      alert(err.response?.data?.message || 'Gagal generate tiket');
      setAppState('idle');
    }
  };

  const handleCopyTicketCode = async () => {
    const code = ticketData?.qrCode || ticketData?.ticketId;
    if (!code) return;
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Gagal menyalin kode tiket:', err);
    }
  };

  const handleCancelTicket = async () => {
    if (ticketData?.ticketId) {
      try {
        await cancelTicket(ticketData.ticketId);
      } catch (err) {
        console.error(err);
      }
    }
    setAppState('idle');
    setTicketData(null);
  };

  const handleResetTicket = () => {
    setAppState('idle');
    setTicketData(null);
  };

  const handleSelectArea = (areaId) => {
    setSelectedAreaId(areaId);
    localStorage.setItem('selectedAreaId', areaId);
  };

  const selectedAreaName = adminAreas.find(a => a.id === selectedAreaId)?.name || '';

  const isTimeRunningOut = timeLeft < 60;

  return {
    appState,
    setAppState,
    ticketData,
    setTicketData,
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
  };
};

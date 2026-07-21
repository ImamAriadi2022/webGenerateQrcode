import api from '../../../core/api/client';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../app/config/firebase';

export const getAreas = () => {
  return api.get('/areas');
};

export const generateTicket = (areaId, vehicleType) => {
  return api.post('/gate/generateTicket', { areaId, vehicleType });
};

export const cancelTicket = (ticketId) => {
  const ticketRef = doc(db, 'tickets', ticketId);
  return updateDoc(ticketRef, { status: 'cancelled' });
};

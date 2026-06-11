import api from '@/lib/axios';

export const getAllAppointmentsApi = async () => {
  const res = await api.get('/appointments');
  return res.data;
};

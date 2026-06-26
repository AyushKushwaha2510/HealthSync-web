import api from '@/lib/axios';
import { BookAppointment } from '../types/appointment.type';

export const getAllAppointmentsApi = async () => {
  const res = await api.get('/appointments');
  return res.data;
};

export const bookAppointmentsApi = async (data: BookAppointment) => {
  const res = await api.post('/appointments', data);
  return res.data;
};

export const getOneAppointmentByIdApi = async (id: string) => {
  const res = await api.get(`/appointments/${id}`);
  return res.data;
};

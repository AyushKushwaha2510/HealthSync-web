import { getOneAppointmentByIdApi } from '../api/appointment.api';
import { Appointment } from '../types/appointment.type';

export const getAppointmentInfo = async (id: string): Promise<Appointment> => {
  const res = await getOneAppointmentByIdApi(id);
  return res.data;
};

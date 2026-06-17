import api from '@/lib/axios';
import { BookingCriteria } from '../types/booking-criteria.type';

export const getDoctorAvailabilityByIdApi = async (data: BookingCriteria) => {
  const params = Object.fromEntries(
    Object.entries({
      doctorId: data.doctorId,
      clinicId: data.clinicId,
      hospitalId: data.hospitalId,
      fromDate: data.fromDate,
      toDate: data.toDate,
      weekday: data.weekday,
    }).filter(([_, value]) => value !== undefined),
  );

  const res = await api.get('/doctors-availability', { params });

  return res.data;
};

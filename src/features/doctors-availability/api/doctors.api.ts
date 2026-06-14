import api from '@/lib/axios';

export const getDoctorAvailabilityByIdApi = async (id:string) => {
  const res = await api.get(`/doctors-availability?doctorIds[]=${id}`);
  return res.data;
};

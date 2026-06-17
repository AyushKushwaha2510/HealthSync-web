import api from '@/lib/axios';

export const getDoctorAvailabilityByIdApi = async (id:string) => {
  console.log('doctor ka id', id)
  const res = await api.get(`/doctors-availability?doctorId=${id}`);
  return res.data;
};

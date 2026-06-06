import axios from '@/lib/axios';

export const getMyDetailsApi = async () => {
  const res = await axios.get('/patients/me');
  return res.data;
};
export const doctorRegistrationRequestApi = async () => {
  const res = await axios.post('/patients/doctor-registeration-request');
  return res.data;
};

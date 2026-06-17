import axios from '@/lib/axios';
import { Hospital } from '../types/hospital.type';

export const registerHospitalApi = async (data: Hospital) => {
  const res = await axios.post('/hospitals/register');
  return res.data;
};

export const getAllHospitalsApi = async () => {
  const res = await axios.get('hospitals');
  return res.data;
};

export const getAllHospitalsByDoctorIdApi = async (doctorId: string) => {
  const res = await axios.get(`hospitals/${doctorId}`);
  return res.data;
};

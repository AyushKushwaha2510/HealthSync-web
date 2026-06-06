import axios from '@/lib/axios';
import { ClinicDto } from '../types/clinic.type';

export const registerCliniclApi = async (data: ClinicDto) => {
  const res = await axios.post('/clinics/register');
  return res.data;
};

export const getAllCliniclsApi = async () => {
  const res = await axios.get('clinics');
  return res.data;
};

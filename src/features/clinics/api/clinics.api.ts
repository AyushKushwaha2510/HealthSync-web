import axios from '@/lib/axios';
import { Clinic } from '../types/clinic.type';

export const registerClinicsApi = async (data: Clinic) => {
  const res = await axios.post('/clinics/register');
  return res.data;
};

export const getAllCliniclsApi = async () => {
  const res = await axios.get('clinics');
  return res.data;
};

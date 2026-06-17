import axios from '@/lib/axios';
import { Clinic } from '../types/clinic.type';

export const registerClinicsApi = async (data: Clinic) => {
  const res = await axios.post('/clinics/register');
  return res.data;
};

export const getAllClinicsApi = async () => {
  const res = await axios.get('clinics');
  return res.data;
};

export const getAllClinicsByDoctorIdApi = async (doctorId: string) => {
  const res = await axios.get(`clinics/${doctorId}`);
  return res.data;
};

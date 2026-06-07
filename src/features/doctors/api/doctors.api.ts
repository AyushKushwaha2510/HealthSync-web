import axios from '@/lib/axios';
import { Doctor } from '../types/doctor.type';

export const getAllDoctorsApi = async (data: Partial<Doctor>) => {
  const res = await axios.get('/admin/all-doctors', {
    params: data,
  });
  return res.data;
};

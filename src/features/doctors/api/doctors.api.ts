import axios from '@/lib/axios';
import { Doctor } from '../types/doctor.type';

export const getAllDoctorsApi = async (data: Partial<Doctor>) => {
  const res = await axios.get('/admin/all-doctors', {
    params: data,
  });
  return res.data;
};

export const getDoctorByIdApi = async (id: string) => {
  const res = await axios.get(`/admin/all-doctors/${id}`);
  return res.data;
};

import axios from '@/lib/axios';
import { Doctor } from '../types/doctor.type';
import { CreateDoctorsAvailability } from '@/features/doctors-availability/types/create-availability.type';

export const getAllDoctorsApi = async (data: Partial<Doctor>) => {
  const res = await axios.get('/doctors', {
    params: data,
  });
  return res.data;
};

export const getDoctorByIdApi = async (id: string) => {
  const res = await axios.get(`/admin/all-doctors/${id}`);
  return res.data;
};

export const getProfileApi = async () => {
  const res = await axios.get(`/doctors/profile`);
  return res.data;
};

export const addAvailabilityApi = async (data: CreateDoctorsAvailability) => {
  const res = await axios.post(`/doctors/add-availability`, data);
  return res.data;
};

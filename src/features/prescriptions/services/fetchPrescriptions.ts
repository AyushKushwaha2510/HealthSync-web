import api from '@/lib/axios';
import {
  getAllPrescriptionsApi,
  getOnePrescriptionApi,
} from '../api/prescription.api';
import { Prescription } from '../types/prescription.type';
import { cookies } from 'next/headers';

export const getAllPrescriptions = async (
  doctorId: string,
  patientId: string,
): Promise<Prescription[]> => {
  const res = await getAllPrescriptionsApi(doctorId, patientId);
  return res;
};

export const getAllPrescriptionsSSR = async (
  doctorId: string,
  patientId: string,
) => {
  const cookieStore = await cookies();
  const token = cookieStore.get('accessToken')?.value;
  const res = await api.get('/prescriptions', {
    params: {
      doctorId,
      patientId,
    },
    headers: {
      Cookie: `accessToken=${token}`,
    },
  });
  return res.data;
};

export const getOnePrescription = async (id: string): Promise<Prescription> => {
  const res = await getOnePrescriptionApi(id);
  return res;
};

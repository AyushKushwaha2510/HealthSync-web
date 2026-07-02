import api from '@/lib/axios';
import {
  AddPrescription,
  UpdatePrescription,
} from '../types/prescription.type';

export const getAllPrescriptionsApi = async (
  doctorId: string,
  patientId: string,
) => {
  const res = await api.get('/prescriptions', {
    params: {
      doctorId,
      patientId,
    },
  });
  return res.data;
};

export const getOnePrescriptionApi = async (id: string) => {
  const res = await api.get(`/prescriptions/${id}`);
  return res.data;
};

export const addPrescriptionApi = async (data: AddPrescription) => {
  const res = await api.post('/prescriptions', data);
  return res.data;
};

export const updatePrescriptionApi = async (data: UpdatePrescription) => {
  const { id, ...body } = data;
  // here id is separated because updateDto in backend don't expect id
  const res = await api.patch(`/prescriptions/${id}`, body);
  return res.data;
};

export const downloadPrescriptionApi = async (appointmentId: string) => {
  window.open(
    `${process.env.NEXT_PUBLIC_API_URL}/prescriptions/download/${appointmentId}/pdf`,
    '_blank',
  );
};

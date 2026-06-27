import {
  getAllPrescriptionsApi,
  getOnePrescriptionApi,
} from '../api/prescription.api';
import { Prescription } from '../types/prescription.type';

export const getAllPrescriptions = async (
  doctorId: string,
  patientId: string,
): Promise<Prescription[]> => {
  const res = await getAllPrescriptionsApi(doctorId, patientId);
  return res;
};

export const getOnePrescription = async (
  id: string
): Promise<Prescription> => {
  const res = await getOnePrescriptionApi(id);
  return res;
};

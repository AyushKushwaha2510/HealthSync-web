import {
  getAllClinicsApi,
  getAllClinicsByDoctorIdApi,
} from '../api/clinics.api';

export const getClinicName = async () => {
  return await getAllClinicsApi();
};

export const getClinicNameByDoctorId = async (doctorId: string) => {
  return await getAllClinicsByDoctorIdApi(doctorId);
};

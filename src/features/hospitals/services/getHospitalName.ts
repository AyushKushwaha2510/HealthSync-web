import {
  getAllHospitalsApi,
  getAllHospitalsByDoctorIdApi,
} from '../api/hospitals.api';

export const getHospitalName = async () => {
  return await getAllHospitalsApi();
};

export const getHospitalNameByDoctorId = async (doctorId: string) => {
  return await getAllHospitalsByDoctorIdApi(doctorId);
};

import { getAllHospitalsApi } from "../api/hospitals.api";

export const getHospitalName = async () => {
  return await getAllHospitalsApi();
};

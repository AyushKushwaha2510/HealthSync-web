import { getAllCliniclsApi } from '../api/clinics.api';

export const getClinicName = async () => {
  return await getAllCliniclsApi();
};

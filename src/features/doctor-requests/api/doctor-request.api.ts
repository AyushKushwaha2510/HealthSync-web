import {
  RegisterDoctorDto,
  DoctorRequestDto,
} from '../types/register-doctor.dto';
import axios from '@/lib/axios';

export const doctorRequestApi = async (data: RegisterDoctorDto) => {
  const res = await axios.post('/users/doctor-registeration-request', data);
  return res.data;
};

// List all the pending request to ADMIN
export const allPendingRequestApi = async () => {
  const res = await axios.get('/admin/doctor-requests');
  return res.data;
};

export const pendingRequestByIdApi = async (id: string) => {
  const res = await axios.get(`/admin/doctor-requests/${id}`);
  return res.data;
};

// Admin can change the status to ACCEPT/REJECT
export const approveDoctorRequestApi = async (
  data: Partial<DoctorRequestDto>,
) => {
  const res = await axios.patch(`/admin/doctor-requests/${data.id}/approve`);
  return res.data;
};

export const rejectDoctorRequestApi = async (
  data: Partial<DoctorRequestDto>,
) => {
  const res = await axios.patch(`/admin/doctor-requests/${data.id}/reject`);
  return res.data;
};

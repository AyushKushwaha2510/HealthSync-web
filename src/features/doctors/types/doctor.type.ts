import { User } from '@/features/auth/types/user.type';
import { Clinic } from '@/features/clinics/types/clinic.type';
import { Hospital } from '@/features/hospitals/types/hospital.type';
// import { PatinetDetailsDto } from '@/features/patients/types/patient';

export type Doctor = {
  id: string;
  specialization: string;
  experience: string;
  licenseNumber: string;
  // appointments?:Appoinntmnet
  hospitals?: Hospital[];
  clinics?: Clinic[];
  user: User;
  // patients: PatinetDetailsDto[];
};

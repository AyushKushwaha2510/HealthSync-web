import { Doctor } from '@/features/doctors/types/doctor.type';
import { Gender } from './register.dto';
import { Patinet } from '@/features/patients/types/patient';

export enum Role {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  gender?: Gender;
  dob?: string;
  bloodGroup?: string;
  doctor?: Doctor;
  patient?: Patinet;
};

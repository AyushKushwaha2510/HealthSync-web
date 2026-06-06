import { User } from '@/features/auth/types/user.type';
import { Clinic } from '@/features/clinics/types/clinic.type';
import { Hospital } from '@/features/hospitals/types/hospital.type';

export interface RegisterDoctorDto {
  specialization: string;
  experience: string;
  hospitalIds: string[];
  clinicIds: string[];
  licenseNumber: string;
}

export interface DoctorRequestDto extends RegisterDoctorDto {
  id: string;
  userId: string;
  status: Status;
  rejectionReason?: string;
  user: User;
  hospitals: Hospital[];
  clinics: Clinic[];
}

export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

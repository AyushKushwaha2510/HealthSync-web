import { User } from "@/features/auth/types/user.type";

export interface RegisterDoctorDto {
  specialization: string;
  experience: string;
  hospital: string;
  licenseNumber: string;
}

export interface DoctorRequestDto extends RegisterDoctorDto {
  id: string;
  userId:string;
  status: Status;
  rejectionReason?:string;
  user:User
}

export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

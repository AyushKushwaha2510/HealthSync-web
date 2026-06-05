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
  rejectionReason?:string
}

export enum Status {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

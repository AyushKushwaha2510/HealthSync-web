import { Clinic } from '@/features/clinics/types/clinic.type';
import { Doctor } from '@/features/doctors/types/doctor.type';
import { Hospital } from '@/features/hospitals/types/hospital.type';
import { Patinet } from '@/features/patients/types/patient';

export enum AppointmentStatus {
  PENDING_PAYMENT = 'pending_payment',
  CONFIRMED = 'confirmed',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  EXPIRED = 'expired',
}

export type Appointment = {
  id: string;
  appointmentDateTime: Date;
  status: AppointmentStatus;
  notes: string;
  doctor: Doctor;
  patient: Patinet;
  hospital?: Hospital;
  clinic?: Clinic;
};

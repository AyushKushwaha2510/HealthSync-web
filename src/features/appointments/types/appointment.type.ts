import { Clinic } from '@/features/clinics/types/clinic.type';
import { WeekDays } from '@/features/doctors-availability/types/weekday.enum';
import { Doctor } from '@/features/doctors/types/doctor.type';
import { Hospital } from '@/features/hospitals/types/hospital.type';
import { Patinet } from '@/features/patients/types/patient';
import { Address } from '@/types/address.type';

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

export type BookAppointment = {
  appointmentDate?: string;
  appointmentStartTime?: string;
  appointmentEndTime?: string;
  notes?: string;
  doctorId?: string;
  hospitalId?: string;
  clinicId?: string;
};

export type AppointmentSummary = {
  appointmentDate?: string;
  appointmentTime?: string;
  weekday?: WeekDays;
  notes?: string;
  doctorName?: string;
  appointmentFee?: number;
  patientName?: string;
  location?: {
    name?: string;
    address?: Address;
  };
};

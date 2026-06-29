import { Appointment } from '@/features/appointments/types/appointment.type';

export type AddPrescription = {
  appointmentId: string;
  symptoms?: string[];
  diseases?: string[];
  medicines?: Medicine[];
  notes?: string[];
};

export interface Prescription extends AddPrescription {
  id: string;
  appointment: Partial<Appointment>;
}

export type Medicine = {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  note?: string;
};

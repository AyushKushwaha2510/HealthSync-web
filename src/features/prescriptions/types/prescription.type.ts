import { Appointment } from '@/features/appointments/types/appointment.type';

export type AddPrescription = {
  appointmentId: string;
  symptoms?: string[];
  diseases?: string[];
  medicines?: Medicine[];
  notes?: string[];
};

export interface UpdatePrescription extends AddPrescription {
  id: string;
}

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

export type MedicineAnalysis = {
  name: string;
  purpose: string;
  dosage: string;
  precautions: string[];
  side_effects: string[];
};

export type PrescriptionAnalysis = {
  summary: string;
  medicines: MedicineAnalysis[];
  warnings: string[];
  recommendations: string[];
};

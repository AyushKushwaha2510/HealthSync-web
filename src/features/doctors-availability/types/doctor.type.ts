import { Appointment } from '@/features/appointments/types/appointment.type';
import { Clinic } from '@/features/clinics/types/clinic.type';
import { Doctor } from '@/features/doctors/types/doctor.type';
import { Hospital } from '@/features/hospitals/types/hospital.type';

export type Slot = {
  doctor?: Doctor;
  hospital?: Hospital;
  Clinic?: Clinic;
  weekday: string;
  slots: string[];
};

export type DoctorAvailability = {
  allSlots: Slot[];
  occupiedSlots: {
    data: Appointment[];
    count: number;
  };
};

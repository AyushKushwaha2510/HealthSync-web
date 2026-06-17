import { Clinic } from '@/features/clinics/types/clinic.type';
import { Doctor } from '@/features/doctors/types/doctor.type';
import { Hospital } from '@/features/hospitals/types/hospital.type';
import { WeekDays } from './weekday.enum';

export type BookingCriteria = {
  doctorId?: string;
  hospitalId?: string;
  clinicId?: string;
  weekday?: string;
  fromDate?: string;
  toDate?: string;
};
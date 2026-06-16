import { Clinic } from '@/features/clinics/types/clinic.type';
import { WeekDays } from './weekday.enum';

export type CreateDoctorsAvailability = {
  weekday: WeekDays | null;
  startTime: string;
  endTime: string;
  slotDuration: number;
  clinicId?: string;
  hospitalId?: string;
};

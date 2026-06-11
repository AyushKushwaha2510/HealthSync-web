import { User } from '@/features/auth/types/user.type';

export type Patinet = {
  id: string;
  user: User;
  disease: string[] | null;
  // appointments:Appointments
};

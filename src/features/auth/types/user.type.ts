export enum Role {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  PATIENT = 'patient'
}

export type User = {
  id: string;
  name: string;
  email: string;
  role: Role;
};
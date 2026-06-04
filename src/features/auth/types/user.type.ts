import { Gender } from "./register.dto";

export enum Role {
  ADMIN = 'admin',
  DOCTOR = 'doctor',
  PATIENT = 'patient',
}

export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  gender?:Gender;
  dob?:string;
  bloodGroup?:string;
};

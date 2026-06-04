export type RegisterUserDto = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dob: string;
  bloodGroup?: string;
  gender?: Gender;
};

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'others',
}

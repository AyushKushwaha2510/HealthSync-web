export interface EmailVerificationMail {
  firstName: string;
  lastName: string;
  email: string;
}

export type VerifyMailOtp = {
  email: string;
  otp: number;
};

import api from '@/lib/axios';
import { EmailVerificationMail, VerifyMailOtp } from '../types/emails.type';

export const sendEmailVerificationMailApi = async (
  data: EmailVerificationMail,
) => {
  const res = await api.post('/emails/send-email-verification-mail', data);
  return res.data;
};

export const verifyMailOtpApi = async (
  data: VerifyMailOtp
) => {
  const res = await api.post('/emails/verify-mail-otp', data);
  return res.data;
};

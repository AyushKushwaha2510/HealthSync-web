import api from '@/lib/axios';
import { EmailVerificationMail } from '../types/emails.type';

export const sendEmailVerificationMailApi = async (data: EmailVerificationMail) => {
  const res = await api.post(
    'emails/send-email-verification-mail', 
    data
  );
  return res.data;
};

import { useState } from 'react';
import { RegisterUserDto } from '../types/register.dto';
import { registerApi } from '../api/auth.api';
import { toast } from 'sonner';
import { EmailVerificationMail } from '@/features/emails/types/emails.type';
import { sendEmailVerificationMailApi } from '@/features/emails/api/emails.api';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const register = async (data: RegisterUserDto) => {
    try {
      setLoading(true);
      setError(null);

      const res = await registerApi(data);

      setSuccess(res.message);
      return res;
    }
    catch (err: any) {
      setSuccess(null);
      setError(err.response?.data.message || 'Registration failed');
    }
    finally {
      setLoading(false);
    }
  };

  const sendMailOtp = async (data: EmailVerificationMail) => {
    const toastId = toast.loading("Sending verification code...");

    try {
      await sendEmailVerificationMailApi(data);

      toast.success("Verification code sent to your email.", {
        id: toastId,
      });
    } 
    catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Unable to send verification code. Please try again.";

      toast.error(
        <ul className="list-disc pl-4">
          {message.map((e: string, idx: number) => (
            <li key={idx}>{e}</li>
          ))}
        </ul>,
        {
          id: toastId,
        }
      );

      console.error(error.response.data.message);
    }
  };

  return {
    register,
    loading,
    success,
    error,
    sendMailOtp
  };
};

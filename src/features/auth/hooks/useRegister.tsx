import { useState } from 'react';
import { RegisterUserDto } from '../types/register.dto';
import { registerApi } from '../api/auth.api';

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

  return { register, loading, success, error };
};

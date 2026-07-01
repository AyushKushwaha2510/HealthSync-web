import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '@/store/store';
import { setError, setLoading, setSuccess, setUser } from '../store/auth.slice';
import { loginApi, getMeApi } from '../api/auth.api'; // Import getMeApi here
import { useEffect } from 'react';

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const success = useSelector((state: RootState) => state.auth.success);

  const login = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));

      // 1. Authenticate
      const res = await loginApi({ email, password });

      // Note: Since loginApi already returns `axiosRes.data`, 
      // your token is likely `res.accessToken` or `res.data.accessToken` depending on your backend.
      // const token = res.data?.accessToken || res.accessToken;
      // localStorage.setItem('token', token);

      // 2. Immediately fetch the full user profile! 
      // This solves the "missing data until refresh" bug.
      const userData = await getMeApi();

      dispatch(setError(null));
      dispatch(setSuccess(res.message || 'Login successful!'));

      // 3. Set the full user data into Redux
      dispatch(setUser(userData));

    }
    catch (err: any) {
      dispatch(setSuccess(null));
      dispatch(setError(err.response?.data?.message || 'Login failed'));
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  return { login, user, loading, error, success };
};
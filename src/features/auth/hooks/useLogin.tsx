import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from "../store/auth.thunks";
import type { AppDispatch, RootState } from '@/store/store';
import { setError, setLoading, setSuccess, setUser } from '../store/auth.slice';
import { loginApi } from '../api/auth.api';

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);
  const error = useSelector((state: RootState) => state.auth.error);
  const success = useSelector((state: RootState) => state.auth.success);

  // const login = (email: string, password: string) => {
  //   dispatch(loginUser({ email, password }));
  // };

  const login = async (email: string, password: string) => {
    try {
      dispatch(setLoading(true));

      const res = await loginApi({
        email,
        password,
      });

      // save token in localstorage
      localStorage.setItem('token', res.data.accessToken)

      dispatch(setError(null));
      dispatch(setSuccess(res.message))
      dispatch(setUser(res.data.user));


    }
    catch (err: any) {
      dispatch(setSuccess(null));
      dispatch(setError(err.response?.data.message))
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  return { login, user, loading, error, success };
};

import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from "../store/auth.thunks";
import type { AppDispatch, RootState } from '@/store/store';
import { setLoading, setUser } from '../store/auth.slice';
import { loginApi } from '../api/auth.api';

export const useLogin = () => {
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.auth.loading);

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

      dispatch(setUser(res.user));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return { login, user, loading };
};

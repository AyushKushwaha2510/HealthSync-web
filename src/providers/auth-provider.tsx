'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '@/features/auth/store/auth.slice';
import { getMeApi } from '@/features/auth/api/auth.api';

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;

    const loadUser = async () => {
      try {
        const user = await getMeApi();

        dispatch(setUser(user));
        
      } catch (err) {
        console.log(err);
        localStorage.removeItem('token');
      }
    };

    loadUser();
  }, [dispatch]);

  return <>{children}</>;
}
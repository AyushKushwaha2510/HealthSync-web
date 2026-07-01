import axios from '@/lib/axios';
import { LoginUserDto } from '../types/login.dto';
import { RegisterUserDto } from '../types/register.dto';

export const loginApi = async (data: LoginUserDto) => {
  const res = await axios.post('/auth/login', data);
  return res.data;
};

export const registerApi = async (data: RegisterUserDto) => {
  const res = await axios.post('/auth/register', data);
  return res.data;
};

export const getMeApi = async () => {
  const res = await axios.get('/users/me');
  return res.data;
};

export const logoutApi = async () => {
  const res = await axios.post('/auth/logout');
  return res.data;
};

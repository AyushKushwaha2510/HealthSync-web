import axios from '@/lib/axios';
import { LoginUserDto } from '../types/login.dto';
import { RegisterUserDto } from '../types/register.dto';

export const loginApi = async (data: LoginUserDto) => {
  const res = await axios.post('/auth/login', data);
  return res.data;
};

export const registerApi = async (data: RegisterUserDto) => {
  const res = await axios.post('/auth/register', data);
  console.log('res in api', res);
  return res.data;
};

import api from '@/lib/axios';
import { SendMessage } from '../types/chat.type';

export const sendMessageApi = async (data: SendMessage):Promise<string> => {
  const res = await api.post('/ai/send-message', data);
  return res.data;
};

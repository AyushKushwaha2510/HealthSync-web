import api from '@/lib/axios';
import { CreateOrder, FetchPaymentCriteria, VerifySignature } from '../types/payment.type';

export const createOrderApi = async (data: CreateOrder) => {
  const res = await api.post('payments/create-order', data);
  return res.data;
};

export const verifySignatureApi = async (data: VerifySignature) => {
  const res = await api.post('payments/verify-signature', data);
  return res.data;
};

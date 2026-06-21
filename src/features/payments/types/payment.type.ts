import { Appointment } from '@/features/appointments/types/appointment.type';

export enum PaymentStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  REFUNDED = 'refunded',
}

export enum PaymentProvider {
  RAZORPAY = 'razorpay',
  STRIPE = 'stripe',
}

export type CreateOrder = {
  appointmentId: string;
  amount: number;
};

export type VerifySignature = {
  externalOrderId: string;
  externalPaymentId: string;
  externalSignature: string;
};

export type Payment = {
  id: string;
  appointment: Appointment;
  amount: number;
  currency: string;
  receiptId: string;
  provider: PaymentProvider;
  externalOrderId: string;
  externalPaymentId: string;
  status: PaymentStatus;
  createdAt: Date;
};

// export type FetchPaymentCriteria = {
//   paymentId?: string;
//   receiptId?: string;
//   appointmentId?: string;
//   // patientId?: string;
//   // doctorId?: string;
//   // userId?: string;
// };

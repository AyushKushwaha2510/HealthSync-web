import { toast } from 'sonner';
import { BookAppointment } from '../types/appointment.type';
import { bookAppointment } from './confirm-appointment.service';

export const handleBook = async (
  data: BookAppointment | null,
  fee: number | null | undefined,
  startPayment: (args: {
    appointmentId: string;
    amount: number;
  }) => Promise<void>,
) => {
  if (!data || fee == null) {
    toast.error('Missing appointment information');
    return;
  }

  try {
    const appointment = await bookAppointment(data);

    await startPayment({
      appointmentId: appointment.id,
      amount: fee,
    });

    toast.success('Payment Successfull');
    toast.success('Appointment Confirmed');
  } catch (error) {
    toast.error('Failed to initiate payment');
    throw error;
  }
};

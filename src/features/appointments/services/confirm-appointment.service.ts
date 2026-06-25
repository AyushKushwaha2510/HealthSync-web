import { toast } from 'sonner';
import { BookAppointment } from '../types/appointment.type';
import { bookAppointmentsApi } from '../api/appointment.api';

export const bookAppointment = async (data: BookAppointment) => {
  const toastId = toast.loading('Redirecting to Payments...');

  try {
    const res = await bookAppointmentsApi(data);

    toast.success('Slot Confirmed', {
      id: toastId,
    });
    console.log('res', res);
    return res;
  } catch (error: any) {
    console.log(error.response.data);
    toast.error(
      error?.response?.data?.message || 'Failed to book appointment',
      {
        id: toastId,
      },
    );

    throw error;
  }
};

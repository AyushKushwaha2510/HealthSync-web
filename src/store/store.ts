import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/auth.slice';
import criteriaReducer from '@/features/doctors-availability/store/booking-criteria.slice';
import AppointmentSummary from '@/features/appointments/components/AppointmentSummary';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    criteria: criteriaReducer,
    appointmentSummary: AppointmentSummary,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

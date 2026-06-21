import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/features/auth/store/auth.slice';
import criteriaReducer from '@/features/doctors-availability/store/booking-criteria.slice';
import AppointmentSummaryReducer from '@/features/appointments/store/appointment-summary.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    criteria: criteriaReducer,
    appointmentSummary: AppointmentSummaryReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

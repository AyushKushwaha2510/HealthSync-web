import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookAppointment } from '../types/appointment.type';

type BookingState = {
  bookingInfo: BookAppointment | null;
  loading: boolean;
  error: string | null;
  success: string | null;
};

const initialState: BookingState = {
  bookingInfo: null,
  loading: false,
  error: null,
  success: null,
};

const bookingSlice = createSlice({
  name: 'bookAppointment',
  initialState,
  reducers: {
    setBookingInfo(state, action: PayloadAction<BookAppointment>) {
      state.bookingInfo = {
        ...state.bookingInfo,
        ...action.payload,
      };
    },
    resetBookingInfo(state) {
      state.bookingInfo = null;
      state.error = null;
      state.success = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setSuccess(state, action: PayloadAction<string | null>) {
      state.success = action.payload;
    },
  },
});

export const { setBookingInfo, resetBookingInfo, setLoading, setError, setSuccess } =
  bookingSlice.actions;
export default bookingSlice.reducer;

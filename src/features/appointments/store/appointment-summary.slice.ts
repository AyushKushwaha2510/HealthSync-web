import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppointmentSummary } from '../types/appointment.type';

type SummaryState = {
  summary: AppointmentSummary | null;
  loading: boolean;
  error: string | null;
  success: string | null;
};

const initialState: SummaryState = {
  summary: null,
  loading: false,
  error: null,
  success: null,
};

const summarySlice = createSlice({
  name: 'appointmentSummary',
  initialState,
  reducers: {
    setSummary(state, action: PayloadAction<AppointmentSummary>) {
      state.summary = {
        ...state.summary,
        ...action.payload,
      };
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

export const { setSummary, setLoading, setError, setSuccess } =
  summarySlice.actions;
export default summarySlice.reducer;

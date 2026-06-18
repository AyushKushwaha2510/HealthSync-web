import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BookingCriteria } from '../types/booking-criteria.type';

type CriteriaState = {
  criteria: BookingCriteria | null;
  loading: boolean;
  error: string | null;
  success: string | null;
};

const initialState: CriteriaState = {
  criteria: {},
  loading: false,
  error: null,
  success: null,
};

const criteriaSlice = createSlice({
  name: 'criteria',
  initialState,
  reducers: {
    setCriteria(state, action: PayloadAction<BookingCriteria>) {
      state.criteria = {
        ...state.criteria,
        ...action.payload,
      };
    },
    removeCriteria(state) {
      state.criteria = null;
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

export const { setCriteria, removeCriteria, setLoading, setError, setSuccess } =
  criteriaSlice.actions;
export default criteriaSlice.reducer;

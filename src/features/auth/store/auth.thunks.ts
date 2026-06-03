// import { createAsyncThunk } from "@reduxjs/toolkit";
// import { loginApi } from "../api/auth.api";
// import { setUser, setLoading } from "./auth.slice";

// export const loginUser = createAsyncThunk(
//   "auth/loginUser",
//   async (
//     data: { email: string; password: string },
//     thunkAPI
//   ) => {
//     try {
//       thunkAPI.dispatch(setLoading(true));

//       const res = await loginApi(data);

//       thunkAPI.dispatch(setUser(res.user));

//       return res;
//     } catch (err: any) {
//       return thunkAPI.rejectWithValue(err.response?.data);
//     } finally {
//       thunkAPI.dispatch(setLoading(false));
//     }
//   }
// );
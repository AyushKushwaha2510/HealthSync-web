import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // IMPORTANT for auth cookies
});

// // Optional: request interceptor (for token later)
// api.interceptors.request.use(
//   (config) => {
//     // You can attach token here later if needed
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Optional: response interceptor (global error handling)
// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.log("Unauthorized - maybe redirect to login");
//     }
//     return Promise.reject(error);
//   }
// );

export default api;

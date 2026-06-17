import { useState } from "react";
import { RegisterDoctorDto } from "../types/register-doctor.dto"
import { doctorRequestApi } from "../api/doctor-request.api";

export const useSendRequest = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const request = async (data: RegisterDoctorDto) => {
    try {
      setLoading(true);
      setError(null);
      
      const res = await doctorRequestApi(data);

      setSuccess(res.message);

      return res
    }
    catch (error: any) {
      setSuccess(null);
      setError(error.response?.data.message || 'Registration Request failed');
    }
    finally {
      setLoading(false);
    }
  };

  return { request, loading, error, success };

};
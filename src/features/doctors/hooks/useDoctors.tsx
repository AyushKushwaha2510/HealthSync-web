import { useState } from "react";
import { Doctor } from "../types/doctor.type";
import { getAllDoctorsApi } from "../api/doctors.api";

export const useDoctors = () => {

  const [doctors, setDoctors] = useState<Doctor[] | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchDoctors = async (filters?: Partial<Doctor>) => {

    try {
      setLoading(true);
      setError(null);

      const res = await getAllDoctorsApi(filters || {});

      setDoctors(res.data)
      setSuccess(res.message);

      return res;
    }
    catch (error: any) {
      setSuccess(null);
      setError(
        error.response?.data?.message ||
        'Failed to Find Doctors'
      );
    }
    finally {
      setLoading(false);
    }
  };

  return { fetchDoctors, doctors, loading, error, success };

};
import { useState } from "react";
import { Doctor } from "../types/doctor.type";
import { getDoctorByIdApi } from "../api/doctors.api";

export const useDoctorById = () => {

  const [doctor, setDoctor] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchDoctorsById = async (id: string) => {

    try {
      setLoading(true);
      setError(null);

      const res = await getDoctorByIdApi(id);

      setDoctor(res.data)
      setSuccess(res.message);

      return res;
    }
    catch (error: any) {
      setSuccess(null);
      setError(
        error.response?.data?.message ||
        'Failed to Find Doctor'
      );
    }
    finally {
      setLoading(false);
    }
  };

  return { fetchDoctorsById, doctor, loading, error, success };

};
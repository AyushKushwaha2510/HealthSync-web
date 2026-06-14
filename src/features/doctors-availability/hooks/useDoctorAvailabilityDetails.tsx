import { useState } from "react";
import { DoctorAvailability } from "../types/doctor.type";
import { getDoctorAvailabilityByIdApi } from "../api/doctors.api";

export const useDoctorAvailabilityDetails = () => {

  const [doctorAvailability, setDoctorAvailability] = useState<DoctorAvailability[] | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchDoctorAvailabilityDetails = async (id: string) => {

    try {
      setLoading(true);
      setError(null);

      const res = await getDoctorAvailabilityByIdApi(id);

      setDoctorAvailability(res.data)
      setSuccess(res.message);

      return res;
    }
    catch (error: any) {
      setSuccess(null);
      setError(
        error.response?.data?.message ||
        'Failed to Check Doctor Availability'
      );
    }
    finally {
      setLoading(false);
    }
  };

  return { fetchDoctorAvailabilityDetails, doctorAvailability, loading, error, success };

};
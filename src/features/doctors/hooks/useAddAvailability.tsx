import { useState } from "react";
import { Doctor } from "../types/doctor.type";
import { addAvailabilityApi, getDoctorByIdApi } from "../api/doctors.api";
import { CreateDoctorsAvailability } from "@/features/doctors-availability/types/create-availability.type";

export const useAddAvailability = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const addAvailability = async (data: CreateDoctorsAvailability) => {

    try {
      setLoading(true);
      setError(null);

      const res = await addAvailabilityApi(data);

      setSuccess(res.message);

      return res;
    }
    catch (error: any) {
      setSuccess(null);
      setError(
        error.response?.data?.message ||
        'Failed to Add Availability Details'
      );
    }
    finally {
      setLoading(false);
    }
  };

  return { addAvailability, loading, error, success };

};
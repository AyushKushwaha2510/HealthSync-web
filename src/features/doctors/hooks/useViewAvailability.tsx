import { useState } from "react";
import { viewAvailabilityApi } from "../api/doctors.api";
import { Availability } from "@/features/doctors-availability/types/doctor.type";

export const useViewAvailability = () => {

  const [availabilites, setAvalabilities] = useState<Availability[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const viewAvailability = async () => {

    try {
      setLoading(true);
      setError(null);

      const res = await viewAvailabilityApi();

      setAvalabilities(res.data)
      setSuccess(res.message);

      return res;
    }
    catch (error: any) {
      setSuccess(null);
      setError(
        error.response?.data?.message ||
        'Failed to Fetch Availability Details'
      );
    }
    finally {
      setLoading(false);
    }
  };

  return { viewAvailability, availabilites, loading, error, success };

};
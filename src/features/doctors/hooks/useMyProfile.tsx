import { useState } from "react";
import { Doctor } from "../types/doctor.type";
import { getProfileApi } from "../api/doctors.api";

export const useMyProfile = () => {

  const [profile, setProfile] = useState<Doctor | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchProfile = async () => {

    try {
      setLoading(true);
      setError(null);

      const res = await getProfileApi();

      setProfile(res.data)
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

  return { fetchProfile, profile, loading, error, success };

};
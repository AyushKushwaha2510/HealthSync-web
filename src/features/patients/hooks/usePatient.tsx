import { useState } from 'react';
import { Patinet } from '../types/patient';
import { getMyDetailsApi } from '../api/patient.api';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const usePatient = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [patient, setPatient] = useState<Patinet | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const getMyDetails = async () => {
    if (!user?.id) {
      setError("User not found");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await getMyDetailsApi();

      setPatient(res.data);
      setSuccess(res.message || "Fetched successfully");

      return res.data;
    } 
    catch (err: any) {
      setError(err.response?.data?.message || 'Failed to fetch patient details');
    }
     finally {
      setLoading(false);
    }
  };

  return { patient, loading, success, error, getMyDetails };
};
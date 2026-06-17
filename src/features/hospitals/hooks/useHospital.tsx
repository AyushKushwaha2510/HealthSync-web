import { useState } from "react";
import { Hospital } from "../types/hospital.type";
import { getAllHospitalsApi } from "../api/hospitals.api";

export const useHospital = () => {

  const [hospitals, setHospitals] = useState<Hospital[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const findAllHospitals = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAllHospitalsApi();
      
      setHospitals(res.data)
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

  return { findAllHospitals, hospitals, loading, error, success };

};
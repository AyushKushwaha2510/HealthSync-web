import { useState } from "react";
import { Clinic } from "../types/clinic.type";
import { getAllClinicsApi } from "../api/clinics.api";

export const useClinic = () => {

  const [clinics, setClinics] = useState<Clinic[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const findAllClinics = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getAllClinicsApi();

      setClinics(res.data)
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

  return { findAllClinics, clinics, loading, error, success };

};
import { useState } from "react";
import { DoctorRequestDto } from "../types/register-doctor.dto"
import { pendingRequestByIdApi } from "../api/doctor-request.api";
import { useParams } from "next/navigation";

export const useGetRequestById = () => {

  const [pendingRequestById, setPendingRequestById] = useState<DoctorRequestDto | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const params = useParams();
  const id = params.id as string
  
  const fetchPendingById = async () => {

    try {
      setLoading(true);
      setError(null);

      const res = await pendingRequestByIdApi(id);

      setPendingRequestById(res.data);
      setSuccess(res.message);

      return res;
    }
    catch (error: any) {
      setSuccess(null);
      setError(
        error.response?.data?.message ||
        'Failed to fetch request'
      );
    }
    finally {
      setLoading(false);
    }
  };


  return { fetchPendingById, loading, error, success, pendingRequestById };

};
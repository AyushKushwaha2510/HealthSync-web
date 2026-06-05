import { useState } from "react";
import { DoctorRequestDto } from "../types/register-doctor.dto"
import { allPendingRequestApi } from "../api/doctor-request.api";

export const useAllPendingRequests = () => {

  const [pendingRequests, setPendingRequests] = useState<DoctorRequestDto[] | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchPending = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await allPendingRequestApi()

      setPendingRequests(res.data)
      setSuccess(res.message);

      return res
    }
    catch (error: any) {
      setSuccess(null);
      console.log("error", error.response)
      setError(error.response?.data.message || 'Failed to Update Status');
    }
    finally {
      setLoading(false);
    }
  };

  return { fetchPending, loading, error, success, pendingRequests };

};
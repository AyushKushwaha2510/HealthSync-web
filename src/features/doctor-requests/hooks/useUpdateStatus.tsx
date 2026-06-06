import { useState } from "react";
import { DoctorRequestDto, Status } from "../types/register-doctor.dto"
import { approveDoctorRequestApi, rejectDoctorRequestApi } from "../api/doctor-request.api";

export const useUpdateStatus = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateRequestStatus = async (data: Partial<DoctorRequestDto>) => {

    try {
      setLoading(true);
      setError(null);

      let res ;
      if(data.status === Status.APPROVED)
        res= await approveDoctorRequestApi(data);
      else if(data.status === Status.REJECTED)
        res= await rejectDoctorRequestApi(data);

      setSuccess(res.message);

      return res;
    }
    catch (error: any) {
      setSuccess(null);
      setError(
        error.response?.data?.message ||
        'Failed to Update Status'
      );
    }
    finally {
      setLoading(false);
    }
  };

  return { updateRequestStatus, loading, error, success };

};
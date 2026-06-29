import { useState } from "react"
import {  UpdatePrescription } from "../types/prescription.type";
import { updatePrescriptionApi } from "../api/prescription.api";
import { toast } from "sonner";

export const useUpdatePrescription = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const updatePrescription = async (data: UpdatePrescription) => {
    
    const toastId = toast.loading('Updating Prescription')

    try {
      setLoading(true);

      await updatePrescriptionApi(data);

      toast.success('Prescription Updated', {
        id: toastId
      })
    }
    catch (error: any) {
      toast.error(
        error.response.data.message
        || 'Error Updating Prescription',
        {
          id: toastId
        }
      )
    }
    finally {
      setLoading(false);
    }
  }

  return { updatePrescription, loading }
}
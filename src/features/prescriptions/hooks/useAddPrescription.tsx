import { useState } from "react"
import { AddPrescription } from "../types/prescription.type";
import { addPrescriptionApi } from "../api/prescription.api";
import { toast } from "sonner";

export const useAddPrescription = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const addPrescription = async (data: AddPrescription) => {
    
    const toastId = toast.loading('Adding Prescription')

    try {
      setLoading(true);

      await addPrescriptionApi(data);

      toast.success('Prescription Added', {
        id: toastId
      })
    }
    catch (error: any) {
      toast.error(
        error.response.data.message
        || 'Error Adding Prescription',
        {
          id: toastId
        }
      )
    }
    finally {
      setLoading(false);
    }
  }

  return { addPrescription, loading }
}
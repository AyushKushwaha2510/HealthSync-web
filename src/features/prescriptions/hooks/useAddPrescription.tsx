import { useState } from "react"
import { AddPrescription } from "../types/prescription.type";
import { addPrescriptionApi } from "../api/prescription.api";

export const UseAddPrescription = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const addPrescription = async (data: AddPrescription) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await addPrescriptionApi(data);

      setSuccess(res.message);
    } 
    catch (error: any) {
      setSuccess(null);
      console.log("error", error.response)
      setError(error.response.data);
    } 
    finally {
      setLoading(false);
    }
  }

  return { addPrescription, loading, error, success }
}
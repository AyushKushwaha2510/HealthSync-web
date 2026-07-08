import { useState } from "react"
import { getAllPrescriptionsApi } from "../api/prescription.api";
import { Prescription } from "../types/prescription.type";

export const useAllPrescription = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [prescriptions, setPrescriptions] = useState<Partial<Prescription[] | null>>(null)

  const fetchAllPrescription = async (doctorId?: string, patientId?: string) => {

    try {
      setLoading(true);

      const res = await getAllPrescriptionsApi(doctorId, patientId);

      setPrescriptions(res)

    }
    catch (error: any) {
      console.error("error", error.response.data.message)
    }
    finally {
      setLoading(false);
    }
  }

  return { fetchAllPrescription, prescriptions, loading }
}
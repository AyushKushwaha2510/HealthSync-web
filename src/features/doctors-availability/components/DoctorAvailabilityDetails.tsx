'use client'

import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import { useDoctorAvailabilityDetails } from "../hooks/useDoctorAvailabilityDetails";
import { Clinic } from "@/features/clinics/types/clinic.type";
import { Hospital } from "@/features/hospitals/types/hospital.type";
import { getClinicNameByDoctorId } from "@/features/clinics/services/getClinicName";
import { getHospitalNameByDoctorId } from "@/features/hospitals/services/getHospitalName";

export default function DoctorAvailabilityDetails({ id }: { id: string }) {
  const { fetchDoctorAvailabilityDetails, doctorAvailability, loading, error } = useDoctorAvailabilityDetails();

  const [clinics, setClinics] = useState<Clinic[] | null>(null);
  const [hospitals, setHospitals] = useState<Hospital[] | null>(null);
console.log('doctor ', id)
  useEffect(() => {
    fetchDoctorAvailabilityDetails(id);
  }, [id])

  useEffect(() => {
    async function loadData() {
      const clinicsData = await getClinicNameByDoctorId(id);
      const hospitalsData = await getHospitalNameByDoctorId(id);

      setClinics(clinicsData.data);
      setHospitals(hospitalsData.data);
    }
    loadData()
  }, [id])

  useEffect(() => {
    console.log('doctorAvailability', doctorAvailability)
    console.log('hospital', hospitals)
    console.log('clinic', clinics)

  }, [fetchDoctorAvailabilityDetails, hospitals, clinics])

  if (loading) return <Loading message="Loading..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Doctors
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Availablity of Doctor
        </p>
      </div>

    </div>
  );
}


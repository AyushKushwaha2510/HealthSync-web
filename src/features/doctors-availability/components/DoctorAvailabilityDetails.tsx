'use client'

import { useEffect } from "react";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import { useDoctorAvailabilityDetails } from "../hooks/useDoctorAvailabilityDetails";

export default function DoctorAvailabilityDetails({ id }: { id: string }) {
  const { fetchDoctorAvailabilityDetails, doctorAvailability, loading, error } = useDoctorAvailabilityDetails();

  useEffect(() => {
    fetchDoctorAvailabilityDetails(id);
  }, [id])

  useEffect(() => {
    console.log('doctorAvailability', doctorAvailability)
  }, [fetchDoctorAvailabilityDetails])

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


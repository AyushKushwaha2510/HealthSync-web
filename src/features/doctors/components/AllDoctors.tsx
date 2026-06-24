'use client'

import { useEffect } from "react";
import { useDoctors } from "../hooks/useDoctors"
import { Doctor } from "../types/doctor.type";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { resetSummary, setSummary } from "@/features/appointments/store/appointment-summary.slice";
import { resetBookingInfo, setBookingInfo } from "@/features/appointments/store/book-appointment.slice";
import { removeCriteria } from "@/features/doctors-availability/store/booking-criteria.slice";

export default function AllDoctors({
  specialization,
}: {
  specialization?: string;
}) {
  const { fetchDoctors, doctors, loading, error } = useDoctors();

  useEffect(() => {
    fetchDoctors({ specialization });
  }, [specialization]) // if i am using pagination and limit from backend, then i need a dependcy 

  if (loading) return <Loading message="Loading..." />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
          Doctors
        </h1>

        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Browse and manage registered doctors.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {doctors?.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
          />
        ))}
      </div>
    </div>
  );
}

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {

  const dispatch = useDispatch();

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-lg font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          {doctor.user?.firstName?.[0]}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Dr. {doctor.user?.firstName} {doctor.user?.lastName}
            </h3>

            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              {doctor.specialization}
            </span>
          </div>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {doctor.user?.email}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-500 dark:text-slate-400">
                Hospitals
              </p>

              <p className="font-medium text-slate-900 dark:text-slate-100">
                {doctor.hospitals?.length || 0}
              </p>
            </div>

            <div>
              <p className="text-slate-500 dark:text-slate-400">
                Clinics
              </p>

              <p className="font-medium text-slate-900 dark:text-slate-100">
                {doctor.clinics?.length || 0}
              </p>
            </div>
          </div>

          <div className="mt-5 flex gap-2">
            <Link href={`/search-doctors/${doctor.id}`}>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
                View Profile
              </button>
            </Link>

            <Link href={`/appointments/book/${doctor.id}`}>
              <button
                onClick={() => {
                  dispatch(
                    resetSummary()
                  )
                  dispatch(
                    resetBookingInfo()
                  )
                  dispatch(
                    removeCriteria()
                  )

                  dispatch(
                    setSummary({
                      doctorName: `Dr. ${doctor.user.firstName} ${doctor.user.lastName}`,
                      appointmentFee: doctor.appointmentFee,
                    })
                  )

                  dispatch(
                    setBookingInfo({
                      doctorId: doctor.id
                    })
                  )
                }}
                
                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                Book Appointment
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
'use client'

import { useEffect } from "react"
import { useAllAppointments } from "../hooks/useAllAppointments";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";
import { AppointmentStatus } from "../types/appointment.type";

export default function AllAppointments() {
  const { fetchAllAppointments, appointments, loading, error, success } = useAllAppointments();

  useEffect(() => {
    fetchAllAppointments();
  }, [])

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

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-gradient-to-r from-teal-500 to-blue-400 text-white">
                <th className="px-4 py-3 text-left font-semibold">
                  Patient
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Doctor
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Location
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Date & Time
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Status
                </th>

                <th className="px-4 py-3 text-left font-semibold">
                  Notes
                </th>
              </tr>
            </thead>

            <tbody>
              {appointments?.map((appointment) => (
                <tr
                  key={appointment.id}
                  className="border-b transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
                >
                  <td className="px-4 py-4">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {appointment.patient.user.firstName}{' '}
                      {appointment.patient.user.lastName}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      Dr. {appointment.doctor.user.firstName}{' '}
                      {appointment.doctor.user.lastName}
                    </div>

                    <div className="text-sm text-slate-500">
                      {appointment.doctor.specialization}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    {appointment.hospital?.name ||
                      appointment.clinic?.name ||
                      'N/A'}
                  </td>

                  <td className="px-4 py-4 text-slate-600 dark:text-slate-300">
                    {new Date(
                      appointment.appointmentDateTime
                    ).toLocaleString()}
                  </td>

                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${appointment.status === AppointmentStatus.CONFIRMED
                          ? 'bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300'
                          : appointment.status ===
                            AppointmentStatus.COMPLETED
                            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                            : appointment.status ===
                              AppointmentStatus.CANCELLED
                              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                              : appointment.status ===
                                AppointmentStatus.EXPIRED
                                ? 'bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-200'
                                : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                        }`}
                    >
                      {appointment.status
                        .replaceAll('_', ' ')
                        .toUpperCase()}
                    </span>
                  </td>

                  <td className="max-w-xs truncate px-4 py-4 text-slate-600 dark:text-slate-300">
                    {appointment.notes || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {appointments?.length === 0 && (
            <div className="py-12 text-center text-slate-500">
              No appointments found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


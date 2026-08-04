"use client";

import { useEffect } from "react";
import Container from "@/components/Container";
import { usePatient } from "../hooks/usePatient";

import {
  User,
  Mail,
  Calendar,
  Droplets,
  VenusAndMars,
  Stethoscope,
  ClipboardList,
  BadgeCheck,
  Pencil,
  CalendarDays,
} from "lucide-react";

export default function PatientDetails() {
  const { patient, error, loading, getMyDetails } = usePatient();

  useEffect(() => {
    getMyDetails();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="flex items-center justify-center py-32">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="py-20 flex justify-center">
          <div className="rounded-xl border border-red-300 bg-red-50 dark:bg-red-950 dark:border-red-800 px-6 py-4 text-red-600 dark:text-red-400">
            {error}
          </div>
        </div>
      </Container>
    );
  }

  if (!patient) {
    return (
      <Container>
        <div className="py-20 text-center text-gray-500 dark:text-gray-400">
          No patient data found.
        </div>
      </Container>
    );
  }

  const user = patient.user;

  return (
    <Container>
      <div className="mx-auto max-w-6xl space-y-8 py-8">

        {/* Header */}

        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 text-white shadow-2xl">

          <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <User size={38} />
              </div>

              <div>
                <h1 className="text-3xl font-bold">
                  {user.firstName} {user.lastName}
                </h1>

                <p className="mt-1 text-white/80">
                  Patient ID • {patient.id}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-5 py-2 backdrop-blur-md">
              <BadgeCheck size={18} />
              Active Patient
            </div>

          </div>
        </div>

        {/* Cards */}

        <div className="grid gap-6 lg:grid-cols-2">

          {/* Personal */}

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">

            <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
              <User className="text-blue-600" />
              Personal Information
            </h2>

            <div className="space-y-5">

              <InfoRow
                icon={<Mail size={18} />}
                label="Email"
                value={user.email}
              />

              <InfoRow
                icon={<VenusAndMars size={18} />}
                label="Gender"
                value={user.gender || "Not specified"}
              />

              <InfoRow
                icon={<Calendar size={18} />}
                label="Date of Birth"
                value={user.dob || "Not specified"}
              />

              <InfoRow
                icon={<Droplets size={18} />}
                label="Blood Group"
                value={user.bloodGroup || "Unknown"}
              />

            </div>
          </div>

          {/* Medical */}

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-lg transition hover:-translate-y-1 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900">

            <h2 className="mb-6 flex items-center gap-2 text-xl font-semibold">
              <Stethoscope className="text-emerald-600" />
              Medical Information
            </h2>

            <div className="space-y-5">

              <InfoRow
                icon={<ClipboardList size={18} />}
                label="Disease"
                value={Array.isArray(patient.disease) ? patient.disease.join(", ") : patient.disease || "No active disease"}
              />

              <InfoRow
                icon={<CalendarDays size={18} />}
                label="Appointments"
                value={"0"}
              />

            </div>
          </div>

        </div>

        {/* Buttons */}

        <div className="flex flex-col gap-4 sm:flex-row">

          <button
            className="
              flex items-center justify-center gap-2
              rounded-xl
              bg-blue-600
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-blue-700
              hover:shadow-lg
            "
          >
            <Pencil size={18} />
            Edit Profile
          </button>

          <button
            className="
              flex items-center justify-center gap-2
              rounded-xl
              border
              border-gray-300
              bg-white
              px-6
              py-3
              font-medium
              transition
              hover:bg-gray-100
              dark:border-gray-700
              dark:bg-gray-900
              dark:hover:bg-gray-800
            "
          >
            <CalendarDays size={18} />
            View Appointments
          </button>

        </div>

      </div>
    </Container>
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-xl bg-gray-50 p-4 dark:bg-gray-800">

      <div className="mt-1 text-blue-600">
        {icon}
      </div>

      <div className="flex-1">

        <p className="text-sm text-gray-500 dark:text-gray-400">
          {label}
        </p>

        <p className="mt-1 font-medium text-gray-900 dark:text-white">
          {value}
        </p>

      </div>

    </div>
  );
}
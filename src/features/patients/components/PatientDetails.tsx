'use client'

import { useEffect } from "react";
import Container from "@/components/Container";
import { usePatient } from "../hooks/usePatient";

export default function PatientDetails() {
  const { patient, error, loading, getMyDetails } = usePatient();

  useEffect(() => {
    getMyDetails();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="p-6 text-gray-500">Loading patient details...</div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="p-6 text-red-500">{error}</div>
      </Container>
    );
  }

  if (!patient) {
    return (
      <Container>
        <div className="p-6 text-gray-500">No patient data found</div>
      </Container>
    );
  }

  const user = patient.user;

  return (
    <Container>
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-6 border">

        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Patient Profile
            </h1>
            <p className="text-sm text-gray-500">
              ID: {patient.id}
            </p>
          </div>

          <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
            Active Patient
          </span>
        </div>

        {/* Main Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

          {/* Personal Info */}
          <div className="bg-gray-50 p-4 rounded-xl border">
            <h2 className="text-lg font-medium mb-3 text-gray-700">
              Personal Information
            </h2>

            <div className="space-y-2 text-sm text-gray-600">
              <p><span className="font-medium">Name:</span> {user.firstName} {user.lastName}</p>
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Gender:</span> {user.gender || "Not specified"}</p>
              <p><span className="font-medium">DOB:</span> {user.dob || "Not specified"}</p>
              <p><span className="font-medium">Blood Group:</span> {user.bloodGroup || "Unknown"}</p>
            </div>
          </div>

          {/* Medical Info */}
          <div className="bg-gray-50 p-4 rounded-xl border">
            <h2 className="text-lg font-medium mb-3 text-gray-700">
              Medical Information
            </h2>

            <div className="space-y-2 text-sm text-gray-600">
              <p>
                <span className="font-medium">Disease:</span>{" "}
                {patient.disease || "No active disease"}
              </p>

              <p>
                <span className="font-medium">Appointments:</span>{" "}
                {/* {patient.appointments?.length || 0} */}
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex gap-3">
          <button className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700">
            Edit Profile
          </button>

          <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 text-sm hover:bg-gray-300">
            View Appointments
          </button>
        </div>
      </div>
    </Container>
  );
}
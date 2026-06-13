'use client';

import { useEffect } from 'react';
import { useMyProfile } from '../hooks/useMyProfile';
import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

export default function MyProfile() {
  const {
    fetchProfile,
    profile,
    loading,
    error,
  } = useMyProfile();

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return <Loading message="Loading Profile..." />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  const initials = `${profile?.user?.firstName?.[0] ?? ''}${
    profile?.user?.lastName?.[0] ?? ''
  }`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-400 shadow-xl">
        <div className="absolute inset-0 bg-black/5" />

        <div className="relative flex flex-col items-center gap-6 p-8 text-white lg:flex-row">
          <div className="flex h-32 w-32 items-center justify-center rounded-full border-4 border-white/30 bg-white/20 text-5xl font-bold backdrop-blur">
            {initials}
          </div>

          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold lg:text-4xl">
              Dr. {profile?.user?.firstName} {profile?.user?.lastName}
            </h1>

            <p className="mt-2 text-lg text-white/90 lg:text-xl">
              {profile?.specialization}
            </p>

            <div className="mt-4 flex flex-wrap justify-center gap-3 lg:justify-start">
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
                {profile?.experience} Years Experience
              </span>

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm backdrop-blur">
                License: {profile?.licenseNumber}
              </span>

              <span className="rounded-full bg-white/20 px-4 py-2 text-sm capitalize backdrop-blur">
                {profile?.user?.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl bg-teal-500 p-5 text-white shadow-lg">
          <p className="text-sm opacity-80">
            Experience
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {profile?.experience}
          </h3>

          <p className="text-sm">
            Years
          </p>
        </div>

        <div className="rounded-2xl bg-blue-400 p-5 text-white shadow-lg">
          <p className="text-sm opacity-80">
            Hospitals
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {profile?.hospitals?.length ?? 0}
          </h3>

          <p className="text-sm">
            Associated
          </p>
        </div>

        <div className="rounded-2xl bg-slate-800 p-5 text-white shadow-lg">
          <p className="text-sm opacity-80">
            Clinics
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {profile?.clinics?.length ?? 0}
          </h3>

          <p className="text-sm">
            Associated
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Personal Information */}
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-6 text-xl font-semibold text-teal-600 dark:text-teal-400">
            Personal Information
          </h2>

          <div className="space-y-5">
            <InfoRow
              label="Full Name"
              value={`${profile?.user?.firstName} ${profile?.user?.lastName}`}
            />

            <InfoRow
              label="Email"
              value={profile?.user?.email}
            />

            <InfoRow
              label="Gender"
              value={profile?.user?.gender}
            />

            <InfoRow
              label="Date Of Birth"
              value={profile?.user?.dob}
            />

            <InfoRow
              label="Blood Group"
              value={profile?.user?.bloodGroup || 'Not Available'}
            />

            <InfoRow
              label="Role"
              value={profile?.user?.role}
            />
          </div>
        </div>

        {/* Professional Information */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-6 text-xl font-semibold text-blue-500">
            Professional Information
          </h2>

          <div className="grid gap-5 md:grid-cols-2">
            <InfoRow
              label="Specialization"
              value={profile?.specialization}
            />

            <InfoRow
              label="Experience"
              value={`${profile?.experience} Years`}
            />

            <InfoRow
              label="License Number"
              value={profile?.licenseNumber}
            />

            <InfoRow
              label="Account Type"
              value={profile?.user?.role}
            />
          </div>
        </div>
      </div>

      {/* Hospitals */}
      {profile?.hospitals && profile.hospitals.length > 0 && (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-6 text-xl font-semibold text-teal-600 dark:text-teal-400">
            Associated Hospitals
          </h2>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {profile.hospitals.map((hospital) => (
              <div
                key={hospital.id}
                className="rounded-2xl border border-slate-200 p-5 transition-all hover:shadow-md dark:border-slate-700"
              >
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  {hospital.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {hospital.phone || 'No Phone Available'}
                </p>

                {hospital.address && (
                  <p className="mt-1 text-sm text-slate-500">
                    {hospital.address.city},{' '}
                    {hospital.address.state}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Clinics */}
      {profile?.clinics && profile.clinics.length > 0 && (
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="mb-6 text-xl font-semibold text-blue-500">
            Associated Clinics
          </h2>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {profile.clinics.map((clinic) => (
              <div
                key={clinic.id}
                className="rounded-2xl border border-slate-200 p-5 transition-all hover:shadow-md dark:border-slate-700"
              >
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                  {clinic.name}
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  {clinic.phone || 'No Phone Available'}
                </p>

                {clinic.address && (
                  <p className="mt-1 text-sm text-slate-500">
                    {clinic.address.city},{' '}
                    {clinic.address.state}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string | number | null;
}) {
  return (
    <div className="border-b border-slate-100 pb-3 dark:border-slate-800">
      <p className="text-sm text-slate-500">
        {label}
      </p>

      <p className="mt-1 font-medium text-slate-900 dark:text-slate-100">
        {value || '-'}
      </p>
    </div>
  );
}
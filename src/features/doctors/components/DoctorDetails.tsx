import { useEffect } from "react";
import { User, Mail, Cake, VenusAndMars, Zap, Target, BarChart3, ScrollText, Building2, Phone, MapPin, Eye, Hospital, Stethoscope, CalendarDays, Award, ChevronRight } from "lucide-react";
import { useDoctorById } from "../hooks/useDoctorById";
import { Doctor } from "../types/doctor.type";
import Loading from "@/components/Loading";
import ErrorMessage from "@/components/ErrorMessage";

export default function DoctorDetails({ id }: { id: string }) {
  const { fetchDoctorsById, doctor, loading, error } = useDoctorById();

  useEffect(() => {
    fetchDoctorsById(id);
  }, [id]);

  if (loading) return <Loading message="Loading doctor details..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
      <div className="container mx-auto px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
        {doctor && (
          <div className="mx-auto max-w-7xl space-y-6 md:space-y-8">
            <DoctorProfileHeader doctor={doctor} />

            <div className="grid grid-cols-3 gap-3 md:gap-5">
              <StatCard
                label="Experience"
                value={`${doctor.experience} yrs`}
                icon={<CalendarDays className="h-4 w-4" />}
              />
              <StatCard
                label="Hospitals"
                value={doctor.hospitals?.length || 0}
                icon={<Hospital className="h-4 w-4" />}
              />
              <StatCard
                label="Clinics"
                value={doctor.clinics?.length || 0}
                icon={<Stethoscope className="h-4 w-4" />}
              />
            </div>

            <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
              <PersonalInfo doctor={doctor} />
              <ProfessionalInfo doctor={doctor} />
            </div>

            {doctor.hospitals && doctor.hospitals.length > 0 && (
              <HospitalSection hospitals={doctor.hospitals} />
            )}

            {doctor.clinics && doctor.clinics.length > 0 && (
              <ClinicSection clinics={doctor.clinics} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function DoctorProfileHeader({ doctor }: { doctor: Doctor }) {
  const fullName = `Dr. ${doctor.user.firstName} ${doctor.user.lastName}`;
  const initials = `${doctor.user.firstName?.[0]}${doctor.user.lastName?.[0]}`;

  return (
    <div className="group relative overflow-hidden rounded-2xl md:rounded-3xl bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:bg-slate-900/90 dark:backdrop-blur-sm">
      <div className="relative h-28 md:h-36 bg-gradient-to-r from-teal-500 via-teal-400 to-blue-500">
        <div className="absolute inset-0 bg-black/5" />
      </div>

      <div className="relative px-5 pb-6 md:px-8 md:pb-8">
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:gap-5 -mt-12 md:-mt-16">
          <div className="flex h-24 w-24 md:h-32 md:w-32 items-center justify-center rounded-2xl md:rounded-3xl border-4 border-white bg-gradient-to-br from-teal-500 to-blue-500 text-3xl md:text-5xl font-bold text-white shadow-xl dark:border-slate-900">
            {initials}
          </div>

          <div className="flex-1 pb-1 text-left sm:pb-2">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white md:text-3xl lg:text-4xl">
              {fullName}
            </h1>
            <div className="mt-1 flex flex-wrap items-center gap-2 md:mt-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
                <Award className="h-3.5 w-3.5" />
                {doctor.specialization}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400">
                • License: {doctor.licenseNumber}
              </span>
            </div>
          </div>

          <button className="mt-2 inline-flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition-all hover:bg-blue-100 dark:bg-blue-950/50 dark:text-blue-400 dark:hover:bg-blue-950 sm:mt-0">
            <Eye className="h-4 w-4" />
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
}) {
  return (
    <div className="group rounded-xl md:rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-blue-400 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-blue-500">
      <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
        {icon}
        <span>{label}</span>
      </div>
      <p className="mt-1 text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
        {value}
      </p>
    </div>
  );
}

function PersonalInfo({ doctor }: { doctor: Doctor }) {
  const infoItems = [
    { label: "Email", value: doctor.user.email, icon: Mail },
    { label: "Date of Birth", value: doctor.user.dob, icon: Cake },
    { label: "Gender", value: doctor.user.gender, icon: VenusAndMars },
    { label: "Role", value: doctor.user.role, icon: Zap },
  ];

  return (
    <div className="rounded-xl md:rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 md:p-6">
      <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800 md:mb-6">
        <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
          <User className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white md:text-xl">
          Personal Information
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {infoItems.map((item) => (
          <InfoItem
            key={item.label}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}

function ProfessionalInfo({ doctor }: { doctor: Doctor }) {
  const infoItems = [
    { label: "Specialization", value: doctor.specialization, icon: Target },
    { label: "Experience", value: `${doctor.experience} Years`, icon: BarChart3 },
    { label: "License Number", value: doctor.licenseNumber, icon: ScrollText },
  ];

  return (
    <div className="rounded-xl md:rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 md:p-6">
      <div className="mb-5 flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800 md:mb-6">
        <div className="rounded-lg bg-teal-100 p-2 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
          <Award className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white md:text-xl">
          Professional Information
        </h2>
      </div>

      <div className="space-y-4">
        {infoItems.map((item) => (
          <InfoItem
            key={item.label}
            label={item.label}
            value={item.value}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: React.ReactNode;
  icon: React.ElementType;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50">
      <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
      <div className="flex-1">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 font-medium text-slate-900 dark:text-white">
          {value || "Not specified"}
        </p>
      </div>
    </div>
  );
}

function HospitalSection({ hospitals }: { hospitals: Doctor["hospitals"] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-teal-100 p-2 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
            <Hospital className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
            Associated Hospitals
          </h2>
        </div>
        <span className="rounded-full bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700 dark:bg-teal-950/50 dark:text-teal-300">
          {hospitals?.length || 0}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {hospitals?.map((hospital) => (
          <HospitalCard key={hospital.id} hospital={hospital} />
        ))}
      </div>
    </div>
  );
}

function HospitalCard({ hospital }: { hospital: NonNullable<Doctor["hospitals"]>[number] }) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50 md:p-5">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-teal-100 p-2 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400">
            <Building2 className="h-4 w-4" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
            {hospital.name}
          </h3>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-start gap-1.5">
          <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
          <p className="line-clamp-1">{hospital.address.line1}</p>
        </div>
        <p className="pl-5 text-xs">
          {hospital.address.city}, {hospital.address.state} -{" "}
          {hospital.address.pinCode}
        </p>
        <div className="flex items-center gap-1.5 pt-1 text-xs font-medium text-blue-600 dark:text-blue-400">
          <Phone className="h-3 w-3" />
          {hospital.phone}
        </div>
      </div>
    </div>
  );
}

function ClinicSection({ clinics }: { clinics: Doctor["clinics"] }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <Stethoscope className="h-5 w-5" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
            Clinics
          </h2>
        </div>
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
          {clinics?.length || 0}
        </span>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {clinics?.map((clinic) => (
          <ClinicCard key={clinic.id} clinic={clinic} />
        ))}
      </div>
    </div>
  );
}

function ClinicCard({ clinic }: { clinic: NonNullable<Doctor["clinics"]>[number] }) {
  return (
    <div className="group rounded-xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/50 md:p-5">
      <div className="mb-3 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <Building2 className="h-4 w-4" />
          </div>
          <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-1">
            {clinic.name}
          </h3>
        </div>
        <ChevronRight className="h-4 w-4 text-slate-400 opacity-0 transition-opacity group-hover:opacity-100" />
      </div>

      <div className="space-y-1.5 text-sm text-slate-600 dark:text-slate-400">
        <div className="flex items-start gap-1.5">
          <MapPin className="mt-0.5 h-3.5 w-3.5 flex-shrink-0" />
          <p className="line-clamp-1">{clinic.address.line1}</p>
        </div>
        <p className="pl-5 text-xs">
          {clinic.address.city}, {clinic.address.state} -{" "}
          {clinic.address.pinCode}
        </p>
        <div className="flex items-center gap-1.5 pt-1 text-xs font-medium text-blue-600 dark:text-blue-400">
          <Phone className="h-3 w-3" />
          {clinic.phone}
        </div>
      </div>
    </div>
  );
}
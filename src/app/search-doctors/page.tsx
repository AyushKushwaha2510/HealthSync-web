'use client';

import Container from "@/components/Container";
import AllDoctors from "@/features/doctors/components/AllDoctors";
import DoctorsSidebar from "@/features/doctors/components/DoctorsSidebar";
import { useSearchParams } from 'next/navigation';

export default function Page() {

  const searchParams = useSearchParams();
  const specialization = searchParams.get('specialization') ?? undefined;

  return (
    <Container className="flex">
      <DoctorsSidebar tabs={tabs} />

      <main className="ml-72 flex-1">
        <AllDoctors specialization={specialization} />
      </main>
    </Container>
  );
}

const specializations = [
  'Cardiologist',
  'Dermatologist',
  'Neurologist',
  'Orthopedic',
  'Pediatrician',
  'Psychiatrist',
  'ENT Specialist',
  'Gynecologist',
  'Ophthalmologist',
  'General Physician',
];

const tabs = [
  {
    label: "All Doctors",
    path: "/search-doctors",
  },
  ...specializations.map((label) => ({
    label,
    path: `/search-doctors?specialization=${encodeURIComponent(label)}`,
  })),
];
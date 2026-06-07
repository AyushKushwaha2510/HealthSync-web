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
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
];

const tabs = [
  {
    label: "All Doctors",
    path: "/admin/doctors",
  },
  ...specializations.map((label) => ({
    label,
    path: `/admin/doctors?specialization=${encodeURIComponent(label)}`,
  })),
];
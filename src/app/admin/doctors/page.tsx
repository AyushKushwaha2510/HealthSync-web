import Container from "@/components/Container";
import AllDoctors from "@/features/doctors/components/AllDoctors";
import DoctorsSidebar from "@/features/doctors/components/DoctorsSidebar";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ specialization?: string }>;
}) {
  const { specialization } = await searchParams;

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
    path: "/admin/doctors",
  },
  ...specializations.map((label) => ({
    label,
    path: `/admin/doctors?specialization=${encodeURIComponent(label)}`,
  })),
];
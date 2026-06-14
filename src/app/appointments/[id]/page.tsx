import Container from "@/components/Container";
import DoctorAvailabilityDetails from "@/features/doctors-availability/components/DoctorAvailabilityDetails";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <Container>
      <DoctorAvailabilityDetails id={id} />
    </Container>
  )
}
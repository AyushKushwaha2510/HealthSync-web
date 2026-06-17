import Container from "@/components/Container";
import DoctorAvailabilityDetails from "@/features/doctors-availability/components/DoctorAvailabilityDetails";

export default async function Page({ params }: { params: Promise<{ doctor_id: string }> }) {
  const { doctor_id } = await params;
  console.log('para, ', doctor_id)
  return (
    <Container>
      <DoctorAvailabilityDetails id={doctor_id} />
    </Container>
  )
}
import Container from "@/components/Container";
import AppointmentSummary from "@/features/appointments/components/AppointmentSummary";
import DoctorAvailabilityDetails from "@/features/doctors-availability/components/DoctorAvailabilityDetails";

export default async function Page({ params }: { params: Promise<{ doctor_id: string }> }) {
  const { doctor_id } = await params;
  return (
    <Container className="flex items-start">
      <DoctorAvailabilityDetails id={doctor_id} />
      <AppointmentSummary/>
    </Container>
  )
}
import Container from "@/components/Container";
import AppointmentDetails from "@/features/appointments/components/AppointmentDetails";
import PrescriptionDetails from "@/features/prescriptions/components/PrescriptionDetails";

export default async function Page({
  params
}: {
  params: Promise<{ id: string }>
}) {

  const { id } = await params;

  console.log("params", params)
  return (
    <Container className="!mt-0 gap-5 items-start">
      <AppointmentDetails id={id} />
      <PrescriptionDetails appointmentId={id} />
    </Container>
  )
}
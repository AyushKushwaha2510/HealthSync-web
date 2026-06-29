import { getAppointmentInfo } from "@/features/appointments/services/getAppointmentInfo";
import PrescriptionActions from "./ActionButtons";
import PrescriptionForm from "./PrescriptionForm";

export default async function PrescriptionDetails({
  appointmentId,
}: {
  appointmentId: string
}) {
  const appointment = await getAppointmentInfo(appointmentId);
  const prescription = appointment.prescription;

  return (
    <div className="space-y-5">
      <PrescriptionActions
        appointmentId={appointmentId}
      />

      <PrescriptionForm
        prescription={prescription}
        appointmentId={appointmentId}
      />
    </div>
  )
}
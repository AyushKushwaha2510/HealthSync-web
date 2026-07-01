import { getAppointmentInfo } from "@/features/appointments/services/getAppointmentInfo";
import PrescriptionActions from "./ActionButtons";
import PrescriptionForm from "./PrescriptionForm";
import { getAllPrescriptions, getAllPrescriptionsSSR } from "../services/fetchPrescriptions";

export default async function PrescriptionDetails({
  appointmentId,
}: {
  appointmentId: string
}) {
  const appointment = await getAppointmentInfo(appointmentId);
  const prescription = appointment.prescription;
  
  const history = await getAllPrescriptionsSSR(appointment.doctor.id, appointment.patient.id)

  return (
    <div className="space-y-5">
      <PrescriptionActions
        appointmentId={appointmentId}
        history={history}
      />

      <PrescriptionForm
        prescription={prescription}
        appointmentId={appointmentId}
      />
    </div>
  )
}
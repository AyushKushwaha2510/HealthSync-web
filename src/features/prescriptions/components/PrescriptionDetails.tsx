import PrescriptionActions from "./ActionButtons";
import PrescriptionForm from "./PrescriptionForm";

export default function PrescriptionDetails({ appointmentId }: { appointmentId: string }) {
  return (
    <div className="space-y-5">
      <PrescriptionActions
        appointmentId={appointmentId}
      />
      
      <PrescriptionForm
        appointmentId={appointmentId}
      />
    </div>
  )
}
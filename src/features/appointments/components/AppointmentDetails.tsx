import AppointmentHeader from "./AppointmentHeader";
import AppointmentCard from "./AppointmentCard";
import NotesCard from "./NotesCard";
import PatientCard from "./PatientCard";
import StatsCards from "./StatsCards";
import { getAppointmentInfo } from "../services/getAppointmentInfo";
import AppointmentActions from "./ActionButtons";

export default async function AppointmentDetails({
  id,
}: {
  id: string;
}) {
  const appointment = await getAppointmentInfo(id);

  return (
    <div className="space-y-6">
      <AppointmentHeader appointment={appointment} />

      <StatsCards appointment={appointment} />

      <div className="grid gap-6 lg:grid-cols-2">
        <PatientCard patient={appointment.patient} />
        <AppointmentCard appointment={appointment} />
      </div>

      <NotesCard notes={appointment.notes} />

      <AppointmentActions appointmentId={appointment.id} />
    </div>
  );
}
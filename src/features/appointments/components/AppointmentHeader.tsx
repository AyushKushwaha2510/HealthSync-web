import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays } from "lucide-react";

export default function AppointmentHeader({
  appointment,
}: {
  appointment: any;
}) {
  const patient = appointment.patient;

  const initials = `${patient.user.firstName[0]}${patient.user.lastName[0]}`;

  return (
    <div className="flex flex-col gap-5 rounded-xl border bg-card p-6 shadow-sm md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-5">
        <Avatar className="h-20 w-20">
          <AvatarImage src={patient.user.profileImageUrl} />
          <AvatarFallback className="text-xl font-bold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div>
          <h1 className="text-3xl font-bold">
            {patient.user.firstName} {patient.user.lastName}
          </h1>

          <div className="mt-2 flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            Follow-up Consultation
          </div>
        </div>
      </div>

      <Badge
        className="px-4 py-1 text-sm capitalize"
        variant={
          appointment.status === "confirmed"
            ? "default"
            : appointment.status === "cancelled"
            ? "destructive"
            : "secondary"
        }
      >
        {appointment.status}
      </Badge>
    </div>
  );
}
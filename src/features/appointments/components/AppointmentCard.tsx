import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CalendarDays,
  Clock3,
  Timer,
  CalendarClock,
} from "lucide-react";
import { format } from "date-fns";
import InfoRow from "./InfoRow";
import StatusBadge from "./StatusBadge";

export default function AppointmentCard({
  appointment,
}: {
  appointment: any;
}) {
  const duration =
    (new Date(`1970-01-01T${appointment.endTime}`).getTime() -
      new Date(`1970-01-01T${appointment.startTime}`).getTime()) /
    60000;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Details</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <InfoRow
          label="Appointment Date"
          value={
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {format(new Date(appointment.date), "dd MMM yyyy")}
            </span>
          }
        />

        <InfoRow
          label="Time"
          value={
            <span className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              {appointment.startTime.slice(0, 5)} -{" "}
              {appointment.endTime.slice(0, 5)}
            </span>
          }
        />

        <InfoRow
          label="Duration"
          value={
            <span className="flex items-center gap-2">
              <Timer className="h-4 w-4" />
              {duration} minutes
            </span>
          }
        />

        <InfoRow
          label="Booked On"
          value={
            <span className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4" />
              {format(
                new Date(appointment.bookingDateTime),
                "dd MMM yyyy, hh:mm a"
              )}
            </span>
          }
        />

        <InfoRow
          label="Status"
          value={<StatusBadge status={appointment.status} />}
        />

        <InfoRow
          label="Expires At"
          value={
            appointment.expiresAt
              ? format(
                  new Date(appointment.expiresAt),
                  "dd MMM yyyy, hh:mm a"
                )
              : "-"
          }
        />
      </CardContent>
    </Card>
  );
}
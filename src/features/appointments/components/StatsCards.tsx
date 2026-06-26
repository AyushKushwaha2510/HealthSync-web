import { Card, CardContent } from "@/components/ui/card";
import {
  BadgeCheck,
  Clock3,
  CalendarDays,
} from "lucide-react";
import { format } from "date-fns";

export default function StatsCards({
  appointment,
}: {
  appointment: any;
}) {
  const duration =
    (new Date(`1970-01-01T${appointment.endTime}`).getTime() -
      new Date(`1970-01-01T${appointment.startTime}`).getTime()) /
    60000;

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <BadgeCheck className="h-10 w-10 text-green-600" />

          <div>
            <p className="text-sm text-muted-foreground">
              Status
            </p>

            <h3 className="text-xl font-semibold capitalize">
              {appointment.status}
            </h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <Clock3 className="h-10 w-10 text-blue-600" />

          <div>
            <p className="text-sm text-muted-foreground">
              Duration
            </p>

            <h3 className="text-xl font-semibold">
              {duration} mins
            </h3>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <CalendarDays className="h-10 w-10 text-orange-600" />

          <div>
            <p className="text-sm text-muted-foreground">
              Booked On
            </p>

            <h3 className="text-lg font-semibold">
              {format(
                new Date(appointment.bookingDateTime),
                "dd MMM yyyy"
              )}
            </h3>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
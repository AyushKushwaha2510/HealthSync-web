import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Droplets,
  Mail,
  UserRound,
  Calendar,
  HeartPulse,
} from "lucide-react";
import { format } from "date-fns";
import InfoRow from "./InfoRow";

export default function PatientCard({
  patient,
}: {
  patient: any;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Information</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        <InfoRow
          label="Gender"
          value={
            <span className="flex items-center gap-2">
              <UserRound className="h-4 w-4" />
              {patient.user.gender}
            </span>
          }
        />

        <InfoRow
          label="Blood Group"
          value={
            <span className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-red-500" />
              {patient.user.bloodGroup ?? "-"}
            </span>
          }
        />

        <InfoRow
          label="DOB"
          value={
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {format(new Date(patient.user.dob), "dd MMM yyyy")}
            </span>
          }
        />

        <InfoRow
          label="Email"
          value={
            <span className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              {patient.user.email}
            </span>
          }
        />

        <InfoRow
          label="Disease"
          value={
            <span className="flex items-center gap-2">
              <HeartPulse className="h-4 w-4" />
              {patient.disease ?? "-"}
            </span>
          }
        />
      </CardContent>
    </Card>
  );
}
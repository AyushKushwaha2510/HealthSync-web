import {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Prescription } from "../types/prescription.type";
import { formatDate, formatTime } from "@/helpers/date-time";

export default function PrescriptionHistory({
  history,
}: {
  history: Prescription[];
}) {
  return (
    <DropdownMenuContent className="w-96 p-2">
      <DropdownMenuLabel>Prescription History</DropdownMenuLabel>
      <DropdownMenuSeparator />

      {history.length === 0 ? (
        <p className="p-3 text-center text-sm text-muted-foreground">
          No previous prescriptions
        </p>
      ) : (
        <div className="w-full">
          {/* Header */}
          <div className="grid grid-cols-[60px_1fr_100px_80px] items-center border-b pb-2 text-sm font-semibold">
            <span>S.No</span>
            <span>Date</span>
            <span>Time</span>
            <span className="text-center">Action</span>
          </div>

          {/* Rows */}
          {history.map((prescription, index) => (
            <div
              key={prescription.id}
              className="grid grid-cols-[60px_1fr_100px_80px] items-center border-b py-2 last:border-0"
            >
              <span>{index + 1}</span>

              <span className="text-sm">
                {formatDate(prescription.appointment.date ?? "")}
              </span>

              <span className="text-sm">
                {formatTime(prescription.appointment.startTime ?? "")}
              </span>

              <div className="flex justify-center">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => console.log(prescription.id)}
                >
                  View
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </DropdownMenuContent>
  );
}
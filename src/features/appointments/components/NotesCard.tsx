import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { NotebookPen } from "lucide-react";

export default function NotesCard({
  notes,
}: {
  notes?: string;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3 space-y-0">
        <NotebookPen className="h-5 w-5 text-primary" />

        <CardTitle>Doctor Notes</CardTitle>
      </CardHeader>

      <CardContent>
        {notes ? (
          <p className="leading-7 text-muted-foreground">
            {notes}
          </p>
        ) : (
          <div className="rounded-lg border border-dashed py-10 text-center text-muted-foreground">
            No notes added for this appointment.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
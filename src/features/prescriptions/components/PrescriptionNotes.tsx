import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface PrescriptionNotesProps {
  index: number;
  note: string;
  onChange: (value: string) => void;
  onRemove: () => void;
}

export function PrescriptionNotes({
  index,
  note,
  onChange,
  onRemove,
}: PrescriptionNotesProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-6 text-sm font-medium text-muted-foreground">
        {index + 1}.
      </span>

      <Input
        className="flex-1"
        value={note}
        placeholder="Enter note..."
        onChange={(e) => onChange(e.target.value)}
      />

      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onRemove}
      >
        <Trash2 className="h-4 w-4 text-red-500" />
      </Button>
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";

interface MedicineCardProps {
  index: number;
  medicine: {
    name: string;
    dosage: string;
    frequency: string;
    duration: string;
    note?: string;
  };
  onRemove: () => void;
  onChange: (
    field: keyof MedicineCardProps["medicine"],
    value: string
  ) => void;
}

export function MedicineCard({
  index,
  medicine,
  onRemove,
  onChange,
}: MedicineCardProps) {
  return (
    <Card className="rounded-xl border-border transition-all hover:border-blue-500/40">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">
            Medicine #{index + 1}
          </CardTitle>

          <Button
            variant="ghost"
            size="icon"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        </div>

      </CardHeader>

      <CardContent className="space-y-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <Label>Name</Label>
            <Input
              value={medicine.name}
              placeholder="Paracetamol"
              onChange={(e) =>
                onChange("name", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Dosage</Label>
            <Input
              value={medicine.dosage}
              placeholder="500 mg"
              onChange={(e) =>
                onChange("dosage", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Frequency</Label>
            <Input
              value={medicine.frequency}
              placeholder="1-0-1"
              onChange={(e) =>
                onChange("frequency", e.target.value)
              }
            />
          </div>

          <div>
            <Label>Duration</Label>
            <Input
              value={medicine.duration}
              placeholder="5 Days"
              onChange={(e) =>
                onChange("duration", e.target.value)
              }
            />
          </div>

        </div>

        <div>
          <Label>Medicine Notes</Label>
          <Textarea
            rows={3}
            placeholder="After food..."
            value={medicine.note}
            onChange={(e) =>
              onChange("note", e.target.value)
            }
          />
        </div>
      </CardContent>
    </Card>
  );
}

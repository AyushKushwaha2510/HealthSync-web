"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Pill, Plus, Trash2, NotebookPen, FileCheck, Stethoscope } from "lucide-react";

import { usePrescriptionForm } from "../hooks/usePrescriptionForm";
import { MedicineCard } from "./MedicineCard";
import { PrescriptionNotes } from "./PrescriptionNotes";

export default function PrescriptionForm() {
  const {
    form,
    addMedicine,
    removeMedicine,
    updateMedicine,

    addNote,
    updateNote,
    removeNote,
  } = usePrescriptionForm();

  return (
    <div className="mx-auto max-w-6xl space-y-8">

      {/* Header */}

      <Card className="rounded-2xl border-blue-200 dark:border-blue-900">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 dark:bg-blue-900/40">
              <Stethoscope className="h-7 w-7 text-blue-600" />
            </div>

            <div>
              <CardTitle>Create Prescription</CardTitle>

              <CardDescription>
                Add medicines and doctor notes for this appointment.
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Medicines */}

      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-blue-600" />
              <CardTitle>Medicines</CardTitle>
            </div>

            <Button onClick={addMedicine}>
              <Plus className="mr-2 h-4 w-4" />
              Add Medicine
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {form.medicines?.length === 0 && (
            <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
              No medicines added yet.
            </div>
          )}

          {form.medicines?.map((medicine, index) => (
            <MedicineCard
              key={index}
              index={index}
              medicine={medicine}
              onRemove={() => removeMedicine(index)}
              onChange={(field, value) =>
                updateMedicine(index, field, value)
              }
            />
          ))}
        </CardContent>
      </Card>

      {/* General Notes */}

      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <NotebookPen className="h-5 w-5 text-blue-600" />
              <CardTitle>General Prescription Notes</CardTitle>
            </div>

            <Button variant="outline" onClick={addNote}>
              <Plus className="mr-2 h-4 w-4" />
              Add Note
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <CardContent className="space-y-4">
            {(form.notes ?? []).map((note, index) => (
              <PrescriptionNotes
                key={index}
                index={index}
                note={note}
                onRemove={() => removeNote(index)}
                onChange={(value) => updateNote(index, value)}
              />
            ))}
          </CardContent>
        </CardContent>
      </Card>

      {/* Footer */}

      <div className="flex justify-end gap-4">
        <Button variant="outline">
          Cancel
        </Button>

        <Button>
          <FileCheck className="mr-2 h-4 w-4" />
          Save Prescription
        </Button>
      </div>

    </div>
  );
}


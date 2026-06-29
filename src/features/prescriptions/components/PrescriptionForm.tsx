"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Pill, Plus, NotebookPen, FileCheck, Stethoscope, ShieldPlus } from "lucide-react";

import { usePrescriptionForm } from "../hooks/usePrescriptionForm";
import { MedicineCard } from "./MedicineCard";
import { PrescriptionNotes } from "./PrescriptionNotes";
import { Symptoms } from "./Symptoms";
import { Diseases } from "./Diseases";
import { useEffect } from "react";

export default function PrescriptionForm({ appointmentId }: { appointmentId: string }) {

  const {
    form,
    setForm,

    handleSubmit,
    loading,

    addSymptom,
    updateSymptom,
    removeSymptom,

    addDisease,
    updateDisease,
    removeDisease,

    addMedicine,
    removeMedicine,
    updateMedicine,

    addNote,
    updateNote,
    removeNote,
  } = usePrescriptionForm();

  useEffect(() => {
    setForm(prev => ({
      ...prev,
      appointmentId,
    }));
  }, [appointmentId]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-6xl space-y-8">

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

      {/* Symptoms */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Stethoscope className="h-5 w-5 text-blue-600" />
              <CardTitle>Symptoms</CardTitle>
            </div>

            <Button
              type="button"
              onClick={addSymptom}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Symptom
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {form.symptoms?.length === 0 && (
            <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
              No Symptoms added yet.
            </div>
          )}

          {form.symptoms?.map((symptom, index) => (
            <Symptoms
              key={index}
              index={index}
              symptom={symptom}
              onRemove={() => removeSymptom(index)}
              onChange={(value) => updateSymptom(index, value)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Diseases */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldPlus className="h-5 w-5 text-blue-600" />
              <CardTitle>Diseases</CardTitle>
            </div>

            <Button
              type="button"
              onClick={addDisease}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Disease
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {form.diseases?.length === 0 && (
            <div className="rounded-xl border border-dashed p-10 text-center text-muted-foreground">
              No Disease added yet.
            </div>
          )}

          {form.diseases?.map((disease, index) => (
            <Diseases
              key={index}
              index={index}
              disease={disease}
              onRemove={() => removeDisease(index)}
              onChange={(value) => updateDisease(index, value)}
            />
          ))}
        </CardContent>
      </Card>

      {/* Medicines */}
      <Card className="rounded-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pill className="h-5 w-5 text-blue-600" />
              <CardTitle>Medicines</CardTitle>
            </div>

            <Button
              type="button"
              onClick={addMedicine}
            >
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
              onRemove={() => {
                console.log("deleted btn clicked")
                removeMedicine(index)
              }}
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

            <Button
              type="button"
              variant="outline"
              onClick={addNote}
            >
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
        <Button
          type="button"
          variant="outline"
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={loading}
        >
          <FileCheck className="mr-2 h-4 w-4" />
          Save Prescription
        </Button>
      </div>

    </form>
  );
}


import { useState } from "react";
import { AddPrescription } from "../types/prescription.type";

export function usePrescriptionForm() {

  const [form, setForm] = useState<AddPrescription>({
    appointmentId: "",
    medicines: [],
    notes: [],
  });

  const handleChange = (updates: Partial<AddPrescription>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const addMedicine = () => {
    setForm((prev) => ({
      ...prev,
      medicines: [
        ...(prev.medicines ?? []),
        { name: "", dosage: "", frequency: "", duration: "", note: "" },
      ],
    }));
  };

  const updateMedicine = (index: number, field: string, value: string) => {
    setForm((prev) => {
      const updated = [...(prev.medicines ?? [])];
      updated[index] = { ...updated[index], [field]: value };

      return { ...prev, medicines: updated };
    });
  };

  const removeMedicine = (index: number) => {
    setForm((prev) => ({
      ...prev,
      medicines: prev.medicines?.filter((_, i) => i !== index),
    }));
  };

  const addNote = () => {
    setForm(prev => ({
      ...prev,
      notes: [
        ...(prev.notes ?? []),
        ""
      ]
    }))
  }

  const updateNote = (index: number, value: string) => {
    setForm((prev) => {
      const updated = [...(prev.notes ?? [])];
      updated[index] = value;

      return {
        ...prev,
        notes: updated,
      };
    });
  };

  const removeNote = (index: number) => {
    setForm((prev) => ({
      ...prev,
      notes: (prev.notes ?? []).filter((_, i) => i !== index),
    }));
  };

  return {
    form,
    setForm,
    handleChange,
    addMedicine,
    updateMedicine,
    removeMedicine,
    addNote,
    updateNote,
    removeNote
  };
}
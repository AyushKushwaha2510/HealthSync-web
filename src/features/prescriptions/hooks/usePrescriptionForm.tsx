import { useState, SyntheticEvent } from "react";
import { AddPrescription } from "../types/prescription.type";
import { useAddPrescription } from "./useAddPrescription";

export function usePrescriptionForm() {
  const { addPrescription, loading } = useAddPrescription();

  const [form, setForm] = useState<AddPrescription>({
    appointmentId: "",
    symptoms: [],
    diseases: [],
    medicines: [],
    notes: [],
  });

  const handleChange = (updates: Partial<AddPrescription>) => {
    setForm((prev) => ({ ...prev, ...updates }));
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addPrescription(form);
  };

  const addSymptom = () => {
    setForm((prev) => ({
      ...prev,
      symptoms: [
        ...(prev.symptoms ?? []),
        ""
      ]
    }))
  }

  const updateSymptom = (index: number, value: string) => {
    setForm((prev) => {
      const updated = [...(prev.symptoms ?? [])];
      updated[index] = value;

      return {
        ...prev,
        symptoms: updated,
      };
    });
  }

  const removeSymptom = (index: number) => {
    setForm((prev) => ({
      ...prev,
      symptoms: (prev.symptoms ?? []).filter((_, i) => i !== index)
    }))
  }

  const addDisease = () => {
    setForm((prev) => ({
      ...prev,
      diseases: [
        ...(prev.diseases ?? []),
        ""
      ]
    }))
  }

  const updateDisease = (index: number, value: string) => {
    setForm((prev) => {
      const updated = [...(prev.diseases ?? [])];
      updated[index] = value;

      return {
        ...prev,
        diseases: updated,
      };
    });
  }

  const removeDisease = (index: number) => {
    setForm((prev) => ({
      ...prev,
      diseases: (prev.diseases ?? []).filter((_, i) => i !== index)
    }))
  }

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

    loading,
    handleSubmit,
    handleChange,

    addSymptom,
    updateSymptom,
    removeSymptom,

    addDisease,
    updateDisease,
    removeDisease,

    addMedicine,
    updateMedicine,
    removeMedicine,

    addNote,
    updateNote,
    removeNote
  };
}
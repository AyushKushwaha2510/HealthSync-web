'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Ban,
  ClipboardPlus,
  Pencil,
  Printer,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export default function PrescriptionActions({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const router = useRouter();

  const handleCancel = async () => {
    // TODO:
    // Open confirmation dialog
    // Call cancel appointment API
    console.log("Cancel", appointmentId);
  };

  const handleDelete = async () => {
    // TODO:
    // Open confirmation dialog
    // Call delete API
    console.log("Delete", appointmentId);
  };

  return (
    <div className="flex flex-wrap justify-end gap-3">
      <Button asChild>
        <Link href={`/prescriptions/create?appointmentId=${appointmentId}`}>
          <ClipboardPlus className="mr-2 h-4 w-4" />
          Add Prescription
        </Link>
      </Button>

      <Button variant="outline" asChild>
        <Link href={`/appointments/${appointmentId}/edit`}>
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Link>
      </Button>

      <Button variant="outline">
        <Printer className="mr-2 h-4 w-4" />
        Print
      </Button>

      <Button
        variant="secondary"
        onClick={handleCancel}
      >
        <Ban className="mr-2 h-4 w-4" />
        Cancel
      </Button>

      <Button
        variant="destructive"
        onClick={handleDelete}
      >
        <Trash2 className="mr-2 h-4 w-4" />
        Delete
      </Button>
    </div>
  );
}
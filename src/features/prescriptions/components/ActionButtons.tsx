'use client'

import Link from "next/link";

import {
  Ban,
  ClipboardPlus,
  Pencil,
  Printer,
  Trash2,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button";
import PrescriptionHistory from "./PrescriptionHistory";
import { Prescription } from "../types/prescription.type";
import { useAllPrescription } from "../hooks/useAllPrescription";
import { useEffect } from "react";

export default function PrescriptionActions({
  appointmentId,
  doctorId,
  patientId,
}: {
  appointmentId: string;
  doctorId: string,
  patientId: string,
}) {

  const { fetchAllPrescription, prescriptions, loading } = useAllPrescription();

  useEffect(() => {
    fetchAllPrescription(doctorId, patientId)
  }, [doctorId, patientId])

  const history = (prescriptions ?? []).filter(
    (p): p is Prescription => p !== undefined
  );

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
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">History</Button>
        </DropdownMenuTrigger>

        {loading ? "Loading..."
          : <PrescriptionHistory
            history={history}
          />
        }
      </DropdownMenu>

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
'use client';

import { useEffect, useState } from 'react';
import { useAllPrescription } from '../../hooks/useAllPrescription';
import { Button } from '@/components/ui/button';
import { formatDate, formatTime } from '@/helpers/date-time';
import { downloadPrescriptionApi } from '../../api/prescription.api';
import { useRouter } from 'next/navigation';

export default function AllPrescription() {
  const { fetchAllPrescription, prescriptions, loading } =
    useAllPrescription();

  useEffect(() => {
    fetchAllPrescription();
  }, []);

  const [selectedPrescriptionId, setSelectedPrescriptionId] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        Loading prescriptions...
      </div>
    );
  }
  if (!prescriptions) {
    return <p>No Prescriptions Available</p>
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-2xl font-bold">Prescription History</h1>

      {prescriptions.length === 0 ? (
        <div className="rounded-lg border p-8 text-center text-muted-foreground">
          No prescriptions found.
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border flex flex-row gap-5">
          <table className="w-full">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">Doctor</th>
                <th className="px-4 py-3 text-left">Specialization</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">Time</th>
                <th className="px-4 py-3 text-center">Action</th>
                <th className="px-4 py-3 text-center">Analyze with AI</th>
              </tr>
            </thead>

            <tbody>
              {prescriptions?.map((prescription, index) => (
                <tr
                  key={prescription?.id}
                  className="border-b last:border-0 hover:bg-muted/30"
                >
                  <td className="px-4 py-4">{index + 1}</td>

                  <td className="px-4 py-4">
                    Dr. {prescription?.appointment.doctor?.user.firstName}{' '}
                    {prescription?.appointment.doctor?.user.lastName}
                  </td>

                  <td className="px-4 py-4">
                    {prescription?.appointment.doctor?.specialization}
                  </td>

                  <td className="px-4 py-4">
                    {formatDate(prescription?.appointment.date ?? "")}
                  </td>

                  <td className="px-4 py-4">
                    {formatTime(prescription?.appointment.startTime ?? "")}
                  </td>

                  <td className="px-4 py-4 text-center">
                    <Button
                      size="sm"
                      onClick={() => {
                        const apptId = prescription?.appointment?.id;
                        if (apptId) downloadPrescriptionApi(apptId);
                      }}
                    >
                      View Prescription
                    </Button>
                  </td>

                  <td className="px-4 py-4 text-center">
                    <Button
                      size="sm"
                      onClick={() => {
                        if (prescription?.id) {
                          setSelectedPrescriptionId(prescription.id);
                          router.push(`/chatbot?prescId=${prescription.id}`)
                          setOpen(true);
                        }
                      }}
                    >
                      Analyze
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div hidden={!open}>
            <div className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <h3>
                <p>AI Prescription Analysis</p>
              </h3>

              {selectedPrescriptionId && (
                <>
                  {/* <AnalyzePrescription
                    prescriptionId={selectedPrescriptionId}
                  /> */}
                  {/* <ChatBot
                    prescriptionId={selectedPrescriptionId}
                  /> */}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
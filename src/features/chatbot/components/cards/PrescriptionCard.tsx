import { PrescriptionAnalysis } from "@/features/prescriptions/types/prescription.type";
import {
  AlertTriangle,
  ClipboardList,
  HeartPulse,
  Pill,
  TriangleAlert,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PrescriptionCardProps {
  analysis: PrescriptionAnalysis;
}

export function PrescriptionCard({
  analysis,
}: PrescriptionCardProps) {
  // return (
  //   <div className="space-y-5">
  //     {/* Header */}
  //     <div className="flex items-center gap-3">
  //       <div className="rounded-xl bg-blue-100 p-2">
  //         <Pill className="h-5 w-5 text-blue-600" />
  //       </div>

  //       <div>
  //         <h3 className="font-semibold">
  //           Prescription Analysis
  //         </h3>

  //         <p className="text-sm text-muted-foreground">
  //           Medicines detected
  //         </p>
  //       </div>
  //     </div>

  //     {/* Medicines */}
  //     <div className="space-y-3">
  //       {prescription.medicines.map((medicine) => (
  //         <div
  //           key={medicine.name}
  //           className="rounded-xl border p-3"
  //         >
  //           <div className="font-medium">
  //             {medicine.name}
  //           </div>

  //           <div className="mt-1 text-sm text-muted-foreground">
  //             {medicine.dosage}
  //           </div>

  //           {/* <div className="text-sm text-muted-foreground">
  //             {medicine.frequency}
  //           </div> */}
  //         </div>
  //       ))}
  //     </div>

  //     {/* Warnings */}
  //     {prescription.warnings.length > 0 && (
  //       <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
  //         <div className="mb-3 flex items-center gap-2 font-medium text-amber-700">
  //           <TriangleAlert className="h-5 w-5" />
  //           Warnings
  //         </div>

  //         <ul className="space-y-2 text-sm text-amber-700">
  //           {prescription.warnings.map((warning) => (
  //             <li key={warning}>• {warning}</li>
  //           ))}
  //         </ul>
  //       </div>
  //     )}
  //   </div>
  // );
  console.log("analysis ", analysis)
  return (
    <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">

      {/* Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Summary
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="leading-7 text-muted-foreground">
            {analysis.summary}
          </p>
        </CardContent>
      </Card>

      {/* Medicines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Pill className="h-5 w-5" />
            Medicines
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-5">
          {analysis.medicines.map((medicine: any, index: number) => (
            <div
              key={index}
              className="rounded-lg border p-4 space-y-3"
            >
              <h3 className="font-semibold text-lg">
                {medicine.name}
              </h3>

              <p>
                <strong>Purpose:</strong> {medicine.purpose}
              </p>

              {medicine.dosage && (
                <p>
                  <strong>Dosage:</strong> {medicine.dosage}
                </p>
              )}

              <div>
                <strong>Precautions</strong>

                <ul className="list-disc ml-6 mt-2">
                  {medicine.precautions.map(
                    (item: string, i: number) => (
                      <li key={i}>{item}</li>
                    )
                  )}
                </ul>
              </div>

              <div>
                <strong>Common Side Effects</strong>

                <ul className="list-disc ml-6 mt-2">
                  {medicine.side_effects.map(
                    (item: string, i: number) => (
                      <li key={i}>{item}</li>
                    )
                  )}
                </ul>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Warnings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-600">
            <AlertTriangle className="h-5 w-5" />
            Warnings
          </CardTitle>
        </CardHeader>

        <CardContent>
          {analysis.warnings.length === 0 ? (
            <p className="text-muted-foreground">
              No significant warnings.
            </p>
          ) : (
            <ul className="list-disc ml-6 space-y-2">
              {analysis.warnings.map(
                (warning: string, index: number) => (
                  <li key={index}>{warning}</li>
                )
              )}
            </ul>
          )}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-600">
            <HeartPulse className="h-5 w-5" />
            Recommendations
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ul className="list-disc ml-6 space-y-2">
            {analysis.recommendations.map(
              (item: string, index: number) => (
                <li key={index}>{item}</li>
              )
            )}
          </ul>
        </CardContent>
      </Card>

    </div>
  );
}
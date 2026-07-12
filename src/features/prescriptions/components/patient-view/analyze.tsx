// "use client";

// import { useEffect } from "react";
// import { useAnalyzePrescription } from "../../hooks/useAnalyzePrescription";
// import Loading from "@/components/Loading";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { AlertTriangle, Pill, ClipboardList, HeartPulse } from "lucide-react";

// export default function AnalyzePrescription({
//   prescriptionId,
// }: {
//   prescriptionId: string;
// }) {
//   const { analyzePrescription, analysis, loading } =
//     useAnalyzePrescription();

//   useEffect(() => {
//     analyzePrescription(prescriptionId);
//   }, [prescriptionId]);

//   if (loading) {
//     return <Loading message="Analyzing prescription..." />;
//   }

//   if (!analysis) {
//     return (
//       <div className="py-10 text-center text-muted-foreground">
//         No analysis available.
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-2">

//       {/* Summary */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <ClipboardList className="h-5 w-5" />
//             Summary
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <p className="leading-7 text-muted-foreground">
//             {analysis.summary}
//           </p>
//         </CardContent>
//       </Card>

//       {/* Medicines */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <Pill className="h-5 w-5" />
//             Medicines
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-5">
//           {analysis.medicines.map((medicine: any, index: number) => (
//             <div
//               key={index}
//               className="rounded-lg border p-4 space-y-3"
//             >
//               <h3 className="font-semibold text-lg">
//                 {medicine.name}
//               </h3>

//               <p>
//                 <strong>Purpose:</strong> {medicine.purpose}
//               </p>

//               {medicine.dosage && (
//                 <p>
//                   <strong>Dosage:</strong> {medicine.dosage}
//                 </p>
//               )}

//               <div>
//                 <strong>Precautions</strong>

//                 <ul className="list-disc ml-6 mt-2">
//                   {medicine.precautions.map(
//                     (item: string, i: number) => (
//                       <li key={i}>{item}</li>
//                     )
//                   )}
//                 </ul>
//               </div>

//               <div>
//                 <strong>Common Side Effects</strong>

//                 <ul className="list-disc ml-6 mt-2">
//                   {medicine.side_effects.map(
//                     (item: string, i: number) => (
//                       <li key={i}>{item}</li>
//                     )
//                   )}
//                 </ul>
//               </div>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Warnings */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-red-600">
//             <AlertTriangle className="h-5 w-5" />
//             Warnings
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           {analysis.warnings.length === 0 ? (
//             <p className="text-muted-foreground">
//               No significant warnings.
//             </p>
//           ) : (
//             <ul className="list-disc ml-6 space-y-2">
//               {analysis.warnings.map(
//                 (warning: string, index: number) => (
//                   <li key={index}>{warning}</li>
//                 )
//               )}
//             </ul>
//           )}
//         </CardContent>
//       </Card>

//       {/* Recommendations */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-green-600">
//             <HeartPulse className="h-5 w-5" />
//             Recommendations
//           </CardTitle>
//         </CardHeader>

//         <CardContent>
//           <ul className="list-disc ml-6 space-y-2">
//             {analysis.recommendations.map(
//               (item: string, index: number) => (
//                 <li key={index}>{item}</li>
//               )
//             )}
//           </ul>
//         </CardContent>
//       </Card>

//     </div>
//   );
// }
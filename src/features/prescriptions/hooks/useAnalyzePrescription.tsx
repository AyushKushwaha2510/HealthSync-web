// import { useState } from "react"
// import { analyzePrescriptionApi } from "../api/prescription.api";
// import { PrescriptionAnalysis } from "../types/prescription.type";

// export const useAnalyzePrescription = () => {
//   const [loading, setLoading] = useState<boolean>(false);
//   const [analysis, setAnalysis] = useState<PrescriptionAnalysis>()

//   const analyzePrescription = async (prescriptionId: string) => {

//     try {
//       setLoading(true);

//       const res = await analyzePrescriptionApi(prescriptionId);

//       setAnalysis(res)

//     }
//     catch (error: any) {
//       console.error("error", error.response.data.message)
//     }
//     finally {
//       setLoading(false);
//     }
//   }

//   return { analyzePrescription, analysis, loading }
// }
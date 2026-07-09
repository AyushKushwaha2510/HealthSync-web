import { AnalysisBlock } from "../../types/chat.type";

import { LabReportCard } from "../cards/LabReportCard";
import { PrescriptionCard } from "../cards/PrescriptionCard";

interface AnalysisRendererProps {
  block: AnalysisBlock;
}

export function AnalysisRenderer({
  block,
}: AnalysisRendererProps) {
  switch (block.analysisType) {
    // case "lab-report":
    //   return <LabReportCard report={block.result} />;

    case "prescription":
      return (
        <PrescriptionCard
          prescription={block.result}
        />
      );

    default:
      return null;
  }
}
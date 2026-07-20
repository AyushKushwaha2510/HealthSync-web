import { AnalysisBlock } from "../../types/chat.type";
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
          analysis={block.result}
        />
      );

    default:
      return null;
  }
}
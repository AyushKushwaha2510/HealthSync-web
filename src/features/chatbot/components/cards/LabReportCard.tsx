import { Activity, ArrowDown, ArrowUp, CheckCircle2 } from "lucide-react";

interface Test {
  name: string;
  value: string;
  unit?: string;
  status: "normal" | "high" | "low";
}

interface LabReportAnalysis {
  summary: string;
  tests: Test[];
}

interface LabReportCardProps {
  report: LabReportAnalysis;
}

export function LabReportCard({
  report,
}: LabReportCardProps) {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="rounded-xl bg-emerald-100 p-2">
          <Activity className="h-5 w-5 text-emerald-600" />
        </div>

        <div>
          <h3 className="font-semibold">
            Lab Report Analysis
          </h3>

          <p className="text-sm text-muted-foreground">
            AI Summary
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-xl bg-muted p-4 text-sm">
        {report.summary}
      </div>

      {/* Values */}
      <div className="space-y-3">
        {report.tests.map((test) => (
          <div
            key={test.name}
            className="flex items-center justify-between rounded-xl border p-3"
          >
            <div>
              <p className="font-medium">
                {test.name}
              </p>

              <p className="text-sm text-muted-foreground">
                {test.value} {test.unit}
              </p>
            </div>

            {test.status === "normal" && (
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            )}

            {test.status === "high" && (
              <ArrowUp className="h-5 w-5 text-red-500" />
            )}

            {test.status === "low" && (
              <ArrowDown className="h-5 w-5 text-amber-500" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
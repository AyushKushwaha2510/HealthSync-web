import { FileText } from "lucide-react";
import { AttachmentBlock } from "../../types/chat.type";

interface AttachmentRendererProps {
  block: AttachmentBlock;
}

export function AttachmentRenderer({ block }: AttachmentRendererProps) {
  return (
    <div className="flex items-center gap-3 rounded-xl border bg-background p-3">
      <FileText className="h-5 w-5 text-primary" />

      <div>
        <p className="font-medium">{block.file.name}</p>
      </div>
    </div>
  );
}
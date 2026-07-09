import { ChatBlockType, ChatBlock } from "../types/chat.type";

import { TextRenderer } from "./renderers/TextRenderer";
import { AttachmentRenderer } from "./renderers/AttachmentRenderer";
import { AnalysisRenderer } from "./renderers/AnalysisRenderer";

interface MessageRendererProps {
  block: ChatBlock;
}

export function MessageRenderer({ block }: MessageRendererProps) {
  switch (block.type) {
    case ChatBlockType.TEXT:
      return <TextRenderer block={block} />;

    case ChatBlockType.ATTACHMENT:
      return <AttachmentRenderer block={block} />;

    case ChatBlockType.ANALYSIS:
      return <AnalysisRenderer block={block} />;

    default:
      return null;
  }
}
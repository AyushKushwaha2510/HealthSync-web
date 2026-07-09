import { TextBlock } from "../../types/chat.type";

interface TextRendererProps {
  block: TextBlock;
}

export function TextRenderer({ block }: TextRendererProps) {
  return (
    <p className="whitespace-pre-wrap break-words text-sm leading-7">
      {block.content}
    </p>
  );
}
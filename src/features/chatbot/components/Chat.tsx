import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

import { ChatMessage } from "../types/chat.type";

interface ChatProps {
  title: string;

  subtitle?: string;

  messages: ChatMessage[];

  onSend: (text: string) => void;

  onUpload?: (file: File) => void;
}

export function Chat({
  title,
  subtitle,
  messages,
  onSend,
  onUpload,
}: ChatProps) {
  return (
    <div className="flex h-full flex-col rounded-2xl border bg-background">
      <ChatHeader
        title={title}
        subtitle={subtitle}
      />

      <ChatMessages
        messages={messages}
      />

      <ChatInput
        onSend={onSend}
        onUpload={onUpload}
      />
    </div>
  );
}
import { ChatHeader } from "./ChatHeader";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";

import { ChatMessage } from "../types/chat.type";
import ErrorMessage from "@/components/ErrorMessage";

interface ChatProps {
  title: string;
  subtitle?: string;
  messages: ChatMessage[];
  onSend: (text: string) => void;
  onUpload?: (file: File) => void;
  thinking: boolean;
  error: string | null
}

export function Chat({
  title,
  subtitle,
  messages,
  onSend,
  onUpload,
  thinking,
  error
}: ChatProps) {
  return (
    <div className="flex h-[calc(100vh-70px)] mb-5 justify-baseline max-w-3xl mx-auto flex-col rounded-2xl border bg-background">
      <ChatHeader
        title={title}
        subtitle={subtitle}
      />

      <ChatMessages
        messages={messages}
        thinking={thinking}
        error={error}
      />

      <ChatInput
        onSend={onSend}
        onUpload={onUpload}
      />
    </div>
  );
}
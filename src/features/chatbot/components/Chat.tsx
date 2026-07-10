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
    <div className="flex h-full flex-col rounded-2xl border bg-background">
      <ChatHeader
        title={title}
        subtitle={subtitle}
      />

      {thinking && <p>Thinking ...</p>}
      {error && <ErrorMessage message={error}/>}

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
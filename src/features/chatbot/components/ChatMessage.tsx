import { Bubble, BubbleContent } from "@/components/ui/bubble";
import {
  Message,
  MessageAvatar,
  MessageContent,
} from "@/components/ui/message";

import { cn } from "@/lib/utils";
import { ChatMessage as ChatMessageType } from "../types/chat.type";
import { MessageRenderer } from "./MessageRenderer";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({
  message,
}: ChatMessageProps) {

  return (
    <Message className={cn(message.role === "user" && "flex-row-reverse")}>
      {/* {message.role === "assistant" && (
        <MessageAvatar
          src="/logo.png"
          fallback="AI"
        />
      )} */}

      <MessageContent className="max-w-[90%] lg:max-w-[75%]">
        <Bubble
          className={cn(
            "rounded-3xl border",
            message.role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-background"
          )}
        >
          <BubbleContent>
            <MessageRenderer block={message.block} />
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  );
}
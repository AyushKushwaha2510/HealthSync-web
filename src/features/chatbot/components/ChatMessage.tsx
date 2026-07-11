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
    <Message
      className={cn(
        "w-full",
        message.role === "user" ? "justify-end" : "justify-start"
      )}
    >
      {/* {message.role === "assistant" && (
        <MessageAvatar
          src="/logo.png"
          fallback="AI"
        />
      )} */}

      <MessageContent
        className={cn(
          "max-w-[90%] lg:max-w-[75%]",
          message.role === "user" && "items-end text-right"
        )}
      >
        <Bubble
          className={cn(
            "rounded-3xl border",
            message.role === "user"
              ? "bg-primary text-primary-foreground"
              : "bg-background"
          )}
        >
          <BubbleContent
            className={cn(
              message.role === "user" && "text-right",
            )}
          >
            <MessageRenderer block={message.block} />
          </BubbleContent>
        </Bubble>
      </MessageContent>
    </Message>
  );
}
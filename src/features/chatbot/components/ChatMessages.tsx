import {
  MessageScroller,
  MessageScrollerContent,
  MessageScrollerButton,
  MessageScrollerItem,
  MessageScrollerProvider,
  MessageScrollerViewport,
} from "@/components/ui/message-scroller";

import { ChatMessage as ChatMessageType } from "../types/chat.type";
import { ChatMessage } from "./ChatMessage";
import ErrorMessage from "@/components/ErrorMessage";
import { ThinkingBubble } from "./Thinking";

interface ChatMessagesProps {
  messages: ChatMessageType[];
  thinking: boolean;
  error: string | null;
}

export function ChatMessages({
  messages,
  thinking,
  error
}: ChatMessagesProps) {
  return (
    <MessageScrollerProvider autoScroll>
      <MessageScroller className="flex-1">
        <MessageScrollerViewport>
          <MessageScrollerContent className="space-y-4 p-4">
            {messages.map((message) => (
              <MessageScrollerItem
                key={message.id}
                messageId={message.id}
                scrollAnchor={message.role === "user"}
              >
                <ChatMessage message={message} />

              </MessageScrollerItem>
            ))}

            {/* Thinking and Error State */}
            {thinking && <ThinkingBubble />}
            {error && <ErrorMessage message={error} />}
          </MessageScrollerContent>
        </MessageScrollerViewport>

        <MessageScrollerButton />
      </MessageScroller>
    </MessageScrollerProvider>
  );
}

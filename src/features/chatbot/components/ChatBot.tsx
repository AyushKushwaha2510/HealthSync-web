"use client";

import { Chat } from "./Chat";
import { useChatBot } from "../hooks/useChatBot";
import { useEffect } from "react";

interface ChatBotProps {
  prescriptionId?: string;
}

export default function ChatBot({
  prescriptionId
}: ChatBotProps
) {

  const {
    messages,
    setMessages,
    thinking,
    error,
    handleSend,
    handleUpload,
    analyzePrescription
  } = useChatBot();

  // if this chat has opened from a presciption then start analysis
  if (prescriptionId) {
    useEffect(() => {
      analyzePrescription(prescriptionId)
    }, [prescriptionId])
  }

  return (
    <div className="h-screen p-6">
      <Chat
        title="Health AI"
        subtitle="Ask anything or upload a medical document."
        thinking={thinking}
        error={error}
        messages={messages}
        onSend={handleSend}
        onUpload={handleUpload}
      />
    </div>
  );
}
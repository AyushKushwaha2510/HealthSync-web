import { useState } from "react"
import { ChatBlockType, ChatMessage } from "../types/chat.type"
import api from "@/lib/axios";
import { analyzePrescriptionApi } from "@/features/prescriptions/api/prescription.api";

export const useChatBot = () => {

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      block: {
        type: ChatBlockType.TEXT,
        content: "Hi! Upload a prescription or lab report, or ask me anything."
      }
    }
  ]);

  /* Now thinking has bool state but, in future i will make this dynamic-state */
  const [thinking, setThinking] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // function to call backend for initial analsyis of prescId
  const analyzePrescription = async (prescId: string) => {
    setThinking(true);

    // Call the API
    const res = await analyzePrescriptionApi(prescId);

    if (!res) {
      setError('Unable to Analyze, Please Try Again')
    }

    setThinking(false);

    // add this response the messages
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: 'assistant',
        block: {
          type: ChatBlockType.ANALYSIS,
          analysisType: 'prescription',
          result: res
        }
      }
    ])
  }

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        block: {
          type: ChatBlockType.TEXT,
          content: text,
        },
      },
    ]);

    // Later:
    // Call backend
    // Stream assistant response
  };

  const handleUpload = (file: File) => {
    setMessages((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        role: "user",
        block: {
          type: ChatBlockType.ATTACHMENT,
          file: {
            name: file.name,
            url: URL.createObjectURL(file),
            mimeType: file.type || "application/octet-stream",
          },
        },
      },
    ]);

    // Later:
    // Upload to backend
    // Receive analysis
  };

  return {
    messages,
    setMessages,
    thinking,
    error,
    analyzePrescription,
    handleSend,
    handleUpload,
  }
}
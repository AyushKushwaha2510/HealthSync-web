import { useState } from "react"
import { ChatBlockType, ChatMessage } from "../types/chat.type"
import { analyzePrescriptionApi } from "@/features/prescriptions/api/prescription.api";
import { sendMessageApi } from "../api/chatbot.api";

export const useChatBot = () => {

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome', // randomUUID() was causing hydration issue
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
    setError(null)
    setThinking(true);

    try {
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
      ]);

    } catch (error: any) {
      setError(error.response.data.message);

    } finally {
      setThinking(false);
    }
  }

  const handleSend = async (text: string) => {
    setError(null)
    setThinking(true)

    try {
      // add message
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

      // send message
      const req = {
        id: crypto.randomUUID(),
        message: text
      }

      const res = await sendMessageApi(req);

      // add to assistant message
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          block: {
            type: ChatBlockType.TEXT,
            content: res,
          },
        },
      ]);

    } catch (error: any) {
      setError(error.response.data.message)

    } finally {
      setThinking(false);
    }

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
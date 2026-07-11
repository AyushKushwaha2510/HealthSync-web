'use client'

import ChatBot from "@/features/chatbot/components/ChatBot";
import { useSearchParams } from "next/navigation";

export default function Page() {

  const searchParams = useSearchParams();
  const prescriptionId = searchParams.get("prescId");

  return (
    <div className="mt-10">
      <ChatBot
         {...(prescriptionId && { prescriptionId })}
      />
    </div>
  )
}
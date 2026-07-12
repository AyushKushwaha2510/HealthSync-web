import ChatBot from "@/features/chatbot/components/ChatBot";

interface PageProps {
  searchParams: Promise<{
    prescId?: string;
  }>;
}
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const prescriptionId = params.prescId;

  return (
    <div className="mt-10">
      <ChatBot
        {...(prescriptionId && { prescriptionId })}
      />
    </div>
  )
}
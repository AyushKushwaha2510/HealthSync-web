import { useState } from "react";
import { Paperclip, Send } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  onSend: (message: string) => void;
  onUpload?: (file: File) => void;
}

export function ChatInput({
  onSend,
  onUpload,
}: ChatInputProps) {
  const [value, setValue] = useState("");

  const send = () => {
    if (!value.trim()) return;

    onSend(value);

    setValue("");
  };

  return (
    <div className="border-t bg-background p-4">
      <div className="flex items-center gap-3">
        <input
          hidden
          id="chat-file"
          type="file"
          onChange={(e) => {
            const file = e.target.files?.[0];

            if (file && onUpload) {
              onUpload(file);
            }
          }}
        />

        <Button
          variant="ghost"
          size="icon"
          asChild
        >
          <label htmlFor="chat-file">
            <Paperclip className="h-5 w-5" />
          </label>
        </Button>

        <Input
          placeholder="Ask anything..."
          value={value}
          onChange={(e) =>
            setValue(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              send();
            }
          }}
        />

        <Button onClick={send}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
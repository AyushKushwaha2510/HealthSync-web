import { Brain } from "lucide-react";

interface ThinkingBubbleProps {
  message?: string;
}

export function ThinkingBubble({
  message = "Analyzing",
}: ThinkingBubbleProps) {
  return (
    <div className="flex w-fit max-w-md items-center gap-4 rounded-3xl border bg-background px-4 py-3 shadow-sm">
      {/* AI Icon */}
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
        <Brain className="h-5 w-5 animate-pulse text-primary" />
      </div>

      {/* Content */}
      <div className="space-y-2">
        <p className="font-medium leading-none">Health AI</p>

        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">
            {message}
          </span>

          <div className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
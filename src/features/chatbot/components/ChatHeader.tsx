interface ChatHeaderProps {
  title: string;
  subtitle?: string;
}

export function ChatHeader({
  title,
  subtitle,
}: ChatHeaderProps) {
  return (
    <div className="border-b bg-background px-6 py-4">
      <h2 className="text-lg font-semibold">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      )}
    </div>
  );
}
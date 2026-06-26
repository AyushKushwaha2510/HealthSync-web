export default function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b pb-3 last:border-none">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <span className="font-medium text-right">
        {value || "-"}
      </span>
    </div>
  );
}
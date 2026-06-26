import { Badge } from "@/components/ui/badge";

export default function StatusBadge({
  status,
}: {
  status: string;
}) {
  switch (status) {
    case "confirmed":
      return (
        <Badge className="bg-green-600 hover:bg-green-600">
          Confirmed
        </Badge>
      );

    case "pending":
      return <Badge variant="secondary">Pending</Badge>;

    case "cancelled":
      return <Badge variant="destructive">Cancelled</Badge>;

    default:
      return <Badge>{status}</Badge>;
  }
}
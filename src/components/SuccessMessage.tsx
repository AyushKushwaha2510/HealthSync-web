export default function SuccessMessage(
  { message }:
    { message: string }
) {
  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
      {message}
    </div>
  )
}
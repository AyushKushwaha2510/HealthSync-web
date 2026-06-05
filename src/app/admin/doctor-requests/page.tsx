import Container from "@/components/Container";
import ShowPendingRequests from "@/features/doctor-requests/components/ShowPendingRequests";

export default function Page(){
  return(
    <Container>
      <div>
        Pending Requests
      </div>
      <ShowPendingRequests/>
    </Container>
  )
}
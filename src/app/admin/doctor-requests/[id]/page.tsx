import Container from "@/components/Container";
import DetailsOfRequest from "@/features/doctor-requests/components/DetailsOfRequest";

export default function Page(){
  return (
    <Container>
      <h2>
        Details of particular user
        <DetailsOfRequest/>
      </h2>
    </Container>
  )
}
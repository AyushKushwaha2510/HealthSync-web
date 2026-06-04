import Container from "@/components/Container";
import PatientDetails from "@/features/patient/components/PatientDetails";

export default function Dashboard(){
  return(
    <Container>
      <div>
        <PatientDetails/>
      </div>
    </Container>
  )
}
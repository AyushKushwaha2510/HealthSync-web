'use client'

import Container from "@/components/Container";
import DoctorDetails from "@/features/doctors/components/DoctorDetails";
import { useParams } from "next/navigation";

export default function Page() {

  const { id } = useParams<{ id: string }>();

  return (
    <Container>
      <DoctorDetails id={id} />
    </Container>
  )
}
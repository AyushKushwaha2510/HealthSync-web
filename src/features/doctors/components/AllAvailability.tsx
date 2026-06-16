import { DoctorAvailability } from "@/features/doctors-availability/types/doctor.type";
import { viewAvailabilityApi } from "../api/doctors.api";
import { table } from "console";

// for particular doctor
export default async function AllAvailability() {
  const availabilities: DoctorAvailability[] = await viewAvailabilityApi();

  return(
    <table>
      
    </table>
  )
}
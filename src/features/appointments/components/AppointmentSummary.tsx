'use client'

import { RootState } from "@/store/store"
import { useSelector } from "react-redux"

export default function AppointmentSummary(){
  const summary = useSelector((state:RootState)=> state.appointmentSummary.summary)
  console.log('appointmentSummary', summary)

  return (
  <div>
     <h1>Appointment Summary Component Loaded</h1>
    <pre>
      {JSON.stringify(summary, null, 2)}
    </pre>
  </div>
);
}
'use client'

import { Button } from "@/components/ui/button"
import { RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { setBookingInfo } from "../store/book-appointment.slice"
import { useEffect, useState } from "react"
import { useStartPayment } from "@/features/payments/hooks/useStartPayment"
import { handleBook } from "../services/handle-book.service"

export default function AppointmentSummary() {
  const summary = useSelector((state: RootState) => state.appointmentSummary.summary)
  const bookingInfo = useSelector((state: RootState) => state.bookAppointment.bookingInfo)

  const dispatch = useDispatch();

  useEffect(() => {
    if (bookingInfo) {
      localStorage.setItem(
        'bookingInfo',
        JSON.stringify(bookingInfo)
      );
    }
  }, [bookingInfo]);

  useEffect(() => {
    const saved = localStorage.getItem('bookingInfo');

    if (saved) {
      dispatch(setBookingInfo(JSON.parse(saved)));
    }
  }, [dispatch]);

  console.log('appointmentSummary', summary)

  const { startPayment, loading } = useStartPayment()

  return (
    <div>
      <h1>Appointment Summary Component Loaded</h1>
      <pre>
        {JSON.stringify(summary, null, 2)}
      </pre>

      <h3>
        Booking ka info
      </h3>
      <pre>
        {JSON.stringify(bookingInfo, null, 2)}
      </pre>


      <Button
        disabled={loading}
        onClick={() =>
          handleBook(
            bookingInfo,
            summary?.appointmentFee,
            startPayment
          )
        }
      >
        Pay & Continue
      </Button>
    </div>
  );
}
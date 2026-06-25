'use client'

import { Button } from "@/components/ui/button"
import { RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { setBookingInfo } from "../store/book-appointment.slice"
import { useEffect, useState } from "react"
import { useStartPayment } from "@/features/payments/hooks/useStartPayment"
import { handleBook } from "../services/handle-book.service"
import { setSummary } from "../store/appointment-summary.slice"

export default function AppointmentSummary() {
  const summary = useSelector((state: RootState) => state.appointmentSummary.summary)
  const bookingInfo = useSelector((state: RootState) => state.bookAppointment.bookingInfo)

  const dispatch = useDispatch();

  // save data in localstorage to avoid data-loss upon page-reload
  useEffect(() => {
    if (bookingInfo) {
      localStorage.setItem(
        'bookingInfo',
        JSON.stringify(bookingInfo)
      );
    }
  }, [bookingInfo]);

  useEffect(() => {
    if (summary) {
      localStorage.setItem(
        'summary',
        JSON.stringify(summary)
      );
    }
  }, [summary]);

  // fetch data from localstorage upon page-reload
  useEffect(() => {
    const savedInfo = localStorage.getItem('bookingInfo');
    const savedSummary = localStorage.getItem('summary');

    if (savedInfo) {
      dispatch(setBookingInfo(JSON.parse(savedInfo)));
    }
    if (savedSummary) {
      dispatch(setSummary(JSON.parse(savedSummary)));
    }
  }, []);


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
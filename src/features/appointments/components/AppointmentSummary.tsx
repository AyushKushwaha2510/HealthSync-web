'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Calendar,
  CalendarDays,
  Clock,
  IndianRupee,
  MapPin,
  User,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { RootState } from '@/store/store';
import { useStartPayment } from '@/features/payments/hooks/useStartPayment';

import { handleBook } from '../services/handle-book.service';
import { setBookingInfo } from '../store/book-appointment.slice';
import { setSummary } from '../store/appointment-summary.slice';

export default function AppointmentSummary() {
  const dispatch = useDispatch();

  const summary = useSelector(
    (state: RootState) => state.appointmentSummary.summary
  );

  const bookingInfo = useSelector(
    (state: RootState) => state.bookAppointment.bookingInfo
  );

  const { startPayment, loading } = useStartPayment();

  // save data in localstorage to avoid data-loss upon page-reload
  // Persist booking info
  useEffect(() => {
    if (bookingInfo) {
      localStorage.setItem('bookingInfo', JSON.stringify(bookingInfo));
    }
  }, [bookingInfo]);

  // Persist summary
  useEffect(() => {
    if (summary) {
      localStorage.setItem('summary', JSON.stringify(summary));
    }
  }, [summary]);

  // Restore on refresh
  // fetch data from localstorage upon page-reload
  useEffect(() => {
    const savedBookingInfo = localStorage.getItem('bookingInfo');
    const savedSummary = localStorage.getItem('summary');

    if (!bookingInfo && savedBookingInfo) {
      dispatch(setBookingInfo(JSON.parse(savedBookingInfo)));
    }

    if (!summary && savedSummary) {
      dispatch(setSummary(JSON.parse(savedSummary)));
    }
  }, [bookingInfo, summary, dispatch]);

  if (!summary) {
    return (
      <div className="sticky top-24 rounded-2xl border border-border bg-background shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg font-semibold text-foreground">
            Appointment Summary
          </h2>
        </div>

        <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
          <div className="mb-4 rounded-full bg-primary/10 p-4">
            <CalendarDays className="h-8 w-8 text-primary" />
          </div>

          <h3 className="text-base font-semibold text-foreground">
            No Appointment Selected
          </h3>

          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            Choose a doctor, hospital, and appointment slot to see your booking
            summary here.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="sticky top-24 w-sm overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-lg font-semibold text-foreground">
          Appointment Summary
        </h2>
      </div>

      <div className="space-y-6 p-6">
        {/* Doctor */}
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
            <User className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Doctor
            </p>
            <p className="font-medium text-foreground">
              {summary.doctorName}
            </p>
          </div>
        </div>

        {/* Date */}
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-green-100 p-2 dark:bg-green-900/30">
            <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Appointment Date
            </p>
            <p className="text-foreground">
              {summary.appointmentDate}
            </p>
          </div>
        </div>

        {/* Time */}
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-orange-100 p-2 dark:bg-orange-900/30">
            <Clock className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Appointment Time
            </p>
            <p className="text-foreground">
              {summary.appointmentTime}
            </p>
          </div>
        </div>

        {/* Hospital */}
        <div className="flex items-start gap-3">
          <div className="rounded-lg bg-red-100 p-2 dark:bg-red-900/30">
            <MapPin className="h-5 w-5 text-red-600 dark:text-red-400" />
          </div>

          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Hospital
            </p>

            <p className="font-medium text-foreground">
              {summary.location?.name}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {summary.location?.address?.line1}
              {summary.location?.address?.line2 &&
                `, ${summary.location.address.line2}`}
              <br />
              {summary.location?.address?.city},{" "}
              {summary.location?.address?.state}
              <br />
              {summary.location?.address?.country} -{" "}
              {summary.location?.address?.pinCode}
            </p>
          </div>
        </div>

        {/* Fee */}
        <div className="rounded-xl border border-border bg-muted/40 p-4">
          <div className="flex items-center justify-between">
            <span className="font-medium text-foreground">
              Consultation Fee
            </span>

            <div className="flex items-center gap-1 text-xl font-bold text-primary">
              <IndianRupee className="h-5 w-5" />
              {summary.appointmentFee}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-border p-6">
        <Button
          className="w-full"
          size="lg"
          disabled={loading || !bookingInfo}
          onClick={() =>
            handleBook(
              bookingInfo,
              summary.appointmentFee,
              startPayment
            )
          }
        >
          {loading
            ? "Processing..."
            : `Pay ₹${summary.appointmentFee}`}
        </Button>
      </div>
    </div>
  );
}
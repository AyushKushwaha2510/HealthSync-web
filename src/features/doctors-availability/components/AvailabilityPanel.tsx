'use client';

import { useDispatch, useSelector } from 'react-redux';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { RootState } from '@/store/store';

import { setCriteria } from '../store/booking-criteria.slice';
import { useDoctorAvailabilityDetails } from '../hooks/useDoctorAvailabilityDetails';
import { useEffect } from 'react';
import { setSummary } from '@/features/appointments/store/appointment-summary.slice';
import { setBookingInfo } from '@/features/appointments/store/book-appointment.slice';

export default function AvailabilityPanel({ doctorId }: { doctorId: string }) {
  const dispatch = useDispatch();

  const criteria = useSelector(
    (state: RootState) => state.criteria.criteria
  );

  const {
    fetchDoctorAvailabilityDetails,
    doctorAvailability
  } = useDoctorAvailabilityDetails()

  useEffect(() => {
    if (!criteria?.doctorId) return;
    fetchDoctorAvailabilityDetails(criteria);
  }, [doctorId])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Available Slots
          </CardTitle>
        </CardHeader>

        <CardContent>
          {doctorAvailability?.allSlots
            ?.length ? (
            <div className="space-y-6">
              {doctorAvailability.allSlots.map(
                (
                  availability: any,
                  index: number
                ) => (
                  <div key={index}>
                    <h3 className="mb-3 font-semibold capitalize">
                      {availability.weekday}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-6">
                      {availability.slots.map(
                        (slot: string, index: number) => {
                          const occupied =
                            doctorAvailability.occupiedSlots?.data?.some(
                              (item: any) =>
                                item.date === criteria?.fromDate &&
                                item.slots.includes(slot)
                            );

                          return (
                            <button
                              key={index}
                              disabled={occupied}
                              onClick={() => {
                                dispatch(
                                  setCriteria({
                                    slot
                                  })
                                )

                                dispatch(
                                  setSummary({
                                    appointmentTime: slot
                                  })
                                )

                                dispatch(
                                  setBookingInfo({
                                    appointmentStartTime: slot.slice(0, 5),
                                    appointmentEndTime: slot.slice(6),
                                  })
                                )
                              }}
                              
                              className={`rounded-lg border p-3 text-sm font-medium transition

                              ${criteria?.slot === slot
                                  // && criteria?.weekday === availability.weekday
                                  ? 'border-blue-600 bg-blue-600 text-white'
                                  : ''
                                }

                              ${occupied
                                  ? 'cursor-not-allowed border-red-300 bg-red-100 text-red-600 line-through'
                                  : 'hover:border-blue-500 hover:bg-blue-50'
                                }
                            `}
                            >
                              {slot}
                            </button>
                          );
                        }
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Select a location and date first.
            </p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Appointment Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-2">
          <p>
            Date:{' '}
            {criteria?.fromDate ??
              '-'}
          </p>

          <p>
            Weekday:{' '}
            {criteria?.weekday ??
              '-'}
          </p>

          <p>
            Slot:{' '}
            {criteria?.slot ??
              '-'}
          </p>

          <p>
            Hospital:{' '}
            {criteria?.hospitalId ??
              '-'}
          </p>

          <p>
            Clinic:{' '}
            {criteria?.clinicId ??
              '-'}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
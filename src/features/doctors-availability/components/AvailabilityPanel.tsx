'use client';

import { format } from 'date-fns';

import { Calendar } from '@/components/ui/calendar';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { BookingCriteria } from './DoctorAvailabilityDetails';

type ExtendedBookingCriteria = BookingCriteria & {
  slot?: string;
};

type Props = {
  doctorAvailability: any;

  criteria: ExtendedBookingCriteria;

  setCriteria: React.Dispatch<
    React.SetStateAction<ExtendedBookingCriteria>
  >;
};

export default function AvailabilityPanel({
  doctorAvailability,
  criteria,
  setCriteria,
}: Props) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Select Date
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Calendar
            mode="single"
            onSelect={(date) => {
              if (!date) return;

              setCriteria(
                (prev) => ({
                  ...prev,

                  fromDate:
                    format(
                      date,
                      'yyyy-MM-dd'
                    ),

                  toDate:
                    format(
                      date,
                      'yyyy-MM-dd'
                    ),

                  weekday:
                    format(
                      date,
                      'EEEE'
                    ).toLowerCase(),
                })
              );
            }}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Available Slots
          </CardTitle>
        </CardHeader>

        <CardContent>
          {doctorAvailability?.allSlots?.length ? (
            <div className="space-y-6">
              {doctorAvailability.allSlots.map(
                (availability: any, index: number) => (
                  <div key={index}>
                    <h3 className="mb-3 font-semibold capitalize">
                      {availability.weekday}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                      {availability.slots.map(
                        (slot: string) => {
                          const occupied =
                            doctorAvailability.occupiedSlots.some(
                              (item: any) =>
                                item.date ===
                                criteria.fromDate &&
                                item.slots.includes(slot)
                            );

                          return (
                            <button
                              key={slot}
                              disabled={occupied}
                              onClick={() =>
                                setCriteria((prev) => ({
                                  ...prev,
                                  slot,
                                }))
                              }
                              className={`rounded-lg border p-3 text-sm font-medium

                            ${criteria.slot === slot
                                  ? "border-blue-600 bg-blue-600 text-white"
                                  : ""
                                }

                            ${occupied
                                  ? "cursor-not-allowed line-through border-red-300 bg-red-100 text-red-600"
                                  : "hover:border-blue-500 hover:bg-blue-50"
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
              No availability found.
            </p>
          )}
        </CardContent>

        <Card>
          <CardHeader>
            <CardTitle>
              Appointment Summary
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            <p>
              Date:
              {" "}
              {criteria.fromDate || "-"}
            </p>

            <p>
              Weekday:
              {" "}
              {criteria.weekday || "-"}
            </p>

            <p>
              Slot:
              {" "}
              {criteria.slot || "-"}
            </p>
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}
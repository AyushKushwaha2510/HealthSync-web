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

type Props = {
  doctorAvailability: any;

  criteria: BookingCriteria;

  setCriteria: React.Dispatch<
    React.SetStateAction<BookingCriteria>
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
            API Criteria
          </CardTitle>
        </CardHeader>

        <CardContent>
          <pre>
            {JSON.stringify(
              {
                ...(criteria
                  .doctorId && {
                  doctorId:
                    criteria.doctorId,
                }),

                ...(criteria
                  .weekday && {
                  weekday:
                    criteria.weekday,
                }),

                ...(criteria
                  .hospitalId && {
                  hospitalId:
                    criteria.hospitalId,
                }),

                ...(criteria
                  .clinicId && {
                  clinicId:
                    criteria.clinicId,
                }),

                ...(criteria
                  .fromDate && {
                  fromDate:
                    criteria.fromDate,
                }),

                ...(criteria
                  .toDate && {
                  toDate:
                    criteria.toDate,
                }),
              },
              null,
              2
            )}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
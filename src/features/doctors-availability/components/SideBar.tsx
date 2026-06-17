'use client';

import { Dispatch, SetStateAction } from 'react';

import { Clinic } from '@/features/clinics/types/clinic.type';
import { Hospital } from '@/features/hospitals/types/hospital.type';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { BookingCriteria } from './DoctorAvailabilityDetails';

type SidebarProps = {
  clinics: Clinic[];
  hospitals: Hospital[];

  criteria: BookingCriteria;

  setCriteria: Dispatch<
    SetStateAction<BookingCriteria>
  >;
};

export default function Sidebar({
  clinics,
  hospitals,
  criteria,
  setCriteria,
}: SidebarProps) {
  const locations = [
    ...(clinics ?? []).map((clinic) => ({
      id: clinic.id,
      name: clinic.name,
      address: clinic.address,
      type: 'clinic' as const,
    })),

    ...(hospitals ?? []).map(
      (hospital) => ({
        id: hospital.id,
        name: hospital.name,
        address: hospital.address,
        type: 'hospital' as const,
      })
    ),
  ];

  return (
    <aside className="fixed left-0 top-25 h-screen w-[320px] border-r bg-white p-5">
      <Card>
        <CardHeader>
          <CardTitle>
            Appointment Criteria
          </CardTitle>
        </CardHeader>

        <CardContent>
          <Select
            onValueChange={(value) => {
              const selected =
                locations.find(
                  (location) =>
                    location.id === value
                );

              if (!selected) return;

              setCriteria((prev) => ({
                ...prev,

                hospitalId:
                  selected.type ===
                  'hospital'
                    ? selected.id
                    : undefined,

                clinicId:
                  selected.type ===
                  'clinic'
                    ? selected.id
                    : undefined,
              }));
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Location" />
            </SelectTrigger>

            <SelectContent>
              {locations.map(
                (location) => (
                  <SelectItem
                    key={location.id}
                    value={
                      location.id
                    }
                  >
                    {location.name}
                    {' • '}
                    {
                      location
                        .address.city
                    }
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>

          <div className="mt-6 rounded-lg bg-slate-100 p-4">
            <p className="text-sm font-medium">
              Current Filters
            </p>

            <pre className="mt-2 text-xs">
              {JSON.stringify(
                criteria,
                null,
                2
              )}
            </pre>
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
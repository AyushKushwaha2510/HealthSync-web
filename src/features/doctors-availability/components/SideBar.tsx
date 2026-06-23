'use client';

import { format } from 'date-fns';
import { useDispatch, useSelector } from 'react-redux';

import { Clinic } from '@/features/clinics/types/clinic.type';
import { Hospital } from '@/features/hospitals/types/hospital.type';

import { RootState } from '@/store/store';

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

import { Calendar } from '@/components/ui/calendar';
import { setCriteria } from '../store/booking-criteria.slice';
import { setSummary } from '@/features/appointments/store/appointment-summary.slice';

type SidebarProps = {
  clinics: Clinic[];
  hospitals: Hospital[];
};

export default function Sidebar({
  clinics,
  hospitals,
}: SidebarProps) {
  const dispatch = useDispatch();

  const criteria = useSelector(
    (state: RootState) => state.criteria.criteria
  );

  const locations = [
    ...(clinics ?? []).map((clinic) => ({
      id: clinic.id,
      name: clinic.name,
      address: clinic.address,
      type: 'clinic' as const,
    })),

    ...(hospitals ?? []).map((hospital) => ({
      id: hospital.id,
      name: hospital.name,
      address: hospital.address,
      type: 'hospital' as const,
    })),
  ];

  const selectedLocation = locations.find(
    (location) =>
      location.id === criteria?.clinicId ||
      location.id === criteria?.hospitalId
  );

  return (
    <aside className="fixed left-0 top-15 h-screen w-[320px] overflow-y-auto border-r bg-white p-5">
      <div className="space-y-5">
        {/* Location Card */}
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

                dispatch(
                  setCriteria({
                    hospitalId:
                      selected.type === 'hospital' ? selected.id : undefined,

                    clinicId:
                      selected.type === 'clinic' ? selected.id : undefined,
                  })
                );

                dispatch(
                  setSummary({
                    location: {
                      name: selected.name,
                      address: selected.address
                    },
                  })
                )
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
                      value={location.id}
                    >
                      {location.name} {' • '} {location.address.city}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedLocation && (
          <Card>
            <CardHeader>
              <CardTitle>
                Selected Location
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="font-semibold">
                {selectedLocation.name ?? " dfrtgh"}
              </p>

              <p className="text-sm text-muted-foreground">
                {selectedLocation.address.line1}
              </p>

              <p className="text-sm text-muted-foreground">
                {selectedLocation.address.city}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Calendar Card */}
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

                dispatch(
                  setCriteria({
                    fromDate: format(
                      date,
                      'yyyy-MM-dd'
                    ),

                    toDate: format(
                      date,
                      'yyyy-MM-dd'
                    ),

                    weekday: format(
                      date,
                      'EEEE'
                    ).toLowerCase(),
                  })
                );
              }}
            />
          </CardContent>
        </Card>

        {/* Current Filters */}
        <Card>
          <CardHeader>
            <CardTitle>
              Current Filters
            </CardTitle>
          </CardHeader>

          <CardContent>
            <pre className="overflow-x-auto text-xs">
              {JSON.stringify(
                criteria,
                null,
                2
              )}
            </pre>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
}
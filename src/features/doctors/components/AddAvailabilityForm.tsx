'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useAddAvailability } from '../hooks/useAddAvailability';
import { CreateDoctorsAvailability } from '@/features/doctors-availability/types/create-availability.type';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import SuccessMessage from '@/components/SuccessMessage';
import ErrorMessage from '@/components/ErrorMessage';
import { WeekDays } from '@/features/doctors-availability/types/weekday.enum';
import { Clinic } from '@/features/clinics/types/clinic.type';
import { Hospital } from '@/features/hospitals/types/hospital.type';
import { getClinicName } from '@/features/clinics/services/getClinicName';
import { getHospitalName } from '@/features/hospitals/services/getHospitalName';

export default function AddAvailabilityForm() {
  const { addAvailability, error, loading, success } =
    useAddAvailability();

  const [form, setForm] =
    useState<CreateDoctorsAvailability>({
      weekday: null,
      startTime: '',
      endTime: '',
      slotDuration: 15,
      clinicId: '',
      hospitalId: ''
    });

  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    async function loadData() {
      const clinicsData = await getClinicName();
      const hospitalsData = await getHospitalName();

      setClinics(clinicsData.data);
      setHospitals(hospitalsData.data);
    }

    loadData();
  }, []);

  const [locationType, setLocationType] = useState<
    "clinic" | "hospital" | ""
  >("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addAvailability(form);
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      {/* Header */}
      <div className="mb-8 overflow-hidden rounded-3xl bg-gradient-to-r from-teal-500 to-blue-400 shadow-xl">
        <div className="p-8 text-white">
          <h1 className="text-3xl font-bold">
            Add Availability
          </h1>

          <p className="mt-2 text-white/90">
            Configure your consultation schedule and manage appointment slots for
            clinics and hospitals.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Schedule Card */}
          <Card className="border-slate-200 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Schedule Information
              </CardTitle>

              <CardDescription>
                Define your weekly consultation timings.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Weekday</Label>

                <Select
                  value={form.weekday ?? ''}
                  onValueChange={(value) =>
                    setForm({
                      ...form,
                      weekday: value as WeekDays,
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select weekday" />
                  </SelectTrigger>

                  <SelectContent>
                    {Object.values(WeekDays).map((day) => (
                      <SelectItem key={day} value={day}>
                        {day.charAt(0).toUpperCase() + day.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Start Time</Label>

                  <Input
                    type="time"
                    value={form.startTime}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        startTime: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>End Time</Label>

                  <Input
                    type="time"
                    value={form.endTime}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        endTime: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Slot Duration (Minutes)</Label>

                <Input
                  type="number"
                  min={5}
                  step={5}
                  value={form.slotDuration}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      slotDuration: Number(e.target.value),
                    })
                  }
                />

                <p className="text-xs text-slate-500">
                  Recommended duration: 15–30 minutes.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Location Card */}
          <Card className="border-slate-200 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                Consultation Location
              </CardTitle>

              <CardDescription>
                Select where patients can book appointments.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label>Location Type</Label>

                <Select
                  value={locationType}
                  onValueChange={(value) => {
                    setLocationType(value as 'clinic' | 'hospital');

                    setForm({
                      ...form,
                      clinicId: '',
                      hospitalId: '',
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="clinic">Clinic</SelectItem>

                    <SelectItem value="hospital">Hospital</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {locationType === 'clinic' && (
                <div className="space-y-2">
                  <Label>Clinic</Label>

                  <Select
                    value={form.clinicId}
                    onValueChange={(value) =>
                      setForm({
                        ...form,
                        clinicId: value,
                        hospitalId: '',
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Clinic" />
                    </SelectTrigger>

                    <SelectContent>
                      {clinics.map((clinic) => (
                        <SelectItem
                          key={clinic.id}
                          value={clinic.id as string}
                        >
                          {clinic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {locationType === 'hospital' && (
                <div className="space-y-2">
                  <Label>Hospital</Label>

                  <Select
                    value={form.hospitalId}
                    onValueChange={(value) =>
                      setForm({
                        ...form,
                        hospitalId: value,
                        clinicId: '',
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Hospital" />
                    </SelectTrigger>

                    <SelectContent>
                      {hospitals.map((hospital) => (
                        <SelectItem
                          key={hospital.id}
                          value={hospital.id as string}
                        >
                          {hospital.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Submit Card */}
        <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900">
          <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                Ready to save?
              </h3>

              <p className="text-sm text-slate-500">
                Patients will be able to book appointments during these slots.
              </p>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="min-w-[220px] bg-gradient-to-r from-teal-500 to-blue-400 text-white hover:opacity-90"
            >
              {loading ? 'Saving Availability...' : 'Save Availability'}
            </Button>
          </CardContent>
        </Card>

        {success && <SuccessMessage message={success} />}

        {error && <ErrorMessage message={error} />}
      </form>

    </div>
  );
}

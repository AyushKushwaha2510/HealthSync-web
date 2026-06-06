'use client';

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RegisterDoctorDto } from '../types/register-doctor.dto';
import { useSendRequest } from '../hooks/useSendRequest';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHospital } from '@/features/hospitals/hooks/useHospital';
import Loading from '@/components/Loading';
import { useClinic } from '@/features/clinics/hooks/useClinic';

export default function DoctorRegisterRequestForm() {
  const {
    request,
    loading: requestLoading,
    success,
    error } = useSendRequest();

  const [form, setForm] = useState<RegisterDoctorDto>({
    specialization: '',
    experience: '0',
    hospitalIds: [],
    clinicIds: [],
    licenseNumber: '',
  });

  const {
    findAllHospitals,
    hospitals,
    loading: hospitalLoading
  } = useHospital()

  const {
    findAllClinics,
    clinics,
    loading: clinicLoading
  } = useClinic()

  useEffect(() => {
    findAllHospitals();
    findAllClinics();
  }, [])

  if (hospitalLoading) return <Loading message='Loading Hospitals' />
  if (clinicLoading) return <Loading message='Loading Cinics' />

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    await request(form);
  };

  return (
    <div className="flex items-center justify-center p-6">
      <Card className="w-full max-w-lg border-0 shadow-2xl">

        <CardContent className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {/* Specialization */}
            <div className="space-y-2">
              <Label>Specialization</Label>
              <Input
                type='text'
                name="specialization"
                onChange={handleChange}
              />
            </div>
            {/* Experience */}
            <div className="space-y-2">
              <Label>Experience</Label>
              <Input
                type='number'
                name="experience"
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Hospital */}
          {hospitals
            && (
              <div className="space-y-3">
                <Label>Hospitals</Label>

                <div className="grid gap-2">
                  {hospitals.map((hospital) => (
                    <label
                      key={hospital.id}
                      className="flex items-center gap-2 rounded border p-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={form.hospitalIds.includes(hospital.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setForm((prev) => ({
                              ...prev,
                              hospitalIds: [...prev.hospitalIds, hospital.id],
                            }));
                          } else {
                            setForm((prev) => ({
                              ...prev,
                              hospitalIds: prev.hospitalIds.filter(
                                (id) => id !== hospital.id
                              ),
                            }));
                          }
                        }}
                      />

                      <span>{hospital.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

          {/* Clinics */}
          {clinics
            && (
              <div className="space-y-3">
                <Label>Clinics</Label>

                <div className="grid gap-2">
                  {clinics.map((clinic) => (
                    <label
                      key={clinic.id}
                      className="flex items-center gap-2 rounded border p-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={form.clinicIds.includes(clinic.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setForm((prev) => ({
                              ...prev,
                              clinicIds: [...prev.clinicIds, clinic.id],
                            }));
                          } else {
                            setForm((prev) => ({
                              ...prev,
                              clinicIds: prev.clinicIds.filter(
                                (id) => id !== clinic.id
                              ),
                            }));
                          }
                        }}
                      />

                      <span>{clinic.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

          {/* License Number */}
          <div className="space-y-2">
            <Label>License Number</Label>
            <Input
              type="text"
              name="licenseNumber"
              onChange={handleChange}
            />
          </div>

          <Button
            className="h-11 w-full bg-teal-500 text-white hover:bg-teal-600"
            onClick={handleSubmit}
            disabled={requestLoading}
          >
            {requestLoading ? 'Sending...' : 'Send Request'}
          </Button>

          {success && (
            <div className="rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700">
              {success}
            </div>
          )}
          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-3">
              {Array.isArray(error) ? (
                <ul className="list-disc space-y-1 pl-5 text-sm text-red-600">
                  {error.map((e, i) => (
                    <li key={i}>{e}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

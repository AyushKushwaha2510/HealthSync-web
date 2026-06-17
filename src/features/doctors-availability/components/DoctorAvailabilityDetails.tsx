'use client';

import { useEffect, useState } from 'react';

import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

import { Clinic } from '@/features/clinics/types/clinic.type';
import { Hospital } from '@/features/hospitals/types/hospital.type';

import { getClinicNameByDoctorId } from '@/features/clinics/services/getClinicName';
import { getHospitalNameByDoctorId } from '@/features/hospitals/services/getHospitalName';

import { useDoctorAvailabilityDetails } from '../hooks/useDoctorAvailabilityDetails';

import AvailabilityPanel from './AvailabilityPanel';
import Sidebar from './SideBar';

export type BookingCriteria = {
  doctorId?: string;
  weekday?: string;
  hospitalId?: string;
  clinicId?: string;
  fromDate?: string;
  toDate?: string;
};

export default function DoctorAvailabilityDetails({
  id,
}: {
  id: string;
}) {
  const {
    fetchDoctorAvailabilityDetails,
    doctorAvailability,
    loading,
    error,
  } = useDoctorAvailabilityDetails();

  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  const [criteria, setCriteria] =
    useState<BookingCriteria>({
      doctorId: id,
    });

  useEffect(() => {
    fetchDoctorAvailabilityDetails(id);
  }, [id]);

  useEffect(() => {
    async function loadData() {
      const clinicsData =
        await getClinicNameByDoctorId(id);

      const hospitalsData =
        await getHospitalNameByDoctorId(id);

      setClinics(clinicsData.data ?? []);
      setHospitals(hospitalsData.data ?? []);
    }

    loadData();
  }, [id]);

  if (loading)
    return (
      <Loading message="Loading..." />
    );

  if (error)
    return (
      <ErrorMessage message={error} />
    );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar
          clinics={clinics}
          hospitals={hospitals}
          criteria={criteria}
          setCriteria={setCriteria}
        />

        <main className="ml-[320px] flex-1 p-6">
          <AvailabilityPanel
            doctorAvailability={
              doctorAvailability
            }
            criteria={criteria}
            setCriteria={setCriteria}
          />
        </main>
      </div>
    </div>
  );
}
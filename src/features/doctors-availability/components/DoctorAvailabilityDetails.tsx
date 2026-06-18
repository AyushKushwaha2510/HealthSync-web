'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Loading from '@/components/Loading';
import ErrorMessage from '@/components/ErrorMessage';

import { Clinic } from '@/features/clinics/types/clinic.type';
import { Hospital } from '@/features/hospitals/types/hospital.type';

import { getClinicNameByDoctorId } from '@/features/clinics/services/getClinicName';
import { getHospitalNameByDoctorId } from '@/features/hospitals/services/getHospitalName';

import { RootState } from '@/store/store';

import { useDoctorAvailabilityDetails } from '../hooks/useDoctorAvailabilityDetails';
import { setCriteria } from '../store/booking-criteria.slice';

import Sidebar from './SideBar';
import AvailabilityPanel from './AvailabilityPanel';

export default function DoctorAvailabilityDetails({
  id,
}: {
  id: string;
}) {
  const dispatch = useDispatch();

  const criteria = useSelector(
    (state: RootState) => state.criteria.criteria
  );

  const {
    fetchDoctorAvailabilityDetails,
    doctorAvailability,
    loading,
    error,
  } = useDoctorAvailabilityDetails();

  const [clinics, setClinics] = useState<Clinic[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);

  useEffect(() => {
    dispatch(
      setCriteria({
        doctorId: id,
      })
    );
  }, [id, dispatch]);

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

  useEffect(() => {
    if (!criteria?.doctorId) return;

    fetchDoctorAvailabilityDetails(criteria);
  }, [criteria]);

  if (loading) {
    return (
      <Loading message="Loading..." />
    );
  }

  if (error) {
    return (
      <ErrorMessage message={error} />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex">
        <Sidebar
          clinics={clinics}
          hospitals={hospitals}
        />

        <main className="ml-[320px] flex-1 p-6">
          <AvailabilityPanel
            doctorAvailability={
              doctorAvailability
            }
          />
        </main>
      </div>
    </div>
  );
}
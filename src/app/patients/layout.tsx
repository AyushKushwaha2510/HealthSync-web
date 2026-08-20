'use client';

import Container from "@/components/Container";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="flex">
        <SideBar tabs={tabs} />

         <main className="ml-72 flex-1">
          {children}
        </main>
    </Container>
  );
}

const tabs = [
  {
    label: 'Profile',
    path: '/patients/profile',
  },
  {
    label: 'Doctors',
    path: '/search-doctors',
  },
  {
    label: 'Appointments',
    path: '/patients/appointments',
  },
  {
    label: 'Prescriptions',
    path: '/patients/prescriptions',
  },
  {
    label: 'Register as Doctor',
    path: '/doctors/registration-request',
  },
  {
    label: 'Report a Bug',
    path: '/dashboard/bug',
  },
];
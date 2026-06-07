'use client';

import Container from "@/components/Container";
import SideBar from "@/components/SideBar";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = useSelector((state: RootState) => state.auth.user);

  const tabs = [
    {
      label: 'Profile',
      path: `/${user?.role}/profile`,
    },
    {
      label: 'Pending Requests',
      path: '/admin/doctor-requests',
    },
    {
       label: 'All Doctors',
      path: '/admin/doctors',
    },
    {
      label: 'Report a Bug',
      path: '/dashboard/bug',
    },
  ];

  return (
    <Container>
      <div className="flex min-h-screen gap-6">
        <SideBar tabs={tabs} />

        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </Container>
  );
}


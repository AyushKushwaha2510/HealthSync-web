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
      {/* <div className="flex min-h-screen gap-6"> */}
        <SideBar tabs={tabs} />

        {/* <main className="flex-1 p-4"> */}
         <main className="ml-72 flex-1">
          {children}
        </main>
      {/* </div> */}
    </Container>
  );
}

const tabs = [
  {
    label: 'Profile',
    path: '/doctors/profile',
  },
  {
    label: 'Appointments',
    path: '/doctors/appointments',
  },
  // {
  //   label: 'Register as Doctor',
  //   path: '/doctors/registration-request',
  // },
  {
    label: 'Report a Bug',
    path: '/dashboard/bug',
  },
];
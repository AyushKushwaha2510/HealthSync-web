'use client';

import Container from "@/components/Container";
import SideBar from "@/components/SideBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

const tabs = [
  {
    label: 'Profile',
    path: '/patient/profile',
  },
  {
    label: 'Register as Doctor',
    path: '/doctor/registration-request',
  },
  {
    label: 'Report a Bug',
    path: '/dashboard/bug',
  },
];